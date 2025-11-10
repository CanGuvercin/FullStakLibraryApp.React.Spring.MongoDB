package com.library.api.controller;

import com.library.api.book.BookDetailDto;
import jakarta.annotation.security.PermitAll;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @GetMapping
    @PermitAll
    public List<Map<String, String>> getAllBooks() {
        return List.of(
                Map.of("id", "1", "title", "Clean Code", "author", "Robert C. Martin"),
                Map.of("id", "2", "title", "The Pragmatic Programmer", "author", "Andrew Hunt")
        );
    }

    @GetMapping("/{id}")
    @PermitAll
    public BookDetailDto getBookById(@PathVariable String id) {
        if (id.equals("1")) {
            return new BookDetailDto(
                    "1",
                    "Clean Code",
                    List.of("Robert C. Martin"),
                    List.of("Programming", "Clean Code"),
                    "A handbook of agile software craftsmanship.",
                    null,
                    "copy-001",
                    false,
                    false,
                    null,
                    null,
                    3
            );
        } else if (id.equals("2")) {
            return new BookDetailDto(
                    "2",
                    "The Pragmatic Programmer",
                    List.of("Andrew Hunt"),
                    List.of("Software Engineering", "Career"),
                    "Journey to mastery for modern developers.",
                    null,
                    null,
                    false,
                    false,
                    null,
                    null,
                    0
            );
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Book not found"
            );
        }
    }
}
