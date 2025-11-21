package com.library.api.book;

import com.library.api.book.dto.*;
import com.library.api.copy.Copy;
import com.library.api.copy.CopyRepository;
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

        // 1) Kitap
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("Book not found"));

        // 2) Kopyalar
        List<Copy> copies = copyRepository.findByBookId(bookId);

        int availableCount = (int) copies.stream()
                .filter(c -> "AVAILABLE".equals(c.getStatus()))
                .count();

        List<CopyDto> copyDtos = copies.stream()
                .map(c -> CopyDto.builder()
                        .id(c.getId())
                        .status(c.getStatus().toString())
                        .location(c.getLocation())
                        .build())
                .toList();

        // 3) Kullanıcının aktif loan durumu
        boolean userHasLoan = false;
        String activeLoanId = null;

        if (currentUser != null) {
            var activeLoanOpt = loanRepository.findByUserIdAndReturnedAtIsNull(currentUser.getId());

            if (activeLoanOpt.isPresent()) {
                var loan = activeLoanOpt.get();
                var loanCopy = copyRepository.findById(loan.getCopyId()).orElse(null);

                if (loanCopy != null && loanCopy.getBookId().equals(bookId)) {
                    userHasLoan = true;
                    activeLoanId = loan.getId();
                }
            }
        }

        // 4) Kullanıcının aktif hold durumu
        boolean userHasHold = false;
        String activeHoldId = null;

        if (currentUser != null) {
            var holdOpt = holdRepository.findByUserIdAndBookIdAndStatus(
                    currentUser.getId(),
                    bookId,
                    "QUEUED"
            );

            if (holdOpt.isPresent()) {
                userHasHold = true;
                activeHoldId = holdOpt.get().getId();
            }
        }

        // 5) DTO üret
        return BookDetailDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authors(book.getAuthors())
                .description(book.getDescription())
                .isbn(book.getIsbn())
                .publicationYear(book.getPublicationYear())
                .availableCount(availableCount)
                .totalCopies(copies.size())
                .copies(copyDtos)  // ← EKLENDİ
                .userHasLoan(userHasLoan)
                .userHasHold(userHasHold)
                .activeLoanId(activeLoanId)
                .activeHoldId(activeHoldId)
                .build();
    }



    /**
     * Book List Logic
     */
    public List<BookListItemDto> getBooks(String query) {

        List<Book> books;

        if (query == null || query.isBlank()) {
            books = bookRepository.findAll();
        } else {
            books = bookRepository.findByTitleContainingIgnoreCase(query);
        }

        return books.stream()
                .map(book -> BookListItemDto.builder()
                        .id(book.getId())
                        .bookId(book.getId())
                        .title(book.getTitle())
                        .authors(book.getAuthors())
                        .availableCopies(
                                (int) copyRepository.countByBookIdAndStatus(book.getId(), "AVAILABLE")
                        )
                        .build()
                )
                .toList();
    }

    public BookDetailDto createBook(UpsertBookDto dto) {

        Book book = Book.builder()
                .isbn(dto.getIsbn())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .coverUrl(dto.getCoverUrl())
                .authors(dto.getAuthors())
                .tags(dto.getTags())
                .publicationYear(dto.getPublicationYear())
                .build();

        Book saved = bookRepository.save(book);

        return BookDetailDto.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .description(saved.getDescription())
                .isbn(saved.getIsbn())
                .publicationYear(saved.getPublicationYear())
                .authors(saved.getAuthors())
                .coverUrl(saved.getCoverUrl())
                .tags(saved.getTags())
                .availableCount(0)
                .totalCopies(0)
                .userHasLoan(false)
                .userHasHold(false)
                .activeLoanId(null)
                .activeHoldId(null)
                .build();
    }

}
