package com.angelina.myWallet.WalletException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
@RestController
@ControllerAdvice
public class EntityException extends ResponseEntityExceptionHandler {
    public final ResponseEntity<?> handleWalletException(WalletException ex, WebRequest request){
        ResponseException response = new ResponseException(ex.getMessage());
        return new ResponseEntity<ResponseException>(response, HttpStatus.BAD_REQUEST);
    }
}
