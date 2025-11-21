package com.library.api.copy;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CopyRepository extends MongoRepository<Copy, String> {

    // Bir kitabın tüm kopyaları
    List<Copy> findAllByBookId(String bookId);

    // Bir kitabın belirli statüdeki kopyaları
    List<Copy> findAllByBookIdAndStatus(String bookId, String status);

    //ver id'yi al kitabı bilader
    List<Copy> findByBookId(String bookId);

    // AVAILABLE olan ilk fiziksel kopya
    Optional<Copy> findFirstByBookIdAndStatus(String bookId, String status);

    // AVAILABLE sayısını hızlıca almak için
    long countByBookIdAndStatus(String bookId, String status);
}
