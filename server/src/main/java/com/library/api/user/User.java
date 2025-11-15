package com.library.api.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String email;

    // BCrypt ile hash'lenmiş şifre
    private String passwordHash;

    private String fullName;

    // "ADMIN" veya "MEMBER"
    private String role;

    // Kayıt tarihi
    private Instant createdAt;
}
