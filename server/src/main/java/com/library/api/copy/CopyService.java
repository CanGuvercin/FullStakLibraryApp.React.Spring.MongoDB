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
     * Bir kitabın tüm kopyalarını getirir.
     */
    public List<Copy> getCopiesByBookId(String bookId) {
        return copyRepository.findAllByBookId(bookId);
    }

    /**
     * Bir kitabın AVAILABLE olan kopya sayısını döner.
     */
    public int getAvailableCount(String bookId) {
        return copyRepository.findAllByBookIdAndStatus(bookId, "AVAILABLE").size();
    }

    /**
     * Bir kitabın AVAILABLE olan ilk kopyasını döner.
     */
    public Copy getFirstAvailableCopy(String bookId) {
        return copyRepository.findFirstByBookIdAndStatus(bookId, "AVAILABLE")
                .orElse(null);
    }

    /**
     * ID üzerinden copy bulur, yoksa hata fırlatır.
     */
    public Copy getCopyOrThrow(String copyId) {
        return copyRepository.findById(copyId)
                .orElseThrow(() -> new NotFoundException("Copy not found"));
    }

/**
 * Copy'nin durumunu güncelleyip veritabanın*
 **/
}