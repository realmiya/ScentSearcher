package com.example.COMP9900.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "notes")
public class Notes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "note_name", nullable = false)
    private String noteName;

    @Column(name = "image")
    private String image;

    @ManyToMany
    @JoinTable(name = "note_in_perfume",
            joinColumns = @JoinColumn(name = "note_id"),
            inverseJoinColumns = @JoinColumn(name = "perfume_id"))
    private Set<Perfume> perfumes;

    @ManyToMany
    @JoinTable(name = "accounts_notes",
            joinColumns = @JoinColumn(name = "note_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id"))
    private Set<Account> accounts;
}
