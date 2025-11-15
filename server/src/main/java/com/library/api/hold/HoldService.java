package com.library.api.hold;

import com.library.api.exception.NotFoundException;
import com.library.api.exception.ValidationException;
import com.library.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HoldService {

    private final HoldRepository holdRepository;

    /**
     * Kullanıcının tüm hold'larını getirir (aktif + iptal).
     */
    public List<Hold> getMyHolds(User currentUser) {
        return holdRepository.findAllByUserIdOrderByQueuedAtDesc(currentUser.getId());
    }

    /**
     * Hold oluşturma işlemi
     * Kurallar:
     * 1) Kullanıcı bu kitabı zaten hold etmişse --> 409
     */
    public Hold createHold(User currentUser, String bookId) {

        // Duplicate hold engelle
        holdRepository.findByUserIdAndBookIdAndStatus(
                currentUser.getId(), bookId, "QUEUED"
        ).ifPresent(h -> {
            throw new ValidationException("You already have a hold for this book.");
        });

        Hold hold = Hold.builder()
                .userId(currentUser.getId())
                .bookId(bookId)
                .queuedAt(Instant.now())
                .status("QUEUED")
                .build();

        return holdRepository.save(hold);
    }

    /**
     * Hold iptal etme
     * Kurallar:
     * 1) Hold kullanıcıya ait olmalı
     * 2) Status = QUEUED olmalı
     */
    public Hold cancelHold(User currentUser, String holdId) {

        Hold hold = holdRepository.findById(holdId)
                .orElseThrow(() -> new NotFoundException("Hold not found"));

        // Kullanıcıya ait mi?
        if (!hold.getUserId().equals(currentUser.getId())) {
            throw new ValidationException("You cannot cancel another user's hold.");
        }

        // Durumu uygun mu?
        if (!hold.getStatus().equals("QUEUED")) {
            throw new ValidationException("Only queued holds can be cancelled.");
        }

        hold.setStatus("CANCELLED");
        return holdRepository.save(hold);
    }
}
