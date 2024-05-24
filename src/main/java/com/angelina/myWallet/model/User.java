package com.angelina.myWallet.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="app_user")
public class User {
    @Id
    private Long id;

    private String name;

    private  String email;




}
