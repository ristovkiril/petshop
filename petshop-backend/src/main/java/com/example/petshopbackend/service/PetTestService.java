package com.example.petshopbackend.service;

import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.User;

import java.util.List;

public interface PetTestService {

    void createUsers();
    void createPets();
    List<User> listUsers();
    List<Pet> listPets();
    void buy();
}
