package com.example.COMP9900.mappers;


import com.example.COMP9900.dtos.review.ReviewGetDto;
import com.example.COMP9900.dtos.review.ReviewPutDto;
import com.example.COMP9900.entities.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    ReviewGetDto fromEntity(Review review);

    List<ReviewGetDto> fromEntities(List<Review> reviews);

    Review toEntity(ReviewPutDto reviewPutDto);
}
