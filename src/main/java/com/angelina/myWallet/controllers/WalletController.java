package com.angelina.myWallet.controllers;

import com.angelina.myWallet.entity.Wallet;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/wallet")
public class WalletController {
    @PostMapping
    public ResponseEntity<?> create(Wallet wallet, BindingResult result){
        if (result.hasErrors()){
            Map<String, String> error = new HashMap<String, String>();
        }
        return null;
    }
}
