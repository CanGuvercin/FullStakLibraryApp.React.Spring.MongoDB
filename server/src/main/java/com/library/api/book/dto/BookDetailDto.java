package com.library.api.book.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;
import com.library.api.copy.dto.CopyDto;

import java.util.List;
@Data
@Builder
@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public class BookDetailDto {

    private String id;       // primary
    private String bookId;   // alias - frontend rahat etsin
    private String title;
    private String description;
    private String isbn;
    private Integer publicationYear;
    private List<String> authors;
    private String coverUrl;
    private List<String> tags;

    private int availableCount;
    private int totalCopies;
    private List<CopyDto> copies;

    private String availableCopyId;
    private boolean userHasLoan;
    private boolean userHasHold;
    private String activeLoanId;
    private String activeHoldId;
}

