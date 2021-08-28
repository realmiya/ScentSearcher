package com.example.COMP9900.dtos.perfume;

import com.example.COMP9900.dtos.note.NoteGetDto;
import com.example.COMP9900.dtos.review.ReviewGetDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class PerfumeGetDto {
    private Long id;
    private String perfumeName;
    private String brand;
    private String date;
    private String image;
    private String description;
    private String target;
    private Set<NoteGetDto> notes;
    private Set<ReviewGetDto> reviews;
}
