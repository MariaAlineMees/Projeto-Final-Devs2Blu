# ✈️ Projeto Fullstack: Planejador de Roteiros de Viagem

Este é o projeto final da disciplina, um sistema fullstack completo para gerenciar a criação e o processamento de roteiros de viagem pessoais. A aplicação utiliza uma arquitetura de microsserviços com Spring Boot, Angular, MySQL e RabbitMQ, totalmente containerizada com Docker.

| Item                | Detalhe                                                              |
| :------------------ | :------------------------------------------------------------------- |
| **Nome do Projeto** | Planejador de Roteiros de Viagem                                     |
| **Integrantes**     | Aline                                                                |
| **Descrição**       | Uma plataforma para usuários criarem, gerenciarem e acompanharem seus planos de viagem, com um sistema de sugestões assíncrono. |
| **Público Alvo**    | Viajantes que desejam organizar suas futuras aventuras de forma simples e centralizada. |

---

### 2. Tecnologias Utilizadas

| Camada      | Tecnologia            | Descrição                                                              |
| :---------- | :-------------------- | :--------------------------------------------------------------------- |
| **Front-end** | Angular               | Interface de usuário reativa para interagir com a API.                 |
| **Back-end**  | Spring Boot 3 + Java 17 | Microsserviços que expõem uma API REST (CRUD completo).                |
| **Segurança** | Spring Security       | Autenticação e autorização baseada em sessão para proteger a API.      |
| **Banco de Dados** | MySQL 8.0             | Persistência dos dados de usuários e roteiros.                         |
| **Mensageria**| RabbitMQ              | Comunicação assíncrona entre os serviços de back-end.                  |
| **Infraestrutura** | Docker & Docker Compose | Containerização e orquestração de todos os serviços da aplicação. |

---

### 3. Arquitetura e Fluxo de Dados

O sistema é composto por 3 serviços principais, um banco de dados e um broker de mensagens:

-   `roteiro-front`: A aplicação Angular que o usuário acessa no navegador.
-   `roteiro-service`: Microsserviço Spring Boot responsável pelo CRUD de roteiros e pela **autenticação/autorização de usuários** com Spring Security.
-   `sugestao-service`: Microsserviço Spring Boot que "ouve" a criação de novos roteiros para processar sugestões.

O fluxo de dados ocorre da seguinte forma:

1.  **Registro e Login:** O usuário cria uma conta e faz login através da interface. O `roteiro-service` valida as credenciais e cria uma sessão segura.
2.  **Criação de Roteiro:** Com o login feito, o usuário cria um novo roteiro. A API do `roteiro-service` recebe a requisição, associa o roteiro ao usuário logado e salva no MySQL.
3.  **Mensageria (RabbitMQ):** Após salvar, o `roteiro-service` **produz** uma mensagem para uma fila no RabbitMQ com os detalhes do roteiro criado.
4.  **Processamento Assíncrono:** O `sugestao-service` **consome** a mensagem e simula um processamento (como buscar sugestões de atividades), imprimindo um log para confirmar o recebimento.

---

### 4. Como Rodar o Projeto Completo

Com a aplicação totalmente containerizada, o processo para rodar todo o ambiente é simplificado.

#### A. Pré-requisitos

-   Docker e Docker Compose instalados e em execução.
-   Git (para clonar o repositório).
-   Um editor de texto ou IDE para criar o arquivo de ambiente.

#### B. Passo 1: Configurar a Senha do Banco de Dados

1.  Na pasta raiz do projeto (`/Projeto-final`), crie um arquivo chamado `.env`.
2.  Adicione a seguinte variável dentro dele, substituindo `sua_senha_secreta` por uma senha de sua escolha:

    ```sh
    # Arquivo: .env
    MYSQL_ROOT_PASSWORD=sua_senha_secreta
    ```

#### C. Passo 2: Compilar e Iniciar a Aplicação

1.  Abra um terminal na pasta raiz do projeto (`/Projeto-final`).
2.  Execute o seguinte comando para construir as imagens e iniciar todos os contêineres em segundo plano:

    ```sh
    docker-compose up --build -d
    ```
    *A flag `--build` garante que as imagens sejam (re)construídas caso haja alguma alteração no código. Na primeira vez, o processo pode demorar alguns minutos.*

#### D. Passo 3: Utilizar a Aplicação

Após a conclusão do comando, a aplicação estará no ar.

1.  **Acesse a Aplicação:** Abra seu navegador e vá para `http://localhost`.
2.  **Crie uma Conta:** Você será direcionado para a página de login. Clique no link "Não tem uma conta? Registre-se" e crie um novo usuário.
3.  **Faça Login:** Após o registro, faça login com as credenciais que você acabou de criar.
4.  **Gerencie seus Roteiros:** Agora você pode criar, editar e deletar seus próprios roteiros de viagem.

| Serviço             | URL de Acesso                | Portas (Host:Container) | Credenciais (se aplicável)   |
| :------------------ | :--------------------------- | :---------------------- | :---------------------------- |
| **Aplicação (Front-end)** | `http://localhost`           | `80:80`                 | Criadas pelo usuário.         |
| **API de Roteiros** | Acessada via Front-end (`/api`) | `8080:8080`             | Requer autenticação.          |
| **RabbitMQ (UI)**   | `http://localhost:15672`     | `15672:15672`           | `guest` / `guest`             |
| **Banco de Dados**  | `localhost` (via cliente SQL) | `3307:3306`             | `root` / `sua_senha_secreta` |

---

### 5. Para Parar a Aplicação

Para parar e remover todos os contêineres, redes e volumes criados, execute o seguinte comando na raiz do projeto:

```sh
docker-compose down
```
*O volume do banco de dados (`mysql-data`) não será removido, garantindo a persistência dos dados.*
