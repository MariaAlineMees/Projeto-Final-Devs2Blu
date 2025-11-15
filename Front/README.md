# 🎨 Roteiro-Front (Angular)

Este projeto contém a interface de usuário (UI) para o **Planejador de Roteiros de Viagem**. Foi desenvolvido com Angular e é responsável por consumir a API REST exposta pelo `roteiro-service`.

### 1. Funcionalidades

-   **CRUD de Roteiros:** Permite ao usuário criar, visualizar, editar e excluir roteiros de viagem.
-   **Interface Reativa:** Construído como uma Single-Page Application (SPA) para uma experiência de usuário fluida.
-   **Comunicação com o Back-end:** Realiza chamadas HTTP para a API na porta `8080` para buscar e manipular os dados.

### 2. Tecnologias

| Tecnologia | Versão/Descrição |
| :--- | :--- |
| **Framework** | Angular |
| **Linguagem** | TypeScript |
| **Estilização** | CSS |

### 3. Como Rodar (Integrado com Docker Compose)

Este projeto é projetado para ser iniciado junto com todo o ecossistema através do `docker-compose.yml` na raiz do projeto (`/Projeto-final`).

As instruções completas para rodar a aplicação fullstack estão no **[README.md principal](../README.md)**.

O `Dockerfile` presente nesta pasta é responsável por:
1.  Compilar o projeto Angular para gerar os arquivos estáticos.
2.  Servir esses arquivos estáticos utilizando um servidor web Nginx.

A aplicação fica acessível em `http://localhost` após a inicialização.
