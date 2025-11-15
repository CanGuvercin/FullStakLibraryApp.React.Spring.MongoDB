package com.library.api.loan;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends MongoRepository<Loan, String> {

    // Aktif loan: returnedAt NULL olan kayıt
    Optional<Loan> findByUserIdAndReturnedAtIsNull(String userId);

    // Bir kullanıcının geçmiş + aktif tüm loan'ları
    List<Loan> findAllByUserIdOrderByLoanedAtDesc(String userId);

    // Bir copy şu anda aktif loan'da mı?
    Optional<Loan> findByCopyIdAndReturnedAtIsNull(String copyId);
}
