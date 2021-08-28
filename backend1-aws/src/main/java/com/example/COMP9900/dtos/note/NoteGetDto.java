package com.example.COMP9900.dtos.note;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteGetDto {
    private Long id;
    private String noteName;
    private String image;
}
