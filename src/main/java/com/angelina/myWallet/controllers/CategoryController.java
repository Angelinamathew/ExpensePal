package com.angelina.myWallet.controllers;

import com.angelina.myWallet.model.Category;
import com.angelina.myWallet.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
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
    //The method returns a collection of Category objects.
    Collection<Category> categories(){
        return categoryRepository.findAll();
        //This line fetches all categories from the database. It's equivalent to the SQL query SELECT * FROM categories
    }
    //category/1
    @GetMapping("/category/{id}")
    ResponseEntity<?> get(@PathVariable Long id){
        //@PathVariable Long id: Extracts the id from the URL path.
       // fetch a Category by its ID and returns an Optional<Category> which can either contain the category or be empty.
        Optional<Category> category = categoryRepository.findAllById(id);
        // ResponseEntity represent an HTTP response, including the status code, headers, and body
        // If the category is found, it is wrapped in a ResponseEntity with a 200 OK status.
        // If the category is not found, a ResponseEntity with a 404 Not Found status is returned.
        return category.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    /*

     */
    @PostMapping("/category")
    ResponseEntity<Category> create(@Valid @RequestBody Category category) throws URISyntaxException{
        //This line saves the Category object to the database using the CategoryRepository and returns the saved entity
        System.out.println(category.toString());
        Category result = categoryRepository.save(category);
        //This creates a ResponseEntity with a status of 201 Created. The created method also sets the Location header of the response to the URI of the newly created resource.
        // The URI is constructed using the base URL /api/category and appending the ID of the created category (result.getId()).
        //This sets the body of the response to the Category object that was saved and returned by categoryRepository.save
        return ResponseEntity.created(new URI("/api/category/" + result.getId())).
                body(result);
    }
    @PutMapping("/category/{id}")
    ResponseEntity<Category> update(@Valid @RequestBody Category category){
       // @PathVariable Long id: Extracts the id from the URL path.
        //Checks if the Category with the given ID exists.
        //Updates the existing Category fields (name and userId) with values from the request body.
        //Saves the updated Category back to the database.
        Category result = categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }
    //If the Category exists, it is deleted using categoryRepository.delete(category).
    //The method returns a ResponseEntity with HTTP status 204 No Content to indicate successful deletion.
    //If the Category does not exist, the method returns a ResponseEntity with HTTP status 404 Not Found.
    @DeleteMapping("/category/{id}")
    ResponseEntity<?> delete(@PathVariable Long id) {
        return categoryRepository.findById(id).map(category -> {
                categoryRepository.delete(category);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }
}
