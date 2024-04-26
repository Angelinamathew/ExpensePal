package com.angelina.myWallet.service;

import com.angelina.myWallet.entity.Wallet;
import com.angelina.myWallet.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WalletService {
    @Autowired
    public WalletRepository walletRepository;
    public Wallet createOrUpdate(Wallet wallet){
        if (wallet.getId() == null){
            walletRepository.save(wallet);
        }else{
            walletRepository.save(wallet);
        }
        return wallet;
    }
}
