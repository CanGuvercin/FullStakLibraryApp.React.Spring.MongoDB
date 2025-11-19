package com.library.api.book.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BookDetailDto {

    // --------- Book temel bilgileri ---------
    private String id;
    private String title;
    private List<String> authors;
    private String description;
    private String isbn;
    private Integer publicationYear;   // opsiyonel - null olabilir

    // --------- Copy bilgileri ---------
    private int availableCount;   // kaç tane müsait copy var
    private int totalCopies;      // toplam copy sayısı

    // --------- Kullanıcıya özel bilgiler ---------
    private boolean userHasLoan;
    private boolean userHasHold;
    private String activeLoanId;
    private String activeHoldId;


}
