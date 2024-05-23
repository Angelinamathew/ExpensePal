package com.angelina.myWallet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="category")
public class Category {
    @Id
    private Long id;

    private String name;

    //many categories can assign to one user
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User user;@
}
