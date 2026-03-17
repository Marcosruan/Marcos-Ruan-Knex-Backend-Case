# 🛒 Api de Vendas

## Descrição

Api de vendas para o processo seletivo da Knex jr.

## 🔙🔚 Rotas e funcionalidades

### ®️ Rota de registro POST/register

    - Nessa rota é possível cadastrar um usuário como cliente, vendedor ou administrador

### ✅ Rota de autenticação/login POST/users

#### Essa rota é destinada à autenticação dos usuários

    - Caso o usuário já esteja cadastrado, um Jason Web Token (JWT) será retornado como resposta

    - O JWT será usado nas demais rotas

### 🛍️ Rota de produtos

#### Na rota POST/products é possível cadastrar um novo produto

    - Clientes não podem cadastrar produtos

    - Só é permitido cadastrar um produto na mesma empresa que o usuário trabalha.

#### A rota GET/products lista todos os produtos de todas as empresas

#### Na rota GET/companies/:id/products é possível selecionar produtos de uma empresa específica

#### Na rota PATCH/products é possível editar um produto já cadastrado

    - Clientes não podem editar produtos

    - Produtos de uma empresa só podem ser editados por um funcionário daquela mesma empresa
    
#### Na rota DELETE/products é possível deletar um produto já cadastrado

    - Clientes não podem deletar produtos

    - Produtos de uma empresa só podem ser deletados por um funcionário daquela mesma empresa

### 🏪 Rota de empresas

#### Nessa rota POST/companies é possível cadastrar as empresas 

    - Apenas administradores podem cadastar empresas

    - Não pode cadastrar a empresa duas vezes

### 🧾 Rota de pedidos

#### Na rota POST/orders é possível criar um novo pedido

    - O pedido vincula o usuário com o produto

    - Qualquer tipo de usuário pode fazer um pedido, basta estar autenticado

    - Pedidos podem ser duplicados (produto e usuário), mas terão identificadores diferentes

#### Na rota PATCH/orders/:id/status é possível editar um pedido já criado

    - Clientes só podem cancelar o pedido

    - Pedidos cancelados não podem ser alterados

    - Usuário só pode alterar o próprio pedido

    - Deve-se passar o id do pedido como parâmetro da rota e o novo status no body do request

## 🔧 Possíveis melhorias do projeto

    - Criar testes automatizados

    - Deploy da aplicação

    - Adicionar o estoque disponível do produto no modelo do banco de dados junto da implementação da reposição e venda, diminuindo ou aumentado a quantidade em estoque

    - Permitir que o vendedor altere o pedido de outro usuário, levando em consideração que o pedido está relacionado à empresa que ele trabalha

    - Impedir que o usuário faça um pedido com produtos de empresas distintas, sendo necessário criar um pedido para cada empresa

    - Documentar a API

    - Erros mais bem especificados

## 🚀 Como executar

1. Clone o repositório
    ```sh
    git https://github.com/Marcosruan/Marcos-Ruan-Knex-Backend-Case
    ```

2. inicialize o Docker

    - Certifique-se de abrir o programa do Docker
    - Na pasta do projeto (importante), abra o terminal e execute:

    ```sh
    docker-compose up -d
    ```

3. Acesse a aplicação

    - Na pasta do projeto, para iniciar o servidor, execute o seguinte comando no terminal:

    ```sh
    npm run dev
    ```

4. Acesse a aplicação

    - Abra um cliente HTTP, como o insomnia, por exemplo, e acesse os endpoints da api que estão descritas no campo das rotas lá em cima

    ```sh
    http://localhost:8080/rota desejada
    ```

3. Recomendação

    - Para vizualizar as alterações no banco de dados facilmente, recomendo rodar o seguinte comando no terminal do projeto e acessar o link que é gerado:

    ```sh
    npx drizzle-kit studio
    ```

---

## 📁 **Estrutura de diretórios**

```markdown

KNEX BACKEND CASE/
├── db/
│   └── migrations/
│       └── meta/
|
├── src/
│   ├── @types/
│   │   ├── fastify-jwt.d.ts
│   │   └── responses.ts
│   ├── db/
│   │   ├── schema/
│   │   │   ├── companies-schema.ts
│   │   │   ├── index.ts
│   │   │   ├── orders-schema.ts
│   │   │   ├── products-schema.ts
│   │   │   ├── relations.ts
│   │   │   └── users-schema.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── verify-admin.ts
│   │   └── verify-jwt.ts
│   ├── modules/
│   │   ├── companies/
│   │   │   ├── companies-controller.ts
│   │   │   ├── companies-interfaces.ts
│   │   │   ├── companies-repository.ts
│   │   │   └── companies-service.ts
│   │   ├── login/
│   │   │   ├── login-controller.ts
│   │   │   ├── login-interfaces.ts
│   │   │   ├── login-repository.ts
│   │   │   └── login-service.ts
│   │   ├── orders/
│   │   │   ├── orders-controller.ts
│   │   │   ├── orders-interfaces.ts
│   │   │   ├── orders-repository.ts
│   │   │   └── orders-service.ts
│   │   ├── products/
│   │   │   ├── products-controller.ts
│   │   │   ├── products-interfaces.ts
│   │   │   ├── products-repository.ts
│   │   │   └── products-service.ts
│   │   └── register/
│   │       ├── register-controller.ts
│   │       ├── register-interfaces.ts
│   │       ├── register-repository.ts
│   │       └── register-service.ts
│   ├── routes/
│   │   ├── companies-route.ts
│   │   ├── login-route.ts
│   │   ├── orders-route.ts
│   │   ├── products-route.ts
│   │   └── register-route.ts
│   ├── utils/
│   │   └── app-error.ts
│   └── server.ts
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yaml
├── Dockerfile
├── drizzle.config.ts
├── LICENSE.txt
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json

```

---

## 🖥️ **Tecnologias usadas**

![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-red?style=for-the-badge&logo=fastify&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-green?style=for-the-badge&logo=zod&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-pink?style=for-the-badge&logo=bcrypt&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-bff04d?style=for-the-badge&logo=drizzle&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-31658c?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/Git-orange?style=for-the-badge&logo=git&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-purple?style=for-the-badge&logo=insomnia&logoColor=white)

## 🗃️ **Versão**

    - 1.0.0

## 👨‍💻 Autor

- **Marcos Ruan V. de Figueiredo**  
  [@Marcosruan](https://github.com/Marcosruan)

## 🏛️ **Licença**

    - Distribuído sob a licença GPL2. Acesse `LICENSE.txt` para mais informações.
