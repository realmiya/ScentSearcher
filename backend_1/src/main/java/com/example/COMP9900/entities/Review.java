package com.example.COMP9900.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "if_like", nullable = false)
    private Boolean ifLike;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Column(name = "review", nullable = false)
    private String review;

    @ManyToOne()
    @JoinColumn(name="perfume_id")
    private Perfume perfume;

    @ManyToOne()
    @JoinColumn(name="account_id")
    private Account account;
}
