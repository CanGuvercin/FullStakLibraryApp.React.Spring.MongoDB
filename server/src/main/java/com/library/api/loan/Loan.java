package com.library.api.loan;

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
@Document(collection = "loans")
public class Loan {

    @Id
    private String id;

    // Hangi kopya ödünç verildi?
    private String copyId;

    // Hangi kullanıcıya? (User.id)
    private String userId;

    // Ödünç verildiği an
    private Instant loanedAt;

    // Son teslim tarihi
    private Instant dueAt;

    // İade edilme zamanı (iade edilmediyse null)
    private Instant returnedAt;
}
