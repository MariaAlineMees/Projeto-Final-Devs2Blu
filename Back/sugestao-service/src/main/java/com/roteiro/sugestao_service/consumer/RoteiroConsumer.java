package com.roteiro.sugestao_service.consumer;

import com.roteiro.sugestao_service.model.Roteiro;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RoteiroConsumer {

    @RabbitListener(queues = "roteiro.criado.queue")
    public void consume(Roteiro roteiro) {
        System.out.println("===================================");
        System.out.println("Mensagem recebida da fila: ");
        System.out.println("ID do Roteiro: " + roteiro.getId());
        System.out.println("Título: " + roteiro.getTitulo());
        System.out.println("Destino: " + roteiro.getDestino());
        System.out.println("Processando sugestões para o roteiro...");
        System.out.println("===================================");
    }
}
