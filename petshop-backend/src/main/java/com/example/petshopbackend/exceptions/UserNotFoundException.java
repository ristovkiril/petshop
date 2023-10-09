package com.example.petshopbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("Корисникот не е пронајден");
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
