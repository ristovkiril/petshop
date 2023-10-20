package com.example.petshopbackend.web;

import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.dto.PetCreationDto;
import com.example.petshopbackend.model.dto.PetFilterDto;
import com.example.petshopbackend.service.PetService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/pet", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class PetController {
    private final PetService petService;

    @GetMapping("/{id}")
    public Pet getPet(@PathVariable Long id) {
        return petService.getPet(id);
    }

    @PostMapping
    public Page<Pet> getPet(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestBody PetFilterDto filterDto) {
        return petService.getPets(page, size, filterDto);
    }

    @GetMapping("/by-owner")
    @PreAuthorize("isAuthenticated()")
    public List<Pet> getPet() {
        return petService.getByOwner();
    }

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public Pet create(@RequestBody PetCreationDto petCreationDto) {
        return petService.createPet(petCreationDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Pet edit(@PathVariable Long id, @RequestBody PetCreationDto petCreationDto) {
        return petService.edit(id, petCreationDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public void delete(@PathVariable Long id) {
        petService.deletePet(id);
    }

    @PostMapping("/{id}/buy")
    @PreAuthorize("isAuthenticated()")
    public Pet buyPet(@PathVariable Long id) {
        return petService.buyPet(id);
    }
}
