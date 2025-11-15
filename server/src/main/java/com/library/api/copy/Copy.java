package com.library.api.copy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "copies")
public class Copy {

    @Id
    private String id;

    // Hangi kitaba ait?
    private String bookId;

    // Kütüphanedeki fiziki kopyaya ait barkod (şimdilik optional)
    private String barcode;

    // AVAILABLE, LOANED, HOLD
    private String status;

    // Şube/konum (şimdilik MAIN)
    private String location;
}
