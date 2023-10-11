package com.example.petshopbackend.utils;

import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.User;
import com.example.petshopbackend.model.enums.PetType;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class MockService {
    public static List<User> generateRandomUsers(int count, PasswordEncoder passwordEncoder) {
        List<User> users = new ArrayList<>();
        Random random = new Random();

        String[] firstNames = {
                "Alice", "Bob", "Charlie", "David", "Emma", "Frank",
                "Grace", "Helen", "Isaac", "Jack", "Katie", "Liam",
                "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rachel",
                "Sam", "Taylor", "Ursula", "Victor", "Wendy", "Xander",
                "Yasmine", "Zane"
        };

        String[] lastNames = {
                "Smith", "Johnson", "Brown", "Davis", "Wilson", "Miller",
                "Clark", "Hall", "Garcia", "Lee"
        };

        String[] domains = {
                "gmail.com", "yahoo.com", "hotmail.com", "outlook.com"
        };

        for (int i = 0; i < count; i++) {
            String firstName = firstNames[random.nextInt(firstNames.length)];
            String lastName = lastNames[random.nextInt(lastNames.length)];
            String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + "@" + domains[random.nextInt(domains.length)];
            double budget = random.nextDouble() * 15.0; // Random budget between 0 and 15
            User user = new User();
            user.setEmail(email);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setBudget(BigDecimal.valueOf(budget));
            user.setPassword(passwordEncoder.encode("p@ssw0rd"));

            users.add(user);
        }

        return users;
    }

    public static List<Pet> generateRandomPets(int count) {
        List<Pet> pets = new ArrayList<>();
        Random random = new Random();

        String[] petNames = {
                "Fluffy", "Fido", "Whiskers", "Buddy", "Mittens", "Lucky",
                "Rocky", "Daisy", "Max", "Lucy", "Leo", "Milo", "Oreo",
                "Coco", "Ziggy", "Bella", "Charlie", "Luna", "Bailey", "Duke"
        };

        for (int i = 0; i < count; i++) {
            String name = petNames[random.nextInt(petNames.length)];
            PetType type = PetType.values()[random.nextInt(PetType.values().length)];
            String description = "Description for " + name;
            LocalDate dateOfBirth = LocalDate.of(2010 + i, random.nextInt(12) + 1, random.nextInt(28) + 1); // Random birthdate
            Integer rating = type == PetType.DOG ? random.nextInt(11) : null;

            Pet pet = new Pet();
            pet.setType(type);
            pet.setName(name);
            pet.setDescription(description);
            pet.setDateOfBirth(dateOfBirth);
            pet.setRating(rating);

            pets.add(pet);
        }

        return pets;
    }
}
