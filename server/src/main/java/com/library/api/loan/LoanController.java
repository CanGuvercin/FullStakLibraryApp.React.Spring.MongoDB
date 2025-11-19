package com.library.api.loan;

import com.library.api.loan.dto.CreateLoanRequest;
import com.library.api.loan.dto.MyLoanDto;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    /**
     * Kullanıcının tüm loan'larını getirir.
     */
    @GetMapping("/me")
    public List<MyLoanDto> getMyLoans(@AuthenticationPrincipal User currentUser) {
        return loanService.getMyLoans(currentUser)
                .stream()
                .map(MyLoanDto::from)
                .toList();
    }

    /**
     * Borrow (ödünç alma)
     */
    @PostMapping
    public MyLoanDto borrow(@AuthenticationPrincipal User currentUser,
                            @RequestBody CreateLoanRequest request) {

        Loan loan = loanService.borrow(currentUser, request.getCopyId());
        return MyLoanDto.from(loan);
    }

    /**
     * Loan iade etme
     */
    @PostMapping("/{loanId}/return")
    public MyLoanDto returnLoan(@AuthenticationPrincipal User currentUser,
                                @PathVariable String loanId) {

        Loan loan = loanService.returnLoan(currentUser, loanId);
        return MyLoanDto.from(loan);
    }
}
