package com.example.COMP9900.dtos.note;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class NotePutDto {
    private List<String> includingNoteName;
    private List<String> excludingNoteName;
}
