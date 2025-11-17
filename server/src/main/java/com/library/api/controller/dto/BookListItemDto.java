package com.library.api.controller.dto;

import lombok.Data;

public class BookListItemDto {

    @Data
    @Builder
    public class BookListItemDto {
        private String id;
        private String title;
        private String[] authors;
        private int availableCopies;
    }

}
