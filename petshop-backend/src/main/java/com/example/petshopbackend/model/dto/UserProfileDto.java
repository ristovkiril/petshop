package com.example.petshopbackend.model.dto;

import com.example.petshopbackend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class UserProfileDto {
    private String username;

    private String name;

    private String lastname;

    private String email;

    public BigDecimal budged;

    public UserProfileDto(){

    }

    public static UserProfileDto of(User user) {
        UserProfileDto dt = new UserProfileDto();
        dt.setUsername(user.getUsername());
        dt.setEmail(user.getEmail());
        dt.setName(user.getFirstName());
        dt.setLastname(user.getLastName());
        dt.setBudged(user.getBudget());
        return dt;
    }
}
