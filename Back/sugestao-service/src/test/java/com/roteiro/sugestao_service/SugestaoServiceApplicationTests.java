package com.roteiro.sugestao_service;

import com.roteiro.sugestao_service.config.RabbitMQConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@SpringBootTest
class SugestaoServiceApplicationTests {

    // Diz ao Spring para criar um "dublê" (mock) do RabbitTemplate durante os testes,
    // em vez de tentar criar o bean real que precisa de uma conexão.
    @MockBean
    private RabbitTemplate rabbitTemplate;

    @Test
    void contextLoads() {
    }

}
