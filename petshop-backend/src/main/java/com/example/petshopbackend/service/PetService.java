package com.example.petshopbackend.service;

import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.dto.PetCreationDto;
import com.example.petshopbackend.model.dto.PetFilterDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PetService {
    Pet createPet(PetCreationDto petCreationDto);
    Pet getPet(Long id);
    Page<Pet> getPets(int page, int size, PetFilterDto filterDto);
    void deletePet(Long id);
    Pet edit(Long id, PetCreationDto petCreationDto);
    Pet buyPet(Long id);

    List<Pet> getByOwner();
}
