package com.example.COMP9900.dtos.account;

import com.example.COMP9900.dtos.note.NoteGetDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class AccountGetDto {
    private Long id;
    private String username;
    private String encodedPassword;
    private String firstName;
    private String lastName;
    private String gender;
    private Set<NoteGetDto> notes;
}
