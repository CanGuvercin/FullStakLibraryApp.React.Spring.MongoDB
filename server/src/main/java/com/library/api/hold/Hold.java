package com.library.api.hold;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "holds")
public class Hold {

    @Id
    private String id;

    private String bookId;

    private String userId;

    private Instant queuedAt;

    // QUEUED, CANCELLED, FULFILLED (şimdilik 2 tanesi yeter)
    private String status;
}
