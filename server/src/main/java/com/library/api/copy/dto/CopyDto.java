package com.library.api.copy.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CopyDto {
    private String id;
    private String status;
    private String location;
}
