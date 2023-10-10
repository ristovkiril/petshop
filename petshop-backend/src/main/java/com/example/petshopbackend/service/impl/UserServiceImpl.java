package com.example.petshopbackend.service.impl;

import com.example.petshopbackend.exceptions.RequiredPropertyException;
import com.example.petshopbackend.model.User;
import com.example.petshopbackend.model.dto.UserProfileDto;
import com.example.petshopbackend.model.dto.UserRegisterDto;
import com.example.petshopbackend.repository.UserRepository;
import com.example.petshopbackend.service.AuthService;
import com.example.petshopbackend.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.example.petshopbackend.exceptions.UserNotFoundException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthService authService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByEmail(s).orElseThrow(() -> new UsernameNotFoundException(s));
    }

    @PreAuthorize("isAuthenticated()")
    public UserProfileDto getAuthUser() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        return UserProfileDto.of(user);
    }

    @Override
    public UserProfileDto registerUser(UserRegisterDto userRegisterDto) {
        return createNewUser(userRegisterDto);
    }

    @Override
    public List<UserProfileDto> getAllUsers() {
        return userRepository.findAll().stream().map(UserProfileDto::of).collect(Collectors.toList());
    }

    private UserProfileDto createNewUser(UserRegisterDto userRegisterDto) {
        if (StringUtils.isEmpty(userRegisterDto.getEmail()) ||
                StringUtils.isEmpty(userRegisterDto.getPassword())) {
            throw new RequiredPropertyException("Корисничко име и лозинка се задолжителни полиња.");
        }
        // creating new user
        User user = new User();
        user.setFirstName(userRegisterDto.getName());
        user.setLastName(userRegisterDto.getLastname());
        user.setEmail(userRegisterDto.getEmail());
        user.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
        user.setBudget(userRegisterDto.getBudged());

        user = userRepository.save(user);

        return UserProfileDto.of(user);
    }

}
