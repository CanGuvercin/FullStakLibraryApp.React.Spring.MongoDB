package com.library.api.controller;

import com.library.api.book.BookService;
import com.library.api.controller.dto.BookDetailDto;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService bookService;

    /**
     * Tek kitap detayı (gerçek DB + loan/hold + copies)
     */
    @GetMapping("/{id}")
    public BookDetailDto getBookDetail(
            @PathVariable String id,
            @AuthenticationPrincipal User currentUser
    ) {
        return bookService.getBookDetail(currentUser, id);
    }
}
