package com.example.COMP9900.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "perfume")
public class Perfume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perfume_id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "perfume_name", unique = true, nullable = false)
    private String perfumeName;

    @Column(name = "brand")
    private String brand;

    @Column(name = "date")
    private Integer date;

    @Column(name = "image")
    private String image;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name="target")
    private TargetCustomer TargetCustomer;

    @ManyToMany()
    @JoinTable(name = "note_in_perfume",
            joinColumns = @JoinColumn(name = "perfume_id"),
            inverseJoinColumns = @JoinColumn(name = "note_id"))
    private Set<Notes> notes;

    @OneToMany(mappedBy = "perfume")
    private List<Review> reviews;

    @ManyToMany()
    @JoinTable(name = "bookmarks",
            joinColumns = @JoinColumn(name = "perfume_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id"))
    private Set<Account> accounts;
}
