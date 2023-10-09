package com.example.petshopbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DisabledAccountException extends RuntimeException {
    public DisabledAccountException() {
        super("Акаунтот не е активен, ве молиме контактирајте го администраторот.");
    }
}
