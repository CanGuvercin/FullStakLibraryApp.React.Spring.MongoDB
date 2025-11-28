package com.library.api.book;

import com.library.api.book.dto.*;
import com.library.api.copy.Copy;
import com.library.api.copy.CopyRepository;
import com.library.api.copy.CopyStatus;
import com.library.api.copy.dto.CopyDto;
import com.library.api.exception.NotFoundException;
import com.library.api.hold.HoldRepository;
import com.library.api.loan.LoanRepository;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.library.api.book.dto.UpsertBookDto;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CopyRepository copyRepository;
    private final LoanRepository loanRepository;
    private final HoldRepository holdRepository;

    /**
     * Book Detail Logic
     */

    public BookDetailDto getBookDetail(User currentUser, String bookId) {

        // 1) Book
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("Book not found"));

        // 2) Copies
        List<Copy> copies = copyRepository.findByBookId(bookId);

        int availableCount = (int) copies.stream()
                .filter(c -> CopyStatus.AVAILABLE.equals(c.getStatus()))
                .count();

        List<CopyDto> copyDtos = copies.stream()
                .map(c -> CopyDto.builder()
                        .id(c.getId())
                        .status(c.getStatus().toString())
                        .location(c.getLocation())
                        .build()
                )
                .toList();

        // 3) AVAILABLE copy ID
        String availableCopyId = copyRepository
                .findFirstByBookIdAndStatus(bookId, CopyStatus.AVAILABLE)
                .map(Copy::getId)
                .orElse(null);

        // 4) Active Loan for THIS BOOK
        boolean userHasLoan = false;
        String activeLoanId = null;

        if (currentUser != null) {
            var activeLoanOpt = loanRepository.findByUserIdAndReturnedAtIsNull(currentUser.getId());

            if (activeLoanOpt.isPresent()) {
                var loan = activeLoanOpt.get();
                var copy = copyRepository.findById(loan.getCopyId()).orElse(null);

                if (copy != null && copy.getBookId().equals(bookId)) {
                    userHasLoan = true;
                    activeLoanId = loan.getId();
                }
            }
        }

        // 5) Hold logic same

        boolean userHasHold = false;
        String activeHoldId = null;

        if (currentUser != null) {
            var holdOpt = holdRepository.findByUserIdAndBookIdAndStatus(
                    currentUser.getId(), bookId, "QUEUED");

            if (holdOpt.isPresent()) {
                userHasHold = true;
                activeHoldId = holdOpt.get().getId();
            }
        }

        return BookDetailDto.builder()
                .id(book.getId())
                .bookId(book.getId())
                .title(book.getTitle())
                .description(book.getDescription())
                .isbn(book.getIsbn())
                .publicationYear(book.getPublicationYear())
                .authors(book.getAuthors())
                .coverUrl(book.getCoverUrl())
                .tags(book.getTags())
                .availableCount(availableCount)
                .totalCopies(copies.size())
                .copies(copyDtos)
                .availableCopyId(availableCopyId)
                .userHasLoan(userHasLoan)
                .userHasHold(userHasHold)
                .activeLoanId(activeLoanId)
                .activeHoldId(activeHoldId)
                .build();
    }
}