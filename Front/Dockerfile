# Front/Dockerfile

# Estágio 1: Build - Compila o projeto Angular
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json do projeto Angular que está na pasta Front/
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código do Front-end Angular
COPY . .

# Compila o projeto Angular com o padrão
RUN npm run build

# Estágio 2: Serve - Cria a imagem final com Nginx
FROM nginx:alpine

# Copia o arquivo de configuração do Nginx
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

# Copia o CONTEÚDO do output compilado (que está na pasta /browser) para o Nginx
COPY --from=build /app/dist/roteiro-front/browser/ /usr/share/nginx/html

EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
