package com.example.petshopbackend.service.impl;

import com.example.petshopbackend.exceptions.InsufficientBudgetException;
import com.example.petshopbackend.exceptions.PetAlreadyHasOwnerException;
import com.example.petshopbackend.model.HistoryLog;
import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.User;
import com.example.petshopbackend.model.enums.PetType;
import com.example.petshopbackend.repository.HistoryLogRepository;
import com.example.petshopbackend.repository.PetRepository;
import com.example.petshopbackend.repository.UserRepository;
import com.example.petshopbackend.service.PetService;
import com.example.petshopbackend.service.PetTestService;
import com.example.petshopbackend.utils.MockService;
import com.mysql.cj.log.Log;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class PetTestServiceImpl implements PetTestService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final HistoryLogRepository historyLogRepository;
    private final Logger logger = LoggerFactory.getLogger(PetTestServiceImpl.class);

    @Override
    public void createUsers() {
        List<User> users = MockService.generateRandomUsers(5, passwordEncoder);

        userRepository.saveAll(users);
    }

    @Override
    public void createPets() {
        petRepository.saveAll(MockService.generateRandomPets(10));
    }

    @Override
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Pet> listPets() {
        return petRepository.findAll();
    }

    @Override
    public void buy() {
        List<User> users = listUsers();
        List<Pet> pets = listPets();
        Long countSuccess = 0L;
        Long countDenied = 0L;
        for (User user : users) {
            for (Pet pet : pets) {
                try {
                    buyPet(pet, user);
                    countSuccess++;
                } catch (PetAlreadyHasOwnerException petAlreadyHasOwnerException) {
                    countDenied++;
                } catch (InsufficientBudgetException insufficientBudgetException) {
                    countDenied++;
                }
            }
        }
        HistoryLog historyLog = new HistoryLog();
        historyLog.setDeniedCount(countDenied);
        historyLog.setSuccessfulCount(countSuccess);

        historyLogRepository.save(historyLog);
    }

    private void buyPet(Pet pet, User user) {
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
    }

}
