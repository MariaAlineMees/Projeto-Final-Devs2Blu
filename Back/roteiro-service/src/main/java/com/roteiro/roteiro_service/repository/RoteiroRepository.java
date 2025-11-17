package com.roteiro.roteiro_service.repository;

import com.roteiro.roteiro_service.model.Roteiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//  JpaRepository já nos dá todos os métodos de CRUD (save, findAll, findById, delete)
public interface RoteiroRepository extends JpaRepository<Roteiro, Long> {


}