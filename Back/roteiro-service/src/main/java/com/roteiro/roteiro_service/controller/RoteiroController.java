package com.roteiro.roteiro_service.controller;

import com.roteiro.roteiro_service.model.Roteiro;
import com.roteiro.roteiro_service.service.RoteiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // 1. Indica que é um Controller e que os métodos retornam dados (API REST)
@RequestMapping("/api/roteiros") // 2. Define o caminho base (URL) para todos os métodos
public class RoteiroController {

    // 3. Injeta o Service (Lógica de Negócio)
    @Autowired
    private RoteiroService roteiroService;

    // --- Implementação do CRUD na API REST ---

    // 1. POST (CREATE) -> Mapeado para: POST http://localhost:8080/api/roteiros
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // Retorna código HTTP 201 (Created)
    public Roteiro criarRoteiro(@RequestBody Roteiro roteiro) {
        return roteiroService.salvar(roteiro);
    }

    // 2. GET (READ - Listar todos) -> Mapeado para: GET http://localhost:8080/api/roteiros
    @GetMapping
    public List<Roteiro> listarRoteiros() {
        return roteiroService.listarTodos();
    }

    // 3. GET (READ - Buscar por ID) -> Mapeado para: GET http://localhost:8080/api/roteiros/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Roteiro> buscarRoteiroPorId(@PathVariable Long id) {
        // Usamos ResponseEntity para controlar melhor a resposta (ex: Not Found)
        return roteiroService.buscarPorId(id)
                .map(roteiro -> ResponseEntity.ok(roteiro)) // Se encontrar, retorna 200 OK e o roteiro
                .orElse(ResponseEntity.notFound().build()); // Se não encontrar, retorna 404 Not Found
    }

    // 4. PUT (UPDATE) -> Mapeado para: PUT http://localhost:8080/api/roteiros/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Roteiro> atualizarRoteiro(@PathVariable Long id, @RequestBody Roteiro roteiroAtualizado) {
        // 1. Verifica se o roteiro existe antes de atualizar
        if (!roteiroService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // 2. Garante que o ID do objeto seja o mesmo da URL
        roteiroAtualizado.setId(id);

        // 3. Salva a atualização
        Roteiro salvo = roteiroService.salvar(roteiroAtualizado);
        return ResponseEntity.ok(salvo);
    }

    // 5. DELETE -> Mapeado para: DELETE http://localhost:8080/api/roteiros/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Retorna código HTTP 204 (No Content)
    public void deletarRoteiro(@PathVariable Long id) {
        roteiroService.deletar(id);
    }
}