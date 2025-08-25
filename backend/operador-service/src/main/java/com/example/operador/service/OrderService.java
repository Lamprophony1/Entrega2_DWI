package com.example.operador.service;

import com.example.operador.model.Order;
import com.example.operador.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository repository;
    private final RestTemplate restTemplate;

    public OrderService(OrderRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    public Order create(Order order) {
        // Validate item exists and has stock
        ItemDto item = restTemplate.getForObject("http://buscador-service/items/" + order.getItemId(), ItemDto.class);
        if (item == null || item.getStock() < order.getQuantity()) {
            throw new IllegalArgumentException("Item not available");
        }
        return repository.save(order);
    }

    public List<Order> findAll() {
        return repository.findAll();
    }

    public Optional<Order> findById(Long id) {
        return repository.findById(id);
    }

    // DTO for item response
    public static class ItemDto {
        private Long id;
        private String name;
        private int stock;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getStock() {
            return stock;
        }

        public void setStock(int stock) {
            this.stock = stock;
        }
    }
}
