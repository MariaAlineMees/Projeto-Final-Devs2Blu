package com.roteiro.roteiro_service.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.roteiro.roteiro_service.model.Roteiro;
import com.roteiro.roteiro_service.producer.RoteiroProducer;
import com.roteiro.roteiro_service.repository.RoteiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoteiroService {

    @Autowired
    private RoteiroRepository roteiroRepository;

    @Autowired
    private RoteiroProducer roteiroProducer;

    @Autowired
    private ObjectMapper objectMapper;

    public Roteiro salvar(Roteiro roteiro) {
        Roteiro roteiroSalvo = roteiroRepository.save(roteiro);

        try {
            String jsonRoteiro = objectMapper.writeValueAsString(roteiroSalvo);
            roteiroProducer.send(jsonRoteiro);
        } catch (Exception e) {

            e.printStackTrace();
        }

        return roteiroSalvo;
    }

    public List<Roteiro> listarTodos() {
        return roteiroRepository.findAll();
    }

    public Optional<Roteiro> buscarPorId(Long id) {
        return roteiroRepository.findById(id);
    }

    public void deletar(Long id) {
        roteiroRepository.deleteById(id);
    }
}
