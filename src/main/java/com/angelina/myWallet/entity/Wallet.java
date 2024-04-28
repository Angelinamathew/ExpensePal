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
    @NotBlank(message = "Name can't be blank")
    @Size(min = 2,max = 30)
    private String name;
    @Size(min = 2,max = 30)
    private String accountNumber;
    @Size(max = 100)
    private String description;
    private Integer priority; //1=High; 2=Medium; 3=Low
    private Double currentBalance;

    @PrePersist
    public void setCurrentBalance(){
        this.currentBalance = 0.0;
    }

}