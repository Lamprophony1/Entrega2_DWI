package com.example.buscador.controller;

import com.example.buscador.model.Item;
import com.example.buscador.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @PostMapping
    public Item create(@RequestBody Item item) {
        return service.save(item);
    }

    @GetMapping
    public List<Item> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> one(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable Long id, @RequestBody Item item) {
        return service.findById(id)
                .map(existing -> {
                    item.setId(existing.getId());
                    return ResponseEntity.ok(service.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Item> search(@RequestParam(required = false) String name,
                             @RequestParam(required = false) String description,
                             @RequestParam(required = false) BigDecimal minPrice,
                             @RequestParam(required = false) BigDecimal maxPrice,
                             @RequestParam(required = false) Boolean inStock) {
        return service.search(name, description, minPrice, maxPrice, inStock);
    }
}
