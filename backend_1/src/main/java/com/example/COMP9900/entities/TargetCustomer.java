package com.example.COMP9900.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "target_customer")
public class TargetCustomer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index", updatable = false, nullable = false)
    private Long id;

    @Column(name = "customer")
    private String customer;

    @OneToMany(mappedBy = "TargetCustomer")
    private List<Perfume> perfumeList;
}
