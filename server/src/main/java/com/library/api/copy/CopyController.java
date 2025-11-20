package com.library.api.copy;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books/{bookId}/copies")
@RequiredArgsConstructor
public class CopyController {

    private final CopyService copyService;

    /**
     * Bir kitaba yeni fiziksel kopyalar ekle
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")  // yok öyle her önüne gelen kitap ekleyecek
    public List<Copy> createCopies(
            @PathVariable String bookId,
            @RequestParam(defaultValue = "1") int count
    ) {
        return copyService.createCopies(bookId, count);
    }

    /**
     * Bir kitabın tüm fiziksel kopyalarını listele
     */
    @GetMapping
    public List<Copy> getCopies(
            @PathVariable String bookId
    ) {
        return copyService.getCopiesByBookId(bookId);
    }
}
