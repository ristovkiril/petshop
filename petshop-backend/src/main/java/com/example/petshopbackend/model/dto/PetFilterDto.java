package com.example.petshopbackend.model.dto;

import com.example.petshopbackend.model.enums.PetType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PetFilterDto {
    Boolean hasOwner = false;
    String name = null;
    PetType type = null;
    BigDecimal price = null;
}
