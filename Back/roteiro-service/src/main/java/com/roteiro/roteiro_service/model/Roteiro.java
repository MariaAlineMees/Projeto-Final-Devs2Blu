package com.roteiro.roteiro_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity // 1. Marca a classe como uma tabela no BD
@Data   // 2. Lombok: Cria getters, setters, toString, hashCode e equals
public class Roteiro {

    @Id // 3. Define este campo como a chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 4. Define que o BD gerará o ID
    private Long id;

    private String titulo; // Título do roteiro (ex: "Férias no Caribe")
    private String destino; // Cidade/País
    private String dataInicio; // Podemos usar String ou LocalDate (mais complexo)
    private String dataFim;
    private Double custoEstimado;

    // Se não estiver usando Lombok, você precisará adicionar aqui os getters e setters manualmente.
}