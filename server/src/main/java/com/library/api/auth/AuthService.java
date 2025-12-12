package com.library.api.auth;

import com.library.api.auth.dto.AuthResponse;
import com.library.api.security.JwtService;
import com.library.api.user.User;
import com.library.api.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String register(String fullName, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = User.builder()
                .fullName(fullName)
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .role("MEMBER")                               // 🔥 String olarak
                .createdAt(Instant.now())
                .build();

        userRepository.save(user);

        return jwtService.generateToken(user.getEmail(), null);
    }

    public AuthResponse login(String email, String password) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String token = jwtService.generateToken(user.getEmail(), null);

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getRole()   // STRING → "ADMIN"
        );
    }}
