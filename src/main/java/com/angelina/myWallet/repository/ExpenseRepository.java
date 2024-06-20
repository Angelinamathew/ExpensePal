package com.angelina.myWallet.repository;

import com.angelina.myWallet.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {

}
