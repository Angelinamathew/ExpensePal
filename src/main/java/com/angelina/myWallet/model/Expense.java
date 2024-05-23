package com.angelina.myWallet.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "expense")
public class Expense {

    @Id
    private Long id;
    //pin the time for timestamp
    private Instant expenseDate;

    private String description;

    //many expenses can go under one category
    @ManyToOne
    private Category category;

    //Many expense goes to one user
    @ManyToOne
    private User user;


}
