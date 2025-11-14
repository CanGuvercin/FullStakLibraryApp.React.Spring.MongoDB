package com.library.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService service;

    // POST /api/loans  — ödünç alma
    @PostMapping
    @PreAuthorize("hasRole('MEMBER')")
    public LoanDto borrow(@RequestBody CreateLoanDto dto) {
        return service.borrow(dto.getCopyId());
    }

    // POST /api/loans/{id}/return  — iade
    @PostMapping("/{id}/return")
    @PreAuthorize("hasAnyRole('MEMBER','ADMIN')")
    public LoanDto returnLoan(@PathVariable String id) {
        return service.returnLoan(id);
    }

    // GET /api/loans/me — kullanıcının ödünç geçmişi
    @GetMapping("/me")
    @PreAuthorize("hasRole('MEMBER')")
    public List<LoanDto> myLoans() {
        return service.getMyLoans();
    }
}
