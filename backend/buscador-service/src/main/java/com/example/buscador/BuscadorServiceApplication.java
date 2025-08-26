package com.example.buscador;

import com.example.buscador.model.Item;
import com.example.buscador.repository.ItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BuscadorServiceApplication implements CommandLineRunner {

    private final ItemRepository repository;

    public BuscadorServiceApplication(ItemRepository repository) {
        this.repository = repository;
    }

    public static void main(String[] args) {
        SpringApplication.run(BuscadorServiceApplication.class, args);
    }

    @Override
    public void run(String... args) {
        try {
            if (repository.count() == 0) {
                Item laptop = new Item();
                laptop.setId(1L);
                laptop.setName("Laptop");
                laptop.setBrand("TechBrand");
                laptop.setCompany("TechCorp");
                laptop.setCategory("Electronics");
                laptop.setDescription("Potente laptop para trabajo y juego");
                laptop.setPrice(999.99);
                laptop.setStock(10);
                laptop.setImage("laptop.png");

                Item mouse = new Item();
                mouse.setId(2L);
                mouse.setName("Mouse");
                mouse.setBrand("Gamer");
                mouse.setCompany("GadgetCo");
                mouse.setCategory("Accessories");
                mouse.setDescription("Mouse inalámbrico ergonómico");
                mouse.setPrice(49.99);
                mouse.setStock(50);
                mouse.setImage("mouse.png");

                repository.save(laptop);
                repository.save(mouse);
            }
        } catch (Exception e) {
            System.err.println("Could not initialize sample items: " + e.getMessage());
        }
    }
}