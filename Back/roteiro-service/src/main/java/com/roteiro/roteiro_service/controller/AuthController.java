package com.roteiro.roteiro_service.controller;

import com.roteiro.roteiro_service.model.User;
import com.roteiro.roteiro_service.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = authService.register(user);
            // Não retorne a senha no response
            registeredUser.setPassword(null); 
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser(Principal principal) {
        // O Spring Security injeta o 'Principal' que contém os detalhes do usuário logado.
        // O nome do principal é o username.
        if (principal != null) {
            return ResponseEntity.ok(principal.getName());
        }
        return ResponseEntity.status(401).build(); // Não autorizado se ninguém estiver logado
    }
}
