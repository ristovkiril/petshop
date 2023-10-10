package com.example.petshopbackend.model.dto;

import com.example.petshopbackend.model.enums.PetType;
import com.sun.istack.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PetCreationDto {
    @NotNull
    private String name;
    private String description = "";
    @NotNull
    private PetType type;
    @NotNull
    private LocalDate dateOfBirth;
    private Integer rating; //Only for dogs
}
