package com.roteiro.roteiro_service.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE_ROTEIRO = "roteiro.criado.queue";

    @Bean
    public Queue queue() {
        return new Queue(QUEUE_ROTEIRO, true);
    }
}
