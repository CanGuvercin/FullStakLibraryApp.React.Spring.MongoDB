package com.library.api.copy;

import com.library.api.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CopyService {

    private final CopyRepository copyRepository;

    /**
     * Bir kitabın tüm fiziksel kopyaları
     */
    public List<Copy> getCopiesByBookId(String bookId) {
        return copyRepository.findAllByBookId(bookId);
    }

    /**
     * Bir kitabın AVAILABLE kopya sayısı
     */
    public long getAvailableCount(String bookId) {
        return copyRepository.countByBookIdAndStatus(bookId, CopyStatus.AVAILABLE);
    }

    /**
     * AVAILABLE ilk kopyayı getir
     */
    public Copy getFirstAvailableCopy(String bookId) {
        return copyRepository.findFirstByBookIdAndStatus(bookId, CopyStatus.AVAILABLE)
                .orElse(null);
    }

    /**
     * Copy bulamazsa hata fırlat
     */
    public Copy getCopyOrThrow(String copyId) {
        return copyRepository.findById(copyId)
                .orElseThrow(() -> new NotFoundException("Copy not found"));
    }
}
