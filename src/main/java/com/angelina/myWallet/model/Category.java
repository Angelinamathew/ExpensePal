package com.angelina.myWallet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="category")
public class Category {
    @Id
    private Long id;

    private String name;

}
