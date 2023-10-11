package com.example.petshopbackend.web;


import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.User;
import com.example.petshopbackend.service.PetTestService;
import lombok.AllArgsConstructor;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/test", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class TestController {
    private final PetTestService petTestService;

    @GetMapping("/create-users")
    public void createUsers() {
        petTestService.createUsers();
    }

    @GetMapping("/create-pets")
    public void createPets() {
        petTestService.createPets();
    }

    @GetMapping("/list-users")
    public List<User> listUsers() {
        return petTestService.listUsers();
    }

    @GetMapping("/list-pets")
    public List<Pet> listPets() {
        return petTestService.listPets();
    }

    @GetMapping("/buy")
    public void buy() {
        petTestService.buy();
    }
}
