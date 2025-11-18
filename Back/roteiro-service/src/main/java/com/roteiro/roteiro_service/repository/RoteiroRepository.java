package com.roteiro.roteiro_service.repository;

import com.roteiro.roteiro_service.model.Roteiro;
import com.roteiro.roteiro_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoteiroRepository extends JpaRepository<Roteiro, Long> {

    // Encontra todos os roteiros que pertencem a um usuário específico
    List<Roteiro> findByUser(User user);

    // Encontra um roteiro específico pelo seu ID e pelo seu dono (usuário)
    Optional<Roteiro> findByIdAndUser(Long id, User user);
}
