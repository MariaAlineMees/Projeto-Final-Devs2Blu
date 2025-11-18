> **Nota:** Este documento descreve os componentes do Back-end. Para uma visão geral do projeto completo e instruções de como rodar a aplicação, por favor, consulte o **[README.md principal](../README.md)**.

---

## ✈ Back-end: Planejador de Roteiros de Viagem

Este diretório contém os microsserviços desenvolvidos em **Spring Boot** que formam o back-end da aplicação.

### 1. Arquitetura do Back-end

O back-end é composto por dois microsserviços:

1.  **`roteiro-service` (Produtor):**
    *   **Responsabilidades:**
        *   Gerencia o CRUD (Criar, Ler, Atualizar, Deletar) da entidade `Roteiro`.
        *   Gerencia o registro e a autenticação de usuários (`User`).
        *   Implementa a camada de segurança com **Spring Security** para proteger os endpoints.
    *   **Tecnologias:** Spring Boot, Spring Data JPA, Spring Security.
    *   **Comunicação:** Expõe uma API REST para o front-end e, ao criar um novo roteiro, produz uma mensagem para o RabbitMQ.

2.  **`sugestao-service` (Consumidor):**
    *   **Responsabilidade:** Ouve a fila de roteiros criados e simula um processamento assíncrono (como a geração de sugestões).
    *   **Tecnologias:** Spring Boot, Spring AMQP (RabbitMQ).
    *   **Comunicação:** Consome mensagens da fila `roteiro.criado.queue`.

---

### 2. Segurança com Spring Security

A API do `roteiro-service` é protegida para garantir que apenas usuários autenticados possam gerenciar seus roteiros.

-   **Autenticação:** Utiliza um sistema de `formLogin` baseado em sessão. As credenciais dos usuários são armazenadas de forma segura no banco de dados com senhas criptografadas usando `BCryptPasswordEncoder`.
-   **Autorização:** Cada roteiro é associado a um usuário. As regras de negócio garantem que um usuário só pode visualizar, atualizar ou deletar os roteiros que ele mesmo criou.

#### Endpoints de API

-   `POST /api/login` e `POST /api/logout`
    -   **Descrição:** Endpoints gerenciados pelo Spring Security para processar a submissão do formulário de login e para realizar o logout. Não possuem um controlador explícito.

-   `POST /api/auth/register`
    -   **Descrição:** Endpoint **público** para registrar um novo usuário.
    -   **Controlador:** `AuthController`.
    -   **Corpo da Requisição:**
        ```json
        {
          "username": "novo_usuario",
          "password": "sua_senha"
        }
        ```

-   `GET /api/auth/me`
    -   **Descrição:** Endpoint **protegido** que retorna o nome de usuário da sessão atualmente logada. Utilizado pelo front-end para exibir mensagens de boas-vindas.
    -   **Controlador:** `AuthController`.
    -   **Resposta:** Uma `String` com o nome do usuário.

---

### 3. Fluxo de Mensageria (RabbitMQ)

O fluxo de negócio implementa a comunicação assíncrona, cumprindo a exigência de haver pelo menos 1 fluxo de negócio real passando pela fila.

1.  **Ação (API):** Um usuário autenticado cria um novo Roteiro via requisição da API para o `roteiro-service`.
2.  **Produtor (`roteiro-service`):** Após salvar o roteiro no MySQL, o serviço **produz** uma mensagem em formato **JSON** para a fila.
3.  **Consumidor (`sugestao-service`):** O serviço **consome** a mensagem JSON, a converte de volta para um objeto Java e imprime os dados recebidos no console para confirmar o recebimento e processamento.

### 4. Tecnologias Utilizadas

| Componente        | Tecnologia            |
| :---------------- | :-------------------- |
| *Framework Core*  | Spring Boot 3 + Java 17 |
| *Segurança*       | Spring Security       |
| *Banco de Dados*  | MySQL 8.0             |
| *Mensageria*      | RabbitMQ              |
| *Containerização* | Docker                |
