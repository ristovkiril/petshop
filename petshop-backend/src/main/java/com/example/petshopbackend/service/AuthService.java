package com.example.petshopbackend.service;


import com.example.petshopbackend.model.User;

public interface AuthService {

    User getAuthUser();

    User getUserDetails(String username);

    boolean checkHasRole(String roleNames);

}
