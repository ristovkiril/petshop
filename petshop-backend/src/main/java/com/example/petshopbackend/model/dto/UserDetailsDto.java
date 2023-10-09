package com.example.petshopbackend.model.dto;

import com.example.petshopbackend.model.User;
import lombok.Data;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
public class UserDetailsDto {
    private String username;


    public static UserDetailsDto of(User user) {
        UserDetailsDto details = new UserDetailsDto();
        details.username = user.getUsername();
        return details;
    }
}
