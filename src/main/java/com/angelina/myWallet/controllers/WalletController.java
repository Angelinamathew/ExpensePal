package com.angelina.myWallet.controllers;

import com.angelina.myWallet.entity.Wallet;
import com.angelina.myWallet.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/wallet")
public class WalletController {
    @Autowired
    private WalletService walletService;
    @PostMapping
    public ResponseEntity<?> create(@PathVariable @Valid Wallet wallet, BindingResult result){
        if (result.hasErrors()){
            Map<String, String> errorHashMap = new HashMap<String, String>();
            for(FieldError error1: result.getFieldErrors()){
                errorHashMap.put(error1.getField(), error1.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(errorHashMap, HttpStatus.BAD_REQUEST);
        }
        Wallet saved = WalletService.createOrUpdate(wallet);
        return new ResponseEntity<Wallet>(saved, HttpStatus.CREATED);
    }
}
