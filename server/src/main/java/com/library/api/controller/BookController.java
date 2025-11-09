package com.library.api.controller;

import jakarta.annotation.security.PermitAll;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173") // frontend'e izin
public class BookController {

    @GetMapping
    @PermitAll // GEÇİCİ TEST İÇİN, REMOVE IT AS SOON AS POSSIBLE
    public List<Map<String, String>> getAllBooks() {
        return List.of(
                Map.of("id", "1", "title", "Clean Code", "author", "Robert C. Martin"),
                Map.of("id", "2", "title", "The Pragmatic Programmer", "author", "Andrew Hunt")
        );
    }


    @GetMapping("/{id}")
    @PermitAll
    public Map<String, String> getBookById(@PathVariable String id) {
        if (id.equals("1")) {
            return Map.of(
                    "id", "1",
                    "title", "Clean Code",
                    "author", "Robert C. Martin",
                    "description", "A handbook of agile software craftsmanship."
            );
        } else if (id.equals("2")) {
            return Map.of(
                    "id", "2",
                    "title", "The Pragmatic Programmer",
                    "author", "Andrew Hunt",
                    "description", "Journey to mastery for modern developers."
            );
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Book not found"
            );
        }
    }
}
