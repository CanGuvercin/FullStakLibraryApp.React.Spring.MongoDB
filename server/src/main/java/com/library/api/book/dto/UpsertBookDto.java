package com.library.api.book.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpsertBookDto {
    private String isbn;
    private String title;
    private String description;
    private String coverUrl;
    private List<String> authors;
    private List<String> tags;
    private Integer publicationYear;
}

