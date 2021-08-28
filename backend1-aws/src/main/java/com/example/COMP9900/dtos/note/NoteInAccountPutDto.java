package com.example.COMP9900.dtos.note;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteInAccountPutDto {
    private String noteName;
    private String image;
}
