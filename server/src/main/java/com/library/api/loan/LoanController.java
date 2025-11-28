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
        return loanService.getMyLoans(currentUser);
    }

    /**
     * Borrow (ödünç alma)
     */
    @PostMapping
    public MyLoanDto borrow(@AuthenticationPrincipal User currentUser,
                            @RequestBody CreateLoanRequest request) {
        return loanService.borrow(currentUser, request.getCopyId());
    }

    /**
     * Loan iade etme, 21 kasım güncelleme bu şey çalışmadı.
     */
    @PostMapping("/{loanId}/return")
    public MyLoanDto returnLoan(@AuthenticationPrincipal User currentUser,
                                @PathVariable("loanId") String loanId) { //loanId ekledim bakalım 28 kasım)
        return loanService.returnLoan(currentUser, loanId);
    }
}
