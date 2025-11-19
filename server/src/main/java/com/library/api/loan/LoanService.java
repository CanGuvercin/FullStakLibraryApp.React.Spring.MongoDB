package com.library.api.loan;

import com.library.api.book.Book;
import com.library.api.book.BookRepository;
import com.library.api.copy.Copy;
import com.library.api.copy.CopyRepository;
import com.library.api.exception.NotFoundException;
import com.library.api.exception.ValidationException;
import com.library.api.loan.dto.MyLoanDto;
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
    private final BookRepository bookRepository;

    private static final int LOAN_PERIOD_DAYS = 14;

    /**
     * Kullanıcının tüm loanlarını DTO olarak döndürür.
     */
    public List<MyLoanDto> getMyLoans(User currentUser) {

        return loanRepository
                .findAllByUserIdOrderByLoanedAtDesc(currentUser.getId())
                .stream()
                .map(this::toDto)
                .toList();
    }

    /**
     * Borrow (ödünç alma)
     */
    public MyLoanDto borrow(User currentUser, String copyId) {

        // Copy kontrol
        Copy copy = copyRepository.findById(copyId)
                .orElseThrow(() -> new NotFoundException("Copy not found"));

        if (!"AVAILABLE".equals(copy.getStatus())) {
            throw new ValidationException("Copy is not available");
        }

        // User'ın aktif loan'ı var mı?
        loanRepository.findByUserIdAndReturnedAtIsNull(currentUser.getId())
                .ifPresent(l -> {
                    throw new ValidationException("You already have an active loan.");
                });

        // Copy başka loan’da mı?
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

        // Copy LOANED yapılır
        copy.setStatus("LOANED");
        copyRepository.save(copy);

        Loan saved = loanRepository.save(loan);
        return toDto(saved);
    }

    /**
     * Loan iade etme
     */
    public MyLoanDto returnLoan(User currentUser, String loanId) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new NotFoundException("Loan not found"));

        if (!loan.getUserId().equals(currentUser.getId())) {
            throw new ValidationException("You cannot return another user’s loan.");
        }

        if (loan.getReturnedAt() != null) {
            throw new ValidationException("This loan is already returned.");
        }

        // Loan güncelle
        loan.setReturnedAt(Instant.now());
        loanRepository.save(loan);

        // Copy AVAILABLE yapılır
        Copy copy = copyRepository.findById(loan.getCopyId())
                .orElseThrow(() -> new NotFoundException("Copy not found"));

        copy.setStatus("AVAILABLE");
        copyRepository.save(copy);

        // TODO: Hold kuyruğunu tetikle (sonraki adım)
        // holdService.handleReturnEvent(copy.getBookId());

        return toDto(loan);
    }

    /**
     * ENTITY → DTO mapping
     */
    private MyLoanDto toDto(Loan loan) {

        // Copy üzerinden bookId çekiyoruz
        Copy copy = copyRepository.findById(loan.getCopyId())
                .orElseThrow(() -> new NotFoundException("Copy not found for loan"));

        Book book = bookRepository.findById(copy.getBookId())
                .orElseThrow(() -> new NotFoundException("Book not found for loan"));

        return MyLoanDto.builder()
                .id(loan.getId())
                .bookId(book.getId())
                .bookTitle(book.getTitle())
                .copyId(loan.getCopyId())
                .loanedAt(loan.getLoanedAt().toString())
                .dueAt(loan.getDueAt().toString())
                .returnedAt(loan.getReturnedAt() == null ? null : loan.getReturnedAt().toString())
                .build();
    }
}
