package com.example.petshopbackend.config.filters;

import com.example.petshopbackend.config.JwtAuthConstants;
import com.example.petshopbackend.exceptions.PasswordsDoNotMatchException;
import com.example.petshopbackend.exceptions.UserNotFoundException;
import com.example.petshopbackend.model.User;
import com.example.petshopbackend.model.dto.UserAuthAttemptDto;
import com.example.petshopbackend.model.dto.UserDetailsDto;
import com.example.petshopbackend.repository.UserRepository;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@AllArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        UserAuthAttemptDto creds = null;
        try {
            creds = new ObjectMapper().readValue(request.getInputStream(), UserAuthAttemptDto.class);
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (creds == null) {
            throw new UserNotFoundException("Invalid credentials");
        }
        User user = userRepository.findByEmail(creds.getUsername()).orElseThrow(UserNotFoundException::new);
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        if (!passwordEncoder.matches(creds.getPassword(), userDetails.getPassword())) {
            throw new PasswordsDoNotMatchException();
        }
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDetails.getUsername(), creds.getPassword(), userDetails.getAuthorities()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User userDetails = (User) authResult.getPrincipal();
        String token = JWT.create()
                .withSubject(new ObjectMapper().writeValueAsString(UserDetailsDto.of(userDetails)))
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtAuthConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(JwtAuthConstants.SECRET.getBytes()));
        response.addHeader(JwtAuthConstants.HEADER_STRING, JwtAuthConstants.TOKEN_PREFIX + token);
        response.getWriter().append(token);
    }
}
