package com.example.COMP9900.dtos.review;

import com.example.COMP9900.dtos.account.AccountInReviewGetDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewGetDto {
    private Long id;
    private Boolean ifLike;
    private Integer rating;
    private String review;
    private AccountInReviewGetDto account;
}
