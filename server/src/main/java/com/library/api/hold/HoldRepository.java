package com.library.api.hold;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoldRepository extends MongoRepository<Hold, String> {

    // Kullanıcının tüm holde'ları (geçmiş + aktif)
    List<Hold> findAllByUserIdOrderByQueuedAtDesc(String userId);

    // Kullanıcı bu kitap için zaten hold oluşturmuş mu?
    Optional<Hold> findByUserIdAndBookIdAndStatus(String userId, String bookId, String status);

    // Bir kitabın hold kuyruğu (admin veya otomatik çağırma için)
    List<Hold> findAllByBookIdAndStatusOrderByQueuedAtAsc(String bookId, String status);

    Optional<Hold> findFirstByBookIdAndStatusOrderByQueuedAtAsc(String bookId, String status);

}
