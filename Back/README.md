## ✈ Projeto Fullstack: Planejador de Roteiros de Viagem

Este projeto implementa um sistema fullstack completo, conforme os requisitos do Trabalho Final, para gerenciar a criação e o processamento de roteiros de viagem pessoais, utilizando arquitetura distribuída com Spring Boot, MySQL e RabbitMQ.

*Entrega Final:* 26 de novembro (até 23h59)

---

### 1. Detalhes do Projeto e Escopo

| Item                | Detalhe                                                              | Requisito                                  |
| :------------------ | :------------------------------------------------------------------- | :----------------------------------------- |
| *Problema Resolvido* | Gerenciar a criação, edição e acompanhamento de planos de viagem.    | Criatividade        |
| *Entidade Principal* | Roteiro (título, destino, datas, custo estimado).                    | CRUD                |
| *Formação do Grupo*  | Individual (Aline)                                                   | Individual           |

---

### 2. Requisitos Técnicos Utilizados (Back-end e Infra)

| Componente        | Tecnologia            | Observações                                                                                      |
| :---------------- | :-------------------- | :----------------------------------------------------------------------------------------------- |
| *Back-end Core*   | Spring Boot 3 + Java 17 | Expõe uma API REST com operações GET, POST, PUT, DELETE                 |
| *Banco de Dados*  | MySQL 8.0             | Banco de dados relacional                                                 |
| *Mensageria*      | RabbitMQ              | Uso obrigatório com 2 serviços separados (produtor/consumidor)          |
| *Containerização* | Docker Compose        | Obrigatório para orquestrar o Back-end e o Banco de Dados              |
| *Front-end*       | (A ser definido)      | Consumo da API (Próxima Fase)                                           |

---

### 3. Fluxo de Negócio e Mensageria (RabbitMQ)

O fluxo de negócio implementa a comunicação assíncrona, cumprindo a exigência de haver pelo menos 1 fluxo de negócio real passando pela fila.

1.  **Ação (API):** Um novo Roteiro é criado via requisição `POST` para o `roteiro-service`.
2.  **Produtor (`roteiro-service`):** Após salvar o roteiro no MySQL, o serviço **produz** uma mensagem JSON contendo os dados do novo roteiro para a fila `roteiro.criado.queue`.
3.  **Consumidor (`sugestao-service`):** O segundo serviço, `sugestao-service`, **consome** a mensagem da fila e simula o processamento de sugestões para o novo roteiro, imprimindo os dados recebidos no console.

| Serviço              | Papel                                                 |
| :------------------- | :---------------------------------------------------- |
| **`roteiro-service`**  | *Produtor* (Gerencia o CRUD e envia o evento)         |
| **`sugestao-service`** | *Consumidor* (Processa o evento de forma assíncrona) |

---

### 4. Como Rodar o Projeto com Docker Compose

Para rodar o ecossistema de back-end (APIs, Banco de Dados e Mensageria), siga os passos abaixo.

#### A. Pré-requisitos

*   Docker e Docker Compose instalados e em execução.
*   Java 17+ e Maven instalados para compilar os projetos.

#### B. Passo 1: Configurar Credenciais Seguras

As credenciais do banco de dados são gerenciadas através de um arquivo `.env`, que é ignorado pelo Git.

1.  Crie um arquivo chamado `.env` na pasta raiz do projeto (`/Projeto-final`).
2.  Adicione a seguinte variável com a senha que desejar:

```sh
# .env (Este arquivo NÃO é enviado para o GitHub)
MYSQL_ROOT_PASSWORD=sua_senha_secreta
```

O `docker-compose.yml` lerá esta variável para configurar a senha do usuário `root` do MySQL e também a injetará no `roteiro-service` para a conexão.

#### C. Passo 2: Compilar os Módulos Java

Execute o comando de build do Maven dentro de **cada uma** das pastas dos serviços para gerar os arquivos `.jar` que o Docker usará.

```sh
# Compile o primeiro serviço
cd roteiro-service
mvnw clean package

# Volte para a raiz e compile o segundo serviço
cd ..
cd sugestao-service
mvnw clean package
```

#### D. Passo 3: Iniciar a Infraestrutura

Volte para a pasta raiz (`/Projeto-final`) e suba todos os contêineres com um único comando:

```sh
# Sobe os contêineres em modo "detached" (segundo plano)
docker-compose up --build -d
```

#### E. Verificando a Execução

*   **Logs dos Serviços:** `docker-compose logs -f` (mostra os logs de todos os contêineres em tempo real).
*   **API Principal:** A API estará acessível em `http://localhost:8080`.
*   **Banco de Dados:** Pode ser acessado externamente na porta `3307` (Host: `localhost`).
*   **RabbitMQ UI:** A interface de gerenciamento do RabbitMQ está disponível em `http://localhost:15672` (usuário: `guest`, senha: `guest`).

---

### 5. Próximas Etapas

*   **Front-end:** Desenvolvimento da interface de usuário que consumirá a API REST na porta `8080`.
