package com.example.petshopbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InsufficientBudgetException extends RuntimeException {

    public InsufficientBudgetException() {
        super("Insufficient budget to purchase the pet.");
    }
}
