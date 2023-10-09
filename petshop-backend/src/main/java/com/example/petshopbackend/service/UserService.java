package com.example.petshopbackend.service;


import com.example.petshopbackend.model.dto.UserAuthDto;
import com.example.petshopbackend.model.dto.UserProfileDto;
import com.example.petshopbackend.model.dto.UserRegisterDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    UserAuthDto getAuthUser();

    UserProfileDto registerUser(UserRegisterDto userRegisterDto);

    List<UserProfileDto> getAllUsers();

}
