package com.library.api.book.dto;

import com.library.api.book.Book;
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
    private int publicationYear;

    // --------- Copy bilgileri ---------
    private String availableCopyId;
    private int availableCount;

    // --------- Kullanıcıya özel bilgiler ---------
    private boolean userHasLoan;
    private boolean userHasHold;
    private String activeLoanId;
    private String activeHoldId;

    // --------- Factory metod ---------
    public static BookDetailDto from(
            Book book,
            String availableCopyId,
            int availableCount,
            boolean userHasLoan,
            boolean userHasHold,
            String activeLoanId,
            String activeHoldId
    ) {
        return BookDetailDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authors(book.getAuthors())
                .description(book.getDescription())
                .isbn(book.getIsbn())
                .publicationYear(book.getPublicationYear())
                .availableCopyId(availableCopyId)
                .availableCount(availableCount)
                .userHasLoan(userHasLoan)
                .userHasHold(userHasHold)
                .activeLoanId(activeLoanId)
                .activeHoldId(activeHoldId)
                .build();
    }
}
