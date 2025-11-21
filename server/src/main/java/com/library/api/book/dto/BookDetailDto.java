package com.library.api.book.dto;

import lombok.Builder;
import lombok.Data;
import com.library.api.copy.dto.CopyDto;

import java.util.List;

@Data
@Builder
public class BookDetailDto {

    private String id;
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

    private boolean userHasLoan;
    private boolean userHasHold;
    private String activeLoanId;
    private String activeHoldId;
}
