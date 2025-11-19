package com.library.api.hold;

import com.library.api.book.Book;
import com.library.api.book.BookRepository;
import com.library.api.copy.CopyRepository;
import com.library.api.exception.NotFoundException;
import com.library.api.exception.ValidationException;
import com.library.api.hold.dto.MyHoldDto;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HoldService {

    private final HoldRepository holdRepository;
    private final CopyRepository copyRepository;
    private final BookRepository bookRepository;

    /**
     * Kullanıcının tüm hold'larını DTO olarak döndürür.
     */
    public List<MyHoldDto> getMyHolds(User currentUser) {
        return holdRepository.findAllByUserIdOrderByQueuedAtDesc(currentUser.getId())
                .stream()
                .map(this::toDto)
                .toList();
    }

    /**
     * Hold oluşturma kuralları:
     * 1) Kitabın AVAILABLE copy’si varsa hold yapılamaz
     * 2) Kullanıcı aynı kitabı QUEUED veya READY durumunda tekrar hold edemez
     * 3) Yeni hold → QUEUED
     */
    public MyHoldDto createHold(User currentUser, String bookId) {

        // 1) Kitap AVAILABLE mı?
        long availableCount = copyRepository.countByBookIdAndStatus(bookId, "AVAILABLE");
        if (availableCount > 0) {
            throw new ValidationException("Book has available copies. Hold is not allowed.");
        }

        // 2) Duplicate hold engelle
        holdRepository.findByUserIdAndBookIdAndStatus(currentUser.getId(), bookId, "QUEUED")
                .ifPresent(h -> {
                    throw new ValidationException("You already have a queued hold for this book.");
                });

        holdRepository.findByUserIdAndBookIdAndStatus(currentUser.getId(), bookId, "READY")
                .ifPresent(h -> {
                    throw new ValidationException("You already have a ready hold for this book.");
                });

        // 3) Yeni hold oluştur
        Hold hold = Hold.builder()
                .userId(currentUser.getId())
                .bookId(bookId)
                .queuedAt(Instant.now())
                .status("QUEUED")
                .build();

        return toDto(holdRepository.save(hold));
    }

    /**
     * Hold iptal etme:
     * 1) Kullanıcıya ait olmalı
     * 2) Status = QUEUED olmalı
     */
    public MyHoldDto cancelHold(User currentUser, String holdId) {

        Hold hold = holdRepository.findById(holdId)
                .orElseThrow(() -> new NotFoundException("Hold not found"));

        if (!hold.getUserId().equals(currentUser.getId())) {
            throw new ValidationException("You cannot cancel another user's hold.");
        }

        if (!hold.getStatus().equals("QUEUED")) {
            throw new ValidationException("Only queued holds can be cancelled.");
        }

        hold.setStatus("CANCELLED");
        return toDto(holdRepository.save(hold));
    }

    /**
     * Loan iade edildiğinde çağrılacak
     * BookId verilir → sıradaki hold READY yapılır
     */
    public void handleReturnEvent(String bookId) {

        // Sıradaki hold
        var nextHoldOpt = holdRepository.findFirstByBookIdAndStatusOrderByQueuedAtAsc(bookId, "QUEUED");

        if (nextHoldOpt.isPresent()) {
            Hold hold = nextHoldOpt.get();
            hold.setStatus("READY");
            holdRepository.save(hold);

            // TODO: Notification sistemi bağlanırsa buraya hook konacak
        }
    }

    /**
     * Hold → DTO
     */
    private MyHoldDto toDto(Hold hold) {

        Book book = bookRepository.findById(hold.getBookId())
                .orElseThrow(() -> new NotFoundException("Book not found for hold"));

        return MyHoldDto.builder()
                .id(hold.getId())
                .bookId(book.getId())
                .bookTitle(book.getTitle())
                .queuedAt(hold.getQueuedAt().toString())
                .status(hold.getStatus())
                .build();
    }
}
