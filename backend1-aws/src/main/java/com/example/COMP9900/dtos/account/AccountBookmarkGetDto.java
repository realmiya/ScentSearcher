package com.example.COMP9900.dtos.account;

import com.example.COMP9900.dtos.perfume.PerfumeInBookmarkGetDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class AccountBookmarkGetDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String gender;
    private Set<PerfumeInBookmarkGetDto> perfumes;
}
