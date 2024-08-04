package com.angelina.myWallet.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.angelina.myWallet.model.Expense;
import com.angelina.myWallet.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    //Calls expenseRepository.findAll() to retrieve all expenses from the database and returns them as a list.
    public List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        //Tries to find an expense by its ID using expenseRepository.findById(id).
        //If the expense is present, it deletes it using expenseRepository.deleteById(id) and returns a 200 OK response.
        //If the expense is not found, it returns a 404 Not Found response.
        Optional<Expense> expense = expenseRepository.findById(id);
        if (expense.isPresent()) {
            expenseRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/expenses")
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/expenses/" + result.getId())).body(result);
    }
}
