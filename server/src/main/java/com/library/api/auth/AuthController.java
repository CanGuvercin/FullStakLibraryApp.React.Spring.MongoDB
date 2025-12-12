package com.library.api.auth;

import com.library.api.auth.dto.AuthResponse;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String token = authService.register(request.getFullName(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        User user = authService.authenticateAndGetUser(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                new AuthResponse(
                        token,
                        user.getEmail(),
                        user.getRole().name() // "ADMIN"
                )
        );
    }


}