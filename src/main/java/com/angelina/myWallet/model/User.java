package com.angelina.myWallet.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="user")
public class User {
    @Id
    private Long id;

    private String name;

    private  String email;


    //one user can have many categories
    //using set because it doesn't contain duplicates
    @OneToMany
    private Set<Category> categories;



}
