package com.example.petshopbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PetAlreadyHasOwnerException extends RuntimeException {
    public PetAlreadyHasOwnerException() {
        super("Pet already has owner");
    }
}
