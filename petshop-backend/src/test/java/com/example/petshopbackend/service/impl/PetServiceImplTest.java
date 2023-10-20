package com.example.petshopbackend.service.impl;

import com.example.petshopbackend.exceptions.InsufficientBudgetException;
import com.example.petshopbackend.exceptions.PetAlreadyHasOwnerException;
import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.User;
import com.example.petshopbackend.model.dto.PetCreationDto;
import com.example.petshopbackend.model.enums.PetType;
import com.example.petshopbackend.repository.PetRepository;
import com.example.petshopbackend.repository.UserRepository;
import com.example.petshopbackend.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class PetServiceImplTest {

    @InjectMocks
    private PetServiceImpl petService;

    @Mock
    private PetRepository petRepository;

    @Mock
    private AuthService authService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testBasePrice() {
        LocalDate now = LocalDate.now();
        PetType type = PetType.DOG;
        LocalDate birth = LocalDate.of(2021, 1, 1);
        int difference = now.getYear() - birth.getYear();
        BigDecimal price = BigDecimal.valueOf(difference);

        // Prepare test data
        PetCreationDto petCreationDto = new PetCreationDto("", type, birth);
        Pet pet = new Pet();
        pet.setId(1L);
        pet.setType(type);
        pet.setDateOfBirth(birth);
        pet.setRating(0);
        pet.calculatePrice();

        // Mock dependencies
        when(petRepository.save(any())).thenReturn(pet);

        // Call the service method
        Pet result = petService.createPet(petCreationDto);

        // Verify the behavior
        assertEquals(price, result.getPrice());
    }

    @Test
    void testCatWithRating() {
        LocalDate now = LocalDate.now();
        PetType type = PetType.CAT;
        LocalDate birth = LocalDate.of(2021, 1, 1);
        int difference = now.getYear() - birth.getYear();
        BigDecimal price = BigDecimal.valueOf(difference);

        // Prepare test data
        PetCreationDto petCreationDto = new PetCreationDto("", type, birth);
        Pet pet = new Pet();
        pet.setId(1L);
        pet.setType(type);
        pet.setDateOfBirth(birth);
        pet.setRating(5);
        pet.calculatePrice();

        // Mock dependencies
        when(petRepository.save(any())).thenReturn(pet);

        // Call the service method
        Pet result = petService.createPet(petCreationDto);

        // Verify the behavior
        assertEquals(price, result.getPrice());
    }

    @Test
    void testRatingPrice() {
        LocalDate now = LocalDate.now();
        PetType type = PetType.DOG;
        int rating = 3;
        LocalDate birth = LocalDate.of(2021, 1, 1);
        int difference = now.getYear() - birth.getYear();
        BigDecimal price = BigDecimal.valueOf(difference + rating);

        // Prepare test data
        PetCreationDto petCreationDto = new PetCreationDto("", type, birth);
        petCreationDto.setRating(rating);

        Pet pet = new Pet();
        pet.setId(1L);

        pet.setDateOfBirth(birth);
        pet.setType(type);
        pet.setRating(rating);
        pet.calculatePrice();
        System.out.println(pet);

        // Mock dependencies
        when(petRepository.save(any())).thenReturn(pet);

        // Call the service method
        Pet result = petService.createPet(petCreationDto);

        // Verify the behavior
        assertEquals(price, result.getPrice());
    }

    @Test
    void shouldBuyPet() {
        LocalDate now = LocalDate.now();
        PetType type = PetType.DOG;
        LocalDate birth = LocalDate.of(2021, 1, 1);
        int difference = now.getYear() - birth.getYear();
        BigDecimal price = BigDecimal.valueOf(difference);

        // Prepare test data
        PetCreationDto petCreationDto = new PetCreationDto("", type, birth);
        Pet pet = new Pet();
        pet.setId(1L);
        pet.setName("Doggy");
        pet.setType(type);
        pet.setDateOfBirth(birth);
        pet.setRating(0);
        pet.calculatePrice();

        BigDecimal budged = BigDecimal.valueOf(100);
        User user = new User();
        user.setId(1L);
        user.setFirstName("Kiril");
        user.setLastName("Ristov");
        user.setBudget(budged);

        // Mock dependencies
        when(petRepository.save(any())).thenReturn(pet);
        when(petRepository.findById(any())).thenReturn(Optional.of(pet));
        when(authService.getAuthUser()).thenReturn(user);

        // Call the service method
        Pet result = petService.createPet(petCreationDto);
        result =petService.buyPet(pet.getId());

        // Verify the behavior
        assertNotNull(result.getOwner());
        assertEquals(budged.subtract(result.getPrice()), user.getBudget());
    }

    @Test
    void shouldThrowInsufficientBudgetException() {
        LocalDate now = LocalDate.now();
        PetType type = PetType.DOG;
        LocalDate birth = LocalDate.of(2021, 1, 1);
        int difference = now.getYear() - birth.getYear();
        BigDecimal price = BigDecimal.valueOf(difference);

        // Prepare test data
        PetCreationDto petCreationDto = new PetCreationDto("", type, birth);
        Pet pet = new Pet();
        pet.setId(1L);
        pet.setName("Doggy");
        pet.setType(type);
        pet.setDateOfBirth(birth);
        pet.setRating(0);
        pet.calculatePrice();

        BigDecimal budged = BigDecimal.valueOf(0);
        User user = new User();
        user.setId(1L);
        user.setFirstName("Kiril");
        user.setLastName("Ristov");
        user.setBudget(budged);

        // Mock dependencies
        when(petRepository.save(any())).thenReturn(pet);
        when(petRepository.findById(any())).thenReturn(Optional.of(pet));
        when(authService.getAuthUser()).thenReturn(user);

        // Call the service method
        Pet result = petService.createPet(petCreationDto);

        // Act and Assert
        Exception exception = assertThrows(InsufficientBudgetException.class, () -> {
            // Call the function that is expected to throw an exception
            petService.buyPet(result.getId());
        });

        // Assert specific details of the exception (if needed)
        assertEquals("Insufficient budget to purchase the pet.", exception.getMessage());
        // Verify the behavior
        assertNull(result.getOwner());
    }
    @Test
    void shouldThrowPetAlreadyHasOwnerException() {
        LocalDate now = LocalDate.now();
        PetType type = PetType.DOG;
        LocalDate birth = LocalDate.of(2021, 1, 1);
        int difference = now.getYear() - birth.getYear();
        BigDecimal price = BigDecimal.valueOf(difference);

        // Prepare test data
        PetCreationDto petCreationDto = new PetCreationDto("", type, birth);
        Pet pet = new Pet();
        pet.setId(1L);
        pet.setName("Doggy");
        pet.setType(type);
        pet.setDateOfBirth(birth);
        pet.setRating(0);
        pet.calculatePrice();

        BigDecimal budged = BigDecimal.valueOf(100);
        User user = new User();
        user.setId(1L);
        user.setFirstName("Kiril");
        user.setLastName("Ristov");
        user.setBudget(budged);

        pet.setOwner(user);

        User secondUser = new User();
        user.setId(2L);
        user.setFirstName("Test");
        user.setLastName("Test");
        user.setBudget(budged);

        // Mock dependencies
        when(petRepository.save(any())).thenReturn(pet);
        when(petRepository.findById(any())).thenReturn(Optional.of(pet));
        when(authService.getAuthUser()).thenReturn(secondUser);

        // Call the service method
        Pet result = petService.createPet(petCreationDto);

        // Act and Assert
        Exception exception = assertThrows(PetAlreadyHasOwnerException.class, () -> {
            // Call the function that is expected to throw an exception
            petService.buyPet(result.getId());
        });

        // Assert specific details of the exception (if needed)
        assertEquals("Pet already has owner", exception.getMessage());
        // Verify the behavior
        assertEquals(result.getOwner().getId(), user.getId());
    }
}