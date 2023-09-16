# Desafio FullCycle: Nginx, Nodejs e Mysql com Docker

Nesse desafio coloquei em prática o que aprendi sobre a utilização do **nginx** como **proxy reverso**, do docker, docker-compose, volumes, etc.

# Como executar

1. Faça o clone do projeto
   ```
   git clone https://github.com/noogabe/desafio-node.git            
   ```
2. Entre no diretório onde o projeto está
3. Execute o projeto
   ```
   docker compose up -d
   ```
   Ou para ver todos os logs da aplicação e manter a execução vinculada ao terminal:
   ```
   docker compose up
   ```
Ao executar  ```docker compose up``` são criados 3 containers:
- **app** - aplicação desenvolvida em nodejs
- **db** - banco de dados mysql
- **nginx** - que servirá de proxy reverso, recebendo as chamadas na porta 8080 e redirecionando para a aplicação e depois devolvendo a resposta para o usuário no navegador.

# Requisitos do Desafio
A idéia principal é que quando um usuário acesse o nginx, o mesmo fará uma chamada na aplicação node.js. Essa aplicação, por sua vez, adicionará um registro no banco de dados mysql, cadastrando um nome na tabela people.
Gere o docker-compose.yaml de uma forma que basta apenas rodarmos: docker compose up -d que tudo deverá estar funcionando e disponível na porta: 8080.
Ao acessar a porta 8080, o retorno da aplicação nodejs para o nginx deverá ser:

Full Cycle Rocks!

- Lista de nomes cadastrada no banco de dados.
