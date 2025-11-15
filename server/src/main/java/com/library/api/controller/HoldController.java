package com.library.api.controller;

import com.library.api.controller.dto.CreateHoldRequest;
import com.library.api.controller.dto.MyHoldDto;
import com.library.api.hold.Hold;
import com.library.api.hold.HoldService;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/holds")
public class HoldController {

    private final HoldService holdService;

    /**
     * Kullanıcının tüm hold'larını getirir.
     */
    @GetMapping("/me")
    public List<MyHoldDto> getMyHolds(@AuthenticationPrincipal User currentUser) {
        return holdService.getMyHolds(currentUser)
                .stream()
                .map(MyHoldDto::from)
                .toList();
    }

    /**
     * Hold oluşturma
     */
    @PostMapping
    public MyHoldDto createHold(
            @AuthenticationPrincipal User currentUser,
            @RequestBody CreateHoldRequest request
    ) {
        Hold hold = holdService.createHold(currentUser, request.getBookId());
        return MyHoldDto.from(hold);
    }

    /**
     * Hold iptal etme
     */
    @PostMapping("/{holdId}/cancel")
    public MyHoldDto cancelHold(
            @AuthenticationPrincipal User currentUser,
            @PathVariable String holdId
    ) {
        Hold hold = holdService.cancelHold(currentUser, holdId);
        return MyHoldDto.from(hold);
    }
}
