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

    private String bookId;

    // Fiziksel barkod (opsiyonel)
    private String barcode;

    // CopyStatus.AVAILABLE | LOANED | HOLD
    private String status;

    // Şube bilgisi (şimdilik MAIN)
    private String location;
}
