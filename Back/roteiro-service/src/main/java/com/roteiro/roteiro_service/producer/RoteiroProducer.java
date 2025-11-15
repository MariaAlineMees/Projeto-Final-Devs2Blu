package com.roteiro.roteiro_service.producer;

import com.roteiro.roteiro_service.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoteiroProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void send(String message) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE_ROTEIRO, message);
        System.out.println("-------------------------------------");
        System.out.println("[ROTEIRO SERVICE] Mensagem enviada para a fila: " + message);
        System.out.println("-------------------------------------");
    }
}
