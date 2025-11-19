package com.library.api.hold.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyHoldDto {

    private String id;
    private String bookId;
    private String bookTitle;
    private String queuedAt;
    private String status; // QUEUED / NOTIFIED / EXPIRED / FULFILLED
}
