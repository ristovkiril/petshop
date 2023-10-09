package com.example.petshopbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserHasNoPrivileges extends RuntimeException {
    public UserHasNoPrivileges() {
        super("Немате пристап до бараниот ресурс");
    }

    public UserHasNoPrivileges(String message) {
        super(message);
    }
}
