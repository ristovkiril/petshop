package com.example.petshopbackend.web;

import com.example.petshopbackend.model.dto.UserProfileDto;
import com.example.petshopbackend.model.dto.UserRegisterDto;
import com.example.petshopbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/user", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthManagementController {
    private final UserService userService;

    @PostMapping(value = "/me")
    public UserProfileDto getMe() {
        return userService.getAuthUser();
    }

    @PostMapping
    public UserProfileDto register(@RequestBody UserRegisterDto userRegisterDto) {
        return userService.registerUser(userRegisterDto);
    }

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()")
    public List<UserProfileDto> getAllUsers() {
        return userService.getAllUsers();
    }

}
