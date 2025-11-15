package com.roteiro.roteiro_service.repository;

import com.roteiro.roteiro_service.model.Roteiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // 1. Marca como um componente de persistência (opcional, mas boa prática)
// 2. JpaRepository já nos dá todos os métodos de CRUD (save, findAll, findById, delete)
public interface RoteiroRepository extends JpaRepository<Roteiro, Long> {
    // Não precisamos escrever código aqui, o Spring faz o resto!
    // Se precisarmos de algo específico (ex: buscar por destino), escreveríamos o método aqui.
}