package com.example.petshopbackend.model.dto;

import com.example.petshopbackend.model.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.math.BigDecimal;
import java.util.List;

@Data
public class UserAuthDto extends UserProfileDto {

    private String token;

    private List<GrantedAuthority> authorityList;

    public UserAuthDto(){

    }

    public static UserAuthDto of(User user) {
        UserAuthDto dt = new UserAuthDto();
        dt.setEmail(user.getEmail());
        dt.setName(user.getFirstName());
        dt.setLastname(user.getLastName());
        dt.setBudged(user.getBudget());
        dt.setAuthorityList((List<GrantedAuthority>) user.getAuthorities());
        return dt;
    }
}
