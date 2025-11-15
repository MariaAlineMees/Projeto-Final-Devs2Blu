package com.sugestao.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE_ROTEIRO = "roteiro.criado.queue";

    // Define e registra a fila no RabbitMQ quando o serviço inicia
    @Bean
    public Queue queue() {
        return new Queue(QUEUE_ROTEIRO, true); // true = fila persistente
    }
}
