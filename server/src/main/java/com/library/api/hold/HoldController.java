package com.library.api.hold;

import com.library.api.hold.dto.CreateHoldRequest;
import com.library.api.hold.dto.MyHoldDto;
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

    @GetMapping("/me")
    public List<MyHoldDto> getMyHolds(@AuthenticationPrincipal User currentUser) {
        return holdService.getMyHolds(currentUser);
    }

    @PostMapping
    public MyHoldDto createHold(
            @AuthenticationPrincipal User currentUser,
            @RequestBody CreateHoldRequest request
    ) {
        return holdService.createHold(currentUser, request.getBookId());
    }

    @PostMapping("/{holdId}/cancel")
    public MyHoldDto cancelHold(
            @AuthenticationPrincipal User currentUser,
            @PathVariable String holdId
    ) {
        return holdService.cancelHold(currentUser, holdId);
    }
}
