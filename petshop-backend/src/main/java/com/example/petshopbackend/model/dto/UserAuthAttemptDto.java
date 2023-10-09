package com.example.petshopbackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserAuthAttemptDto {

    private String username;
    private String password;

    public UserAuthAttemptDto() {

    }
}
