package com.roteiro.sugestao_service.model;

import lombok.Data;

// Esta é uma classe DTO (Data Transfer Object) que representa o Roteiro recebido via RabbitMQ.
// Ela não é uma entidade de banco de dados neste serviço.
@Data
public class Roteiro {
    private Long id;
    private String titulo;
    private String destino;
    private String dataInicio;
    private String dataFim;
    private double custoEstimado;
}
