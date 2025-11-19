package com.library.api.copy;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CopyRepository extends MongoRepository<Copy, String> {

    // Bir kitabın tüm kopyaları
    List<Copy> findAllByBookId(String bookId);

    // Bir kitabın AVAILABLE kopyaları
    List<Copy> findAllByBookIdAndStatus(String bookId, String status);

    // AVAILABLE olan tek bir kopyayı bul (ilk bulunan)
    Optional<Copy> findFirstByBookIdAndStatus(String bookId, String status);

    long countByBookIdAndStatus(String bookId, String status);

}
