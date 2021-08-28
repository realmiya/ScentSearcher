package com.example.COMP9900.dtos.perfume;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PerfumeInBookmarkGetDto {
    private Long id;
    private String perfumeName;
    private String brand;
    private String date;
    private String image;
    private String description;
    private String target;
}
