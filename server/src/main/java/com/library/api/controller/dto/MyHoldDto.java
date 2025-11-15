package com.library.api.controller.dto;

import com.library.api.hold.Hold;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyHoldDto {

    private String id;
    private String bookId;
    private String queuedAt;
    private String status;

    public static MyHoldDto from(Hold hold) {
        return MyHoldDto.builder()
                .id(hold.getId())
                .bookId(hold.getBookId())
                .queuedAt(hold.getQueuedAt().toString())
                .status(hold.getStatus())
                .build();
    }
}
