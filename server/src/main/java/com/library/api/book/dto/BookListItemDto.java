package com.library.api.book.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BookListItemDto {

    private String id;
    private String title;
    private List<String> authors;
    private int availableCopies;  // listede gerekli

}
