# 🎨 Roteiro-Front (Angular)

Este projeto contém a interface de usuário (UI) para o **Planejador de Roteiros de Viagem**. Foi desenvolvido com Angular e é responsável por consumir a API REST exposta pelo `roteiro-service`.

### 1. Funcionalidades

-   **Registro e Login de Usuários:** Permite que novos usuários se cadastrem e que usuários existentes façam login de forma segura.
-   **CRUD de Roteiros:** Permite ao usuário autenticado criar, visualizar, editar e excluir seus próprios roteiros de viagem.
-   **Proteção de Rotas:** A página de gerenciamento de roteiros é protegida, sendo acessível apenas por usuários logados.
-   **Interface Reativa:** Construído como uma Single-Page Application (SPA) para uma experiência de usuário fluida.

---

### 2. Arquitetura de Autenticação

A autenticação no front-end é gerenciada por um conjunto de componentes e serviços que garantem uma experiência segura e reativa:

-   **`AuthService`:**
    -   É o cérebro da autenticação no front-end.
    -   Gerencia o estado de autenticação do usuário (`isAuthenticated$`) e o nome do usuário logado (`currentUsername$`) usando `BehaviorSubject` do RxJS.
    -   Comunica-se com a API de back-end para realizar as chamadas de `login`, `logout`, `register` e para buscar os dados do usuário (`/api/auth/me`).

-   **`authGuard`:**
    -   É uma função de guarda de rota do Angular (`CanActivateFn`).
    -   Antes de permitir o acesso à rota `/roteiros`, ele verifica o estado no `AuthService`.
    -   Se o usuário não estiver autenticado, ele o redireciona automaticamente para a página de `/login`, protegendo os dados.

-   **`LoginComponent` e `RegisterComponent`:**
    -   São os componentes que fornecem a interface de usuário para que o usuário possa inserir suas credenciais para entrar ou se registrar na plataforma.

---

### 3. Tecnologias

| Tecnologia | Versão/Descrição |
| :--- | :--- |
| **Framework** | Angular |
| **Linguagem** | TypeScript |
| **Reatividade**| RxJS |
| **Estilização** | CSS |

---

### 4. Como Rodar (Integrado com Docker Compose)

Este projeto é projetado para ser iniciado junto com todo o ecossistema através do `docker-compose.yml` na raiz do projeto (`/Projeto-final`).

As instruções completas para rodar a aplicação fullstack estão no **[README.md principal](../README.md)**.

O `Dockerfile` presente nesta pasta é responsável por:
1.  Compilar o projeto Angular para gerar os arquivos estáticos.
2.  Servir esses arquivos estáticos utilizando um servidor web Nginx, que também atua como um proxy reverso para a API.

A aplicação fica acessível em `http://localhost` após a inicialização.
