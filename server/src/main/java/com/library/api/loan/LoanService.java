package com.library.api.loan;

import com.library.api.copy.Copy;
import com.library.api.copy.CopyRepository;
import com.library.api.exception.NotFoundException;
import com.library.api.exception.ValidationException;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;
    private final CopyRepository copyRepository;

    // Ödünç süresi (gün)
    private static final int LOAN_PERIOD_DAYS = 14;

    /**
     * Kullanıcının tüm loan'larını getirir (aktif + geçmiş).
     */
    public List<Loan> getMyLoans(User currentUser) {
        return loanRepository.findAllByUserIdOrderByLoanedAtDesc(currentUser.getId());
    }

    /**
     * Ödünç verme (borrow) işlemi.
     * İş kuralları:
     * 1) Copy AVAILABLE olmalı
     * 2) Kullanıcıda aktif loan olmamalı
     * 3) Copy zaten loaned ise 409
     */
    public Loan borrow(User currentUser, String copyId) {

        // Copy var mı?
        Copy copy = copyRepository.findById(copyId)
                .orElseThrow(() -> new NotFoundException("Copy not found"));

        // Copy zaten LOANED veya HOLD durumunda olamaz
        if (!copy.getStatus().equals("AVAILABLE")) {
            throw new ValidationException("Copy is not available");
        }

        // Kullanıcının aktif loan'ı var mı?
        loanRepository.findByUserIdAndReturnedAtIsNull(currentUser.getId())
                .ifPresent(l -> {
                    throw new ValidationException("You already have an active loan.");
                });

        // Copy başka bir aktif loan'da mı?
        loanRepository.findByCopyIdAndReturnedAtIsNull(copyId)
                .ifPresent(l -> {
                    throw new ValidationException("Copy is already loaned.");
                });

        // Loan oluştur
        Instant now = Instant.now();
        Instant due = now.plus(LOAN_PERIOD_DAYS, ChronoUnit.DAYS);

        Loan loan = Loan.builder()
                .copyId(copyId)
                .userId(currentUser.getId())
                .loanedAt(now)
                .dueAt(due)
                .returnedAt(null)
                .build();

        // Copy durumunu güncelle
        copy.setStatus("LOANED");
        copyRepository.save(copy);

        return loanRepository.save(loan);
    }

    /**
     * İade işlemi (return loan)
     */
    public Loan returnLoan(User currentUser, String loanId) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new NotFoundException("Loan not found"));

        // Kullanıcı kendi loan'ını iade etmeli (admin için kontrolü controller’da açık bırakabiliriz)
        if (!loan.getUserId().equals(currentUser.getId())) {
            throw new ValidationException("You cannot return another user's loan.");
        }

        // Zaten iade edilmişse:
        if (loan.getReturnedAt() != null) {
            throw new ValidationException("This loan is already returned.");
        }

        // returnedAt işaretle
        loan.setReturnedAt(Instant.now());
        loanRepository.save(loan);

        // Copy'yi AVAILABLE yap
        Copy copy = copyRepository.findById(loan.getCopyId())
                .orElseThrow(() -> new NotFoundException("Copy not found"));

        copy.setStatus("AVAILABLE");
        copyRepository.save(copy);

        return loan;
    }
}
