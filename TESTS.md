# Testes e Demonstração da Biblioteca DAL

Este documento descreve **como executar o projeto e testar as funcionalidades** da biblioteca de acesso a dados (DAL) para o E-commerce.

---

## Pré-requisitos

1. **Node.js** instalado (recomendado v22+)
2. **MongoDB** instalado e em execução localmente, ou acesso a um servidor MongoDB
3. Projeto clonado/localizado no seu computador

---

## Passo 1: Instalar Dependências

Na raiz do projeto, execute:

```bash
npm install
```

## Passo 2: Configurar Conexão com MongoDB

No arquivo src/config/db.js, configure a conexão com seu MongoDB:
```bash
const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce'); // Ajuste se necessário
        logger.info('MongoDB conectado com sucesso!');
    } catch (error) {
        logger.error('Erro ao conectar ao MongoDB: ' + error.message);
        throw error;
    }
};

module.exports = connectDB;
```

Se você estiver usando um MongoDB remoto ou Atlas, substitua a URI pelo endereço correspondente.

## Passo 3: Executar Script de Demonstração

O projeto inclui o arquivo main.js na raiz, que demonstra o uso da biblioteca.

Execute:
```bash
node main.js
```

O script fará:

- Conexão com o MongoDB

- Criação de um usuário

- Criação de um produto

- Criação de um pedido vinculando usuário e produto

- Atualização de registros

- Deleção de registros

- Captura de erros e logs

## Passo 4: Verificar Saída no Console

Durante a execução, você verá mensagens como:
```bash
info: MongoDB conectado com sucesso!
info: Iniciando demo DAL...
info: Usuário criado: John Doe
info: Produto criado: Smartphone X
info: Pedido criado para usuário: ...
Pedido atualizado: ...
Pedido deletado: ...
info: Demo concluída!
```

## Passo 5: Verificar Logs

Os logs também são salvos em arquivos configurados no Winston:

- error.log → erros capturados

- combined.log → logs gerais de operações

Os arquivos ficam na raiz do projeto (../../error.log e ../../combined.log) conforme configuração.

## Passo 6: Verificar MongoDB

Abra seu MongoDB (via Compass, mongosh ou Atlas) e confirme:

Coleção Users → contém o usuário criado

Coleção Products → contém o produto criado

Coleção Orders → contém o pedido criado


Todos os dados refletem as operações realizadas pelo main.js.