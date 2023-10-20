package com.example.petshopbackend.utils;

import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.User;
import com.example.petshopbackend.repository.PetRepository;
import com.example.petshopbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.List;

@Component
@AllArgsConstructor
public class DataInit {
    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        try {
            User user = new User();
            user.setEmail("admin@yahoo.com");
            user.setFirstName("Admin");
            user.setLastName("Admin");
            user.setBudget(BigDecimal.valueOf(100));
            user.setPassword(passwordEncoder.encode("p@ssw0rd"));

            userRepository.save(user);

            List<Pet> pets = petRepository.findAll();
            if (pets.size() == 0) {
                petRepository.saveAll(MockService.generateRandomPets(5));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

