package com.library.api.book;

import com.library.api.controller.dto.BookDetailDto;
import com.library.api.controller.dto.BookListItemDto;
import com.library.api.copy.Copy;
import com.library.api.copy.CopyRepository;
import com.library.api.exception.NotFoundException;
import com.library.api.hold.HoldRepository;
import com.library.api.loan.LoanRepository;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CopyRepository copyRepository;
    private final LoanRepository loanRepository;
    private final HoldRepository holdRepository;

    /**
     * Kitap detay mantığı:
     * - Kitabı bul
     * - Available copies bul
     * - Kullanıcının aktif loan var mı bul
     * - Kullanıcının active hold var mı bulacak
     * - DTO’ya dök
     *  - MOCK DATANIN SONU ULAN
     */
    public BookDetailDto getBookDetail(User currentUser, String bookId) {

        // --- 1) Kitabı bul ---
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("Book not found"));

        // --- 2) Copy'leri bul ---
        List<Copy> copies = copyRepository.findAllByBookId(bookId);

        // Available copy count
        int availableCount = (int) copies.stream()
                .filter(c -> c.getStatus().equals("AVAILABLE"))
                .count();

        // ilk available copy id (yoksa null)
        String availableCopyId = copies.stream()
                .filter(c -> c.getStatus().equals("AVAILABLE"))
                .map(Copy::getId)
                .findFirst()
                .orElse(null);

        // --- 3) Kullanıcının active loan durumu ---
        boolean userHasLoan = false;
        String activeLoanId = null;

        if (currentUser != null) {
            var activeLoanOpt =
                    loanRepository.findByUserIdAndReturnedAtIsNull(currentUser.getId());

            if (activeLoanOpt.isPresent()) {
                var activeLoan = activeLoanOpt.get();

                // Loan hangi copy'ye ait?
                var loanCopy =
                        copyRepository.findById(activeLoan.getCopyId()).orElse(null);

                if (loanCopy != null && loanCopy.getBookId().equals(bookId)) {
                    userHasLoan = true;
                    activeLoanId = activeLoan.getId();
                }
            }
        }

        // --- 4) Kullanıcının hold durumu ---
        boolean userHasHold = false;
        String activeHoldId = null;

        if (currentUser != null) {
            var holdOpt =
                    holdRepository.findByUserIdAndBookIdAndStatus(
                            currentUser.getId(),
                            bookId,
                            "QUEUED"
                    );

            if (holdOpt.isPresent()) {
                userHasHold = true;
                activeHoldId = holdOpt.get().getId();
            }
        }

        // --- 5) DTO döndür ---
        return BookDetailDto.from(
                book,
                availableCopyId,
                availableCount,
                userHasLoan,
                userHasHold,
                activeLoanId,
                activeHoldId
        );
    }

    public List<BookListItemDto> getBooks(String query) {
        List<Book> books;

        if (query == null || query.isBlank()) {
            books = bookRepository.findAll();
        } else {
            books = bookRepository.findByTitleContainingIgnoreCase(query);
        }

        return books.stream()
                .map(BookListItemDto::from)
                .toList();
    }

    //checking control 17 november2763

}
