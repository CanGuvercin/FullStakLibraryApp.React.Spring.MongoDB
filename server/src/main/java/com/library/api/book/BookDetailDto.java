package com.library.api.book;

import java.util.List;

public record BookDetailDto(
        String id,
        String title,
        List<String> authors,
        List<String> tags,
        String description,
        String coverUrl,
        String availableCopyId,
        Boolean userHasLoan,
        Boolean userHasHold,
        String activeLoanId,
        String activeHoldId,
        int availableCount
) {}
