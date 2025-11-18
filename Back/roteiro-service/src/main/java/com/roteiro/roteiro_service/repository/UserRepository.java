package com.roteiro.roteiro_service.repository;

import com.roteiro.roteiro_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Método que o Spring Security usará para buscar um usuário pelo nome de usuário
    Optional<User> findByUsername(String username);
}
