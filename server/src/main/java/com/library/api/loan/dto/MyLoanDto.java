package com.library.api.loan.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyLoanDto {

    private String id;
    private String bookId;
    private String bookTitle;
    private String copyId;
    private String loanedAt;
    private String dueAt;
    private String returnedAt; // null değilse RETURNED demek

}
