package com.angelina.myWallet.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name cannot be null")
    @Size(min = 3, max = 50)
    private String name;
    @Size(min = 3, max = 50)
    private String accountNumber;
    @Size(min = 3, max = 200)
    private String description;
    private Integer priority;
    private Double currentBalance;
    @PrePersist
    public void setBalance()
    {
        this.currentBalance = new Double(0);
    }


}
