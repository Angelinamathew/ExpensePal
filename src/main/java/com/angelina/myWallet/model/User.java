package com.angelina.myWallet.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="user")
public class User {

    private Long id;

    private String name;

    private  String email;

}
