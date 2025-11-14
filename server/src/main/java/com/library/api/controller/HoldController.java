package com.library.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holds")
@RequiredArgsConstructor
public class HoldController {

    private final HoldService service;

    // POST /api/holds  — rezervasyon yap
    @PostMapping
    @PreAuthorize("hasRole('MEMBER')")
    public HoldDto create(@RequestBody CreateHoldDto dto) {
        return service.create(dto.getBookId());
    }

    // GET /api/holds/me — kullanıcının rezervasyonları
    @GetMapping("/me")
    @PreAuthorize("hasRole('MEMBER')")
    public List<HoldDto> myHolds() {
        return service.getMyHolds();
    }

    // POST /api/holds/{id}/cancel — kullanıcı iptal eder
    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('MEMBER')")
    public HoldDto cancel(@PathVariable String id) {
        return service.cancel(id);
    }

    // POST /api/holds/{id}/fulfill — admin onaylar (kitap teslim sırasında)
    @PostMapping("/{id}/fulfill")
    @PreAuthorize("hasRole('ADMIN')")
    public HoldDto fulfill(@PathVariable String id) {
        return service.fulfill(id);
    }
}
