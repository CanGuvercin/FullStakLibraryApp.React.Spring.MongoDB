package com.library.api.loan.dto;

import com.library.api.loan.Loan;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyLoanDto {

    private String id;
    private String bookTitle; // Şimdilik null dönecek, copy üzerinden çekilecek
    private String copyId;
    private String loanedAt;
    private String dueAt;
    private String status;

    public static MyLoanDto from(Loan loan) {

        String status = loan.getReturnedAt() == null
                ? "ACTIVE"
                : "RETURNED";

        return MyLoanDto.builder()
                .id(loan.getId())
                .copyId(loan.getCopyId())
                .bookTitle(null)  // Book service ile bağlayınca dolduracağız, mışız.
                .loanedAt(loan.getLoanedAt().toString())
                .dueAt(loan.getDueAt().toString())
                .status(status)
                .build();
    }
}
