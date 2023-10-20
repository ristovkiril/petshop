package com.example.petshopbackend.service.impl;

import com.example.petshopbackend.exceptions.InsufficientBudgetException;
import com.example.petshopbackend.exceptions.PetAlreadyHasOwnerException;
import com.example.petshopbackend.exceptions.PetNotFoundException;
import com.example.petshopbackend.exceptions.RatingNotValidException;
import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.User;
import com.example.petshopbackend.model.dto.PetCreationDto;
import com.example.petshopbackend.model.dto.PetFilterDto;
import com.example.petshopbackend.model.enums.PetType;
import com.example.petshopbackend.repository.PetRepository;
import com.example.petshopbackend.repository.UserRepository;
import com.example.petshopbackend.service.AuthService;
import com.example.petshopbackend.service.PetService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class PetServiceImpl implements PetService {
    private final PetRepository petRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private  final Logger logger = LoggerFactory.getLogger(PetServiceImpl.class);

    @Override
    public Pet createPet(PetCreationDto petCreationDto) {
        Pet pet = mapPet(petCreationDto, new Pet());

        return petRepository.save(pet);
    }

    @Override
    public Pet getPet(Long id) {
        return petRepository.findById(id).orElseThrow(PetNotFoundException::new);
    }

    @Override
    public Page<Pet> getPets(int page, int size, PetFilterDto filterDto) {
        return petRepository.searchPets(PageRequest.of(page, size), filterDto.getHasOwner(), filterDto.getName(), filterDto.getType(), filterDto.getPrice());
    }

    @Override
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }

    @Override
    public Pet edit(Long id, PetCreationDto petCreationDto) {
        Pet pet = getPet(id);
        pet = mapPet(petCreationDto, pet);

        return petRepository.save(pet);    }

    @Override
    @Transactional
    public Pet buyPet(Long id) {
        User user = authService.getAuthUser();
        Pet pet = getPet(id);
        if (pet.getOwner() != null) {
            logger.error("Pet already has owner {}", pet.getOwner().getFirstName());
            throw new PetAlreadyHasOwnerException();
        }
        BigDecimal petPrice = pet.getPrice();
        BigDecimal userBudget = user.getBudget();

        // Check if the user's budget is sufficient to buy the pet
        if (userBudget.compareTo(petPrice) < 0) {
            logger.error("Insufficient budged {}", userBudget);
            throw new InsufficientBudgetException();
        }
        BigDecimal newBudget = userBudget.subtract(petPrice);
        user.setBudget(newBudget);
        userRepository.save(user);

        pet.setOwner(user);
        petRepository.save(pet);

        if (pet.getType().equals(PetType.CAT)) {
            logger.info("Meow, cat {} has owner {}", pet.getName(), pet.getOwner().getFirstName());
        } else {
            logger.info("Woof, dog {} has owner {}", pet.getName(), pet.getOwner().getFirstName());
        }

        return pet;
    }

    @Override
    public List<Pet> getByOwner() {
        User user = authService.getAuthUser();
        return petRepository.findAllByOwnerId(user.getId());
    }

    private Pet mapPet(PetCreationDto petCreationDto, Pet pet) {
        if (pet == null) {
            pet = new Pet();
        }
        pet.setName(petCreationDto.getName());
        pet.setDescription(petCreationDto.getDescription());
        pet.setType(petCreationDto.getType());
        pet.setDateOfBirth(petCreationDto.getDateOfBirth());
        Integer rating = null;
        if (petCreationDto.getType().equals(PetType.DOG)) {
            rating = 0;
            if (petCreationDto.getRating() != null) {
                rating = petCreationDto.getRating();
                if (rating < 0 || rating > 10) {
                    logger.error("Dog rating must be between 0 and 10, current rating is {}", rating);
                    throw new RatingNotValidException();
                }
            }
        }
        pet.setRating(rating);

        return pet;
    }
}
