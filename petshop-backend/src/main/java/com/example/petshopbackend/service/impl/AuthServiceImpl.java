package com.example.petshopbackend.service.impl;

import com.example.petshopbackend.model.User;
import com.example.petshopbackend.repository.UserRepository;
import com.example.petshopbackend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.petshopbackend.exceptions.UserNotFoundException;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;

    public String getAuthUsername() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Override
    public User getAuthUser() {
        String username = getAuthUsername();
        return getUserDetails(username);
    }

    public User getUserDetails(String username) {
        return userRepository.findByEmail(username).orElseThrow(UserNotFoundException::new);
    }

    public boolean checkHasRole(String roleName) {
        User user = getAuthUser();
        return user.getAuthorities().contains(roleName);
    }
}
