package com.example.petshopbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RatingNotValidException extends RuntimeException {

    public RatingNotValidException() {
        super("Dog rating is not valid (0-10)");
    }
}
