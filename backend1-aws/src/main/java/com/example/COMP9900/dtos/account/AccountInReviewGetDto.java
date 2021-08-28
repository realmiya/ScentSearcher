package com.example.COMP9900.dtos.account;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountInReviewGetDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String gender;
}
