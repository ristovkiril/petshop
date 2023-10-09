package com.example.petshopbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RequiredPropertyException extends RuntimeException {
    public RequiredPropertyException() {
        super("Полето е задолжително");
    }

    public RequiredPropertyException(String message) {
        super(message);
    }
}
