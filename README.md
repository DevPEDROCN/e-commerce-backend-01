# E-commerce Back-End – Projeto 1
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-7.x-red?logo=mongoose)
![Winston](https://img.shields.io/badge/Winston-Logging-lightgrey?logo=winston)
![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)

## Descrição

Este projeto é uma **biblioteca de acesso a dados (DAL)** desenvolvida em **Node.js** para fins acadêmicos da disciplina de Programação Web Back-End (Projeto 1).  
O foco é implementar **classes de armazenamento** para a temática de **E-commerce**, manipulando usuários, produtos e pedidos diretamente no **MongoDB**, sem disponibilizar API ou utilizar Express/JWT.

O projeto inclui **tratamento de erros e logs** para todas as operações de banco de dados.

---

## Entidades / Classes de Armazenamento

### 1. **UserService** (Usuários)
Métodos implementados:
- `createUser(userData)` → cria um novo usuário  
- `findUserById(userId)` → busca usuário por ID  
- `updateUser(userId, updateData)` → atualiza dados do usuário  
- `deleteUser(userId)` → deleta usuário  
- `findUserByEmail(email)` → busca usuário por email  

Campos obrigatórios: `name`, `email`, `password`.

### 2. **ProductService** (Produtos)
Métodos implementados:
- `createProduct(productData)` → cria um novo produto  
- `findProductById(productId)` → busca produto por ID  
- `updateProduct(productId, updateData)` → atualiza dados do produto  
- `deleteProduct(productId)` → deleta produto  

Campos obrigatórios: `name`, `description`, `price`, `category`, `stock`.

### 3. **OrderService** (Pedidos)
Métodos implementados:
- `createOrder(orderData)` → cria um novo pedido (com relação a usuário e produtos)  
- `findOrderById(orderId)` → busca pedido por ID (com produtos e usuário populados)  
- `updateOrder(orderId, updateData)` → atualiza status ou itens do pedido  
- `deleteOrder(orderId)` → deleta pedido  

Campos obrigatórios: `user`, `products` (com quantidade e preço no momento do pedido).

---

## Logs

Todos os erros e operações são registrados via **Winston**:

- `error.log` → erros capturados  
- `combined.log` → logs gerais de operações  
- Console também exibe logs durante execução

---

## Como Usar a Biblioteca

1. **Instale as dependências do projeto**
```bash
npm install mongoose winston
```
2. **Configure o MongoDB no arquivo src/config/db.js**
```bash
const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        logger.info('MongoDB conectado com sucesso!');
    } catch (error) {
        logger.error('Erro ao conectar ao MongoDB: ' + error.message);
        throw error;
    }
};
module.exports = connectDB;
```


3. **Executar o script de demonstração**
```bash
node main.js
```

O main.js demonstra:

- Criação, leitura, atualização e deleção de usuários, produtos e pedidos

- Tratamento de erros (ex: duplicidade de email, campos obrigatórios)

- Logs gerados automaticamente no console e nos arquivos de log


## 4. Testar API 

* Testes realizados no cmd do Windows.
* Use o TESTES.md como guia para realizar todos os testes.


### Autor

*  Pedro Henrique Silva Oliveira

### RA

*  a2312344
