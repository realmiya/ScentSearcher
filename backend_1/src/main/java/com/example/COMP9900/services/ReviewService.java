package com.example.COMP9900.services;

import com.example.COMP9900.dtos.review.ReviewGetDto;
import com.example.COMP9900.dtos.review.ReviewPutDto;
import com.example.COMP9900.entities.Account;
import com.example.COMP9900.entities.Perfume;
import com.example.COMP9900.entities.Review;
import com.example.COMP9900.mappers.ReviewMapper;
import com.example.COMP9900.repositories.AccountRepository;
import com.example.COMP9900.repositories.PerfumesRepository;
import com.example.COMP9900.repositories.ReviewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewsRepository reviewsRepository;
    private final ReviewMapper reviewMapper;
    private final AccountRepository accountRepository;
    private final PerfumesRepository perfumesRepository;

    public ReviewGetDto createReview(ReviewPutDto newReview) {
        Review review = new Review();
        Optional<Account> account = accountRepository.findById(newReview.getAccountId());
        Optional<Perfume> perfume = perfumesRepository.findById(newReview.getPerfumeId());
        review = reviewMapper.toEntity(newReview);
        if (account.isPresent()) {
            review.setAccount(account.get());
        }
        if (perfume.isPresent()) {
            review.setPerfume(perfume.get());
        }
        Review dbReview = reviewsRepository.save(review);
        return reviewMapper.fromEntity(dbReview);
    }
}
