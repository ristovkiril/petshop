package com.example.petshopbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserAlreadyExist extends RuntimeException {
    public UserAlreadyExist() {
        super("Корисничкото име веќе постои");
    }
}
