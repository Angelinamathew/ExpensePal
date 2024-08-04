package com.angelina.myWallet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.Instant;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Data
@Table(name="expense")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Instant expenseDate;

    @NotBlank
    private String description;

    private String location;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "expense_in_dollar", precision = 10, scale = 2)
    private BigDecimal expenseInDollar;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
