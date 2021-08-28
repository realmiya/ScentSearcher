package com.example.COMP9900.dtos.review;

import com.example.COMP9900.dtos.account.AccountInReviewGetDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewPutDto {
    private Boolean ifLike;
    private Integer rating;
    private String review;
    private Long accountId;
    private Long perfumeId;
}
