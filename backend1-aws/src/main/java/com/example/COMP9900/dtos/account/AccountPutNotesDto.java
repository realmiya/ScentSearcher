package com.example.COMP9900.dtos.account;

import com.example.COMP9900.dtos.note.NoteGetDto;
import com.example.COMP9900.dtos.note.NoteInAccountPutDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class AccountPutNotesDto {
    private Set<NoteGetDto> notes;
}
