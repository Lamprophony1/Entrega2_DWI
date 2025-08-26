package com.example.buscador.service;

import com.example.buscador.model.Item;
import com.example.buscador.repository.ItemRepository;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository repository;
    private final ElasticsearchOperations operations;

    public ItemService(ItemRepository repository, ElasticsearchOperations operations) {
        this.repository = repository;
        this.operations = operations;
    }

    public Item save(Item item) {
        return repository.save(item);
    }

    public List<Item> findAll() {
        return (List<Item>) repository.findAll();
    }

    public Optional<Item> findById(Long id) {
        return repository.findById(id);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<Item> search(String name, String description, Double minPrice, Double maxPrice, Boolean inStock) {
        BoolQueryBuilder bool = QueryBuilders.boolQuery();
        if (name != null) {
            bool.must(QueryBuilders.matchQuery("name", name));
        }
        if (description != null) {
            bool.must(QueryBuilders.matchQuery("description", description));
        }
        if (minPrice != null || maxPrice != null) {
            RangeQueryBuilder range = QueryBuilders.rangeQuery("price");
            if (minPrice != null) range.gte(minPrice);
            if (maxPrice != null) range.lte(maxPrice);
            bool.filter(range);
        }
        if (inStock != null) {
            if (inStock) {
                bool.filter(QueryBuilders.rangeQuery("stock").gt(0));
            } else {
                bool.filter(QueryBuilders.termQuery("stock", 0));
            }
        }
        var query = new NativeSearchQueryBuilder().withQuery(bool).build();
        return operations.search(query, Item.class).stream().map(SearchHit::getContent).toList();
    }
}

