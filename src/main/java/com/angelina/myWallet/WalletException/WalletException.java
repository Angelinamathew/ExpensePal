package com.angelina.myWallet.WalletException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class WalletException extends RuntimeException {

    public WalletException(String s) {
        super(s);
    }
}
