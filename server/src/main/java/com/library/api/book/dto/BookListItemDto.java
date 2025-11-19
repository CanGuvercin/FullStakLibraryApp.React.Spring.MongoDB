package com.library.api.book.dto;

import com.library.api.book.Book;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookListItemDto {

    private String id;
    private String title;

    public static BookListItemDto from(Book book) {
        return BookListItemDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .build();
    }
}
