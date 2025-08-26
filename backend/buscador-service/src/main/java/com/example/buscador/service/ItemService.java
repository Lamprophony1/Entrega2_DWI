package com.example.buscador.service;

import com.example.buscador.model.Item;
import com.example.buscador.repository.ItemRepository;
import co.elastic.clients.elasticsearch._types.query_dsl.*;
import co.elastic.clients.json.JsonData;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
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
        BoolQuery.Builder bool = QueryBuilders.bool();

        if (name != null) bool.must(m -> m.match(t -> t.field("name").query(name)));
        if (description != null) bool.must(m -> m.match(t -> t.field("description").query(description)));

        if (minPrice != null || maxPrice != null) {
            bool.filter(f -> f.range(r -> {
                r.field("price");
                if (minPrice != null) r.gte(JsonData.of(minPrice));
                if (maxPrice != null) r.lte(JsonData.of(maxPrice));
                return r;
            }));
        }

        if (inStock != null) {
            if (inStock) {
                bool.filter(f -> f.range(r -> r.field("stock").gt(JsonData.of(0))));
            } else {
                bool.filter(f -> f.term(t -> t.field("stock").value(0)));
            }
        }

        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q.bool(bool.build()))
                .build();
        return operations.search(query, Item.class)
                .map(SearchHit::getContent)
                .toList();
    }
}