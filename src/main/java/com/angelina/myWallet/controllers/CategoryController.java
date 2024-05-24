package com.angelina.myWallet.controllers;

import com.angelina.myWallet.model.Category;
import com.angelina.myWallet.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }
    @GetMapping("/categories")
    Collection<Category> categories(){
        return categoryRepository.findAll();
        //Select * from categories
    }
    //category/1
    @GetMapping("/categories/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id){
        //it returns category
        //using optional because it might not return anything
        Optional<Category> category = categoryRepository.findAllById(id);
        return category.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }
}
