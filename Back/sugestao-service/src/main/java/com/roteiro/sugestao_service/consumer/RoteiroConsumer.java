package com.roteiro.sugestao_service.consumer;

import com.roteiro.sugestao_service.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RoteiroConsumer {

    @RabbitListener(queues = RabbitMQConfig.QUEUE_ROTEIRO)
    public void receive(String mensagem) {
        System.out.println("-------------------------------------");
        System.out.println("[SUGESTAO SERVICE] Nova mensagem recebida: " + mensagem);
        



        System.out.println("[SUGESTAO SERVICE] Processando Roteiro... Gerando sugestões de restaurantes e atividades.");
        System.out.println("-------------------------------------");
    }
}
