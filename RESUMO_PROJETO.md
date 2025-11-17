# Guia de Apresentação do Projeto: Planejador de Roteiros de Viagem

Este documento serve como um roteiro para explicar o projeto, sua arquitetura, tecnologias e os desafios enfrentados durante o desenvolvimento.

---

### 1. Qual é a ideia do projeto?

**Resposta:** O projeto é um **Planejador de Roteiros de Viagem**, uma aplicação web full-stack que permite a um usuário criar, visualizar, editar e deletar seus próprios roteiros de viagem.

O objetivo é resolver um problema de organização: em vez de ter informações de viagem espalhadas em planilhas ou blocos de notas, o usuário pode centralizar tudo em uma interface simples e objetiva.

---

### 2. Como o sistema foi construído? Qual a arquitetura?

**Resposta:** O sistema utiliza uma arquitetura moderna baseada em **microsserviços**, totalmente **containerizada com Docker**. A aplicação é dividida em três partes principais:

*   **Front-end (A Interface do Usuário):**
    *   **Tecnologia:** **Angular**.
    *   **Função:** É a tela que o usuário vê no navegador. Ele é responsável por exibir o formulário de criação, a lista de roteiros e os botões de ação. Sua única função é se comunicar com o back-end através de uma API REST.

*   **Back-end (O Cérebro do Sistema):**
    *   O back-end é dividido em **dois microsserviços Spring Boot** para implementar a comunicação com mensageria.
    *   **1. `roteiro-service` (O Serviço Principal):**
        *   **Tecnologia:** Spring Boot com Java 17.
        *   **Função:** Expõe a API REST principal com as operações de CRUD (Criar, Ler, Atualizar, Deletar). Ele recebe as chamadas do front-end e as salva no banco de dados **MySQL**.
        *   **Papel na Mensageria:** Atua como **Produtor**.
    *   **2. `sugestao-service` (O Serviço Secundário):**
        *   **Tecnologia:** Spring Boot com Java 17.
        *   **Função:** Sua única responsabilidade é "ouvir" mensagens. Ele simula uma tarefa secundária, como processar sugestões para um roteiro recém-criado.
        *   **Papel na Mensageria:** Atua como **Consumidor**.

*   **Infraestrutura (A Base de Tudo):**
    *   **Banco de Dados:** **MySQL**, rodando em um contêiner Docker para guardar os dados dos roteiros de forma permanente.
    *   **Mensageria:** **RabbitMQ**, também em um contêiner, servindo como um "carteiro" para garantir a comunicação assíncrona entre os serviços de back-end.

---

### 3. Como funciona a mensageria com RabbitMQ neste projeto?

**Resposta:** O fluxo de mensageria é um dos pontos centrais do projeto e funciona em três etapas:

1.  **Ação:** Quando o usuário clica em "Salvar" no front-end, o Angular envia uma requisição `POST` para o `roteiro-service`.
2.  **Produção:** O `roteiro-service` salva o novo roteiro no MySQL e, em seguida, **publica uma mensagem** em uma fila no RabbitMQ. A mensagem contém os dados do roteiro recém-criado.
3.  **Consumo:** O `sugestao-service`, que monitora essa fila, percebe a nova mensagem, a **consome** e executa sua lógica (no nosso caso, ele imprime um log no console para provar que recebeu a informação).

A vantagem dessa abordagem é que a resposta para o usuário é imediata, sem que ele precise esperar por processos secundários (como o de sugestões), tornando a aplicação mais rápida e resiliente.

---

### 4. Quais foram os principais desafios e aprendizados durante o desenvolvimento?

**Resposta:** Além de construir a estrutura inicial, passamos por um processo de depuração e refinamento muito importante para integrar todas as partes:

1.  **Containerização Completa:** Criamos `Dockerfile` para cada serviço e um `docker-compose.yml` na raiz para orquestrar tudo. Hoje, com um único comando (`docker-compose up --build -d`), conseguimos subir a aplicação inteira.

2.  **Persistência de Dados:** Configuramos um **volume** no Docker para o MySQL, o que garante que os dados dos roteiros não sejam perdidos quando os contêineres são recriados.

3.  **Resolução de Erros de Build do Front-end:** O maior desafio inicial foi fazer o build do Angular funcionar dentro do Docker. Após muita depuração, descobrimos que o caminho de saída dos arquivos compilados estava incorreto no `Dockerfile`. Corrigimos o caminho para `dist/roteiro-front/browser/`, o que resolveu o erro 404 do Nginx.

4.  **Resolução de Erros de Rede e CORS (O Desafio Final):** Mesmo com tudo rodando, o front-end não conseguia se comunicar com o back-end, apresentando erros de CORS, 403 (Proibido) e "Status 0". A solução definitiva foi implementar uma arquitetura padrão de produção:
    *   **Proxy Reverso:** Configuramos o **Nginx** (o servidor do front-end) para atuar como um **proxy reverso**. Agora, o front-end envia as requisições para si mesmo (em `/api/...`), e o Nginx redireciona essa chamada para o `roteiro-service` dentro da rede segura do Docker. Isso eliminou todos os erros de comunicação e resolveu um problema de rede específico do Docker no Windows (WSL).

Hoje, o sistema está 100% funcional, com o fluxo completo (Front-end → Back-end → RabbitMQ → Outro Back-end) rodando de forma estável e integrada.
