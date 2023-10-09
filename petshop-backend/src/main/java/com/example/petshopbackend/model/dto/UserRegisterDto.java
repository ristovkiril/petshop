package com.example.petshopbackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class UserRegisterDto {
    public String email;
    public String name;
    public String lastname;
    public String password;
    public BigDecimal budged;

    public UserRegisterDto(){

    }
}
