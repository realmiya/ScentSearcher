package com.example.COMP9900.repositories;

import com.example.COMP9900.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository  extends JpaRepository<Review, Long> {
}
