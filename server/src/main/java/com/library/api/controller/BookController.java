package com.library.api.controller;

import com.library.api.book.BookService;
import com.library.api.controller.dto.BookDetailDto;
import com.library.api.controller.dto.BookListItemDto;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService bookService;

    /**
     * Kitap listesi
     */
    @GetMapping
    public List<BookListItemDto> getBooks(
            @RequestParam(required = false) String query
    ) {
        return bookService.getBooks(query);
    }

    /**
     * Tek kitap detayı
     */
    @GetMapping("/{id}")
    public BookDetailDto getBookDetail(
            @PathVariable String id,
            @AuthenticationPrincipal User currentUser
    ) {
        return bookService.getBookDetail(currentUser, id);
    }
}
