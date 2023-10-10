package com.example.petshopbackend.service;

import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.dto.PetCreationDto;
import org.springframework.data.domain.Page;

public interface PetService {
    Pet createPet(PetCreationDto petCreationDto);
    Pet getPet(Long id);
    Page<Pet> getPets(int page, int size);
    void deletePet(Long id);
    Pet edit(Long id, PetCreationDto petCreationDto);
    Pet buyPet(Long id);
}
