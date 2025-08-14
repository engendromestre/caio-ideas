<p align="center">
  <img src="https://img.shields.io/badge/npm-v11.2.20-blue" alt="npm version" />
  <img src="https://img.shields.io/badge/node-v22.14.0-blue" alt="node version" />
  <img src="https://img.shields.io/badge/mariadb-v11.14.0-blue" alt="node version" />
</p>
<p align="center">
<img src="https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white" alt="docker engine version" />
<img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="node.js version" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge" />
<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
<img src="https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4" />
</p>

# D+Ideias (MVP)

> **Objetivo**: MVP para o programa D+Ideias, onde colaboradores registram ideias de melhoria, com listagem, criação, edição, detalhes e exclusão.

## Sumário

* [Contexto e requisitos](#contexto-e-requisitos)
* [Arquitetura e decisões](#arquitetura-e-decisões)
* [Estrutura do repositório](#estrutura-do-repositório)
* [Banco de Dados](#banco-de-dados)
* [Passo a passo para o avaliador rodar](#passo-a-passo-para-o-avaliador-rodar))
* [Convenções e trade-offs](#convenções-e-trade-offs)


---

## Contexto e requisitos

MVP solicitado para validar o programa **D+Ideias**:

* **Campos da Ideia**: `RE do autor`, `O que pode ser melhorado`, `Como é feito hoje`, `Como pode ser melhorado`, `Qual é o benefício`.
* **Funcionalidades**: Listagem, Nova Ideia, Atualizar Ideia e Excluir Ideia.
* **Arquitetura**: Backend Node.js (API REST), DB relacional (**MariaDB** via Docker Compose ou Mariadb local), Frontend SPA (**React**).

## Arquitetura e decisões

Camadas e responsabilidades:

* **Frontend (SSR/SPA)**: Next.js (React) + TypeScript.  
  Páginas: Listagem.  
 Consome a API REST.

* **Backend (API)**: Nest.js + TypeScript.  
  Rotas RESTful:  
  - GET   /ideas
  - GET   /ideas/:id  
  - POST  /ideas  
  - PUT   /ideas/:id  
  - DELETE /ideas/:id

* **Persistência**: MariaDB. Tabela principal `ideas`.

Modelo de dados (ideia):
```
  IDEAS {
    INT id PK "auto_increment"
    STRING authorId         //O RE do autor da ideia
    STRING improvement      //O que pode ser melhorado
    STRING currentProcess   //Como é feito hoje
    STRING proposedChange   //Como pode ser melhorado
    STRING expectedBenefit  //Qual é o benefício
    DATETIME created_at
    DATETIME updated_at
  }
```

## Estrutura do repositório

```
caio-ideas
├── backend
│   ├── dist
│   ├── prisma
│   ├── src
│   └── test
├── frontend
│   ├── public
│   └── src
├── compose.yml
├── .env
└── sql
    └── init.sql

```
### Backend

```
backend
├── dist
│   ├── ideas
│   │   ├── dto
│   │   └── entities
│   └── prisma
├── prisma
│   └── migrations
│       ├── 20250813150955_init_ideas
│       └── 20250813151240_rename_table_to_ideas
├── src
│   ├── ideas
│   │   ├── dto
│   │   └── entities
│   └── prisma
└── test
    └── coverage
        └── lcov-report
```

### Frontend

```
.
├── public
│   └── assets
└── src
    ├── constants
    ├── hooks
    ├── pages
    │   └── ideas
    │       └── components
    ├── services
    └── types
```

> * Em ambos os casos a pasta `node_modules` **não** é versionada

## Banco de Dados

* **Engine**: MariaDB (via Docker Compose)
* Descrição do script de inicialização (sql/init.sql):
Este script é executado automaticamente na criação do container do MariaDB (via docker compose up) ou pode ser rodado manualmente em uma instância local. Ele realiza as seguintes ações:
```sql
CREATE DATABASE IF NOT EXISTS prisma_shadow_db;
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```
Esse banco prisma_shadow_db é usado internamente pelo Prisma em operações como migrações e shadow database, garantindo que o schema possa ser sincronizado sem impactar dados reais. Em produção, um banco de aplicação separado (caio_ideas, por exemplo) é criado e gerenciado com as tabelas do sistema.

**Variáveis .env (exemplo)**
# Backend
```
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=caio_ideas
DB_USER=user
DB_PASSWORD=secret
DATABASE_URL="mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
```
> Os arquivos `.env` necessários serão fornecidos junto ao projeto; os valores acima são apenas referência.

**Contrato – payload de criação/atualização**:

```json
{
    "id": 1,
    "authorId": "C003",
    "improvement": "O que pode ser melhorado...",
    "currentProcess": "Como é feito hoje...",
    "proposedChange": "Como pode ser melhorado...",
    "expectedBenefit": "Qual é o benefício...",
    "createdAt": "2025-08-14T01:14:24.992Z",
    "updatedAt": "2025-08-14T01:14:29.887Z"
  }
```

## Passo a passo para o avaliador rodar

> Requisitos: **Docker + Docker Compose/MariaDB instalado na máquina local**, **Node.js 20+**, **npm 10+**.

1. **Entrar no projeto**

```bash
cd caio-ideas
```

2. **Garantir `.env`**
   Certifique-se de que os arquivos `.env` (raiz/backend/frontend) foram fornecidos e estão no lugar.

3. **Subir o banco (MariaDB)**

* Usando Docker Compose:
```bash
docker compose up -d
# aguarde o container ficar saudável
```
* Usando MariaDB local:
    * Certifique-se que o serviço está em execução.
    * Rode o script SQL DDL (Data Definition Language) e DCL (Data Control Language) abaixo:
```sql
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS caio_ideas;
CREATE DATABASE IF NOT EXISTS prisma_shadow_db;

-- Criação do usuário
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'secret';

-- Concessão de permissões ao usuário
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';

-- Aplicar as mudanças de privilégio
FLUSH PRIVILEGES;
```

4. **Instalar dependências e rodar o backend**

```bash
cd backend
npm install
npm run start:dev
```

5. **Rodar as migrações do prisma**

```bash
cd backend
npx prisma migrate dev 
```

6. **Rodar a suite de testes (Opcional)** 
```bash
cd backend
npm test
npm run test:cov
```

7. **Testar os endpoints via api.http no VSCode (Opcional)**

**Extensão:** Identifier humao.rest-client

* Navegue até o diretório do backend
* Abra o arquivo api.http
* Com o arquivo aberto, clique em "Send Request" acima de cada chamada

8. **Instalar dependências e rodar o frontend** (em outro terminal)

```bash
cd frontend
npm install
npm run dev 
```

## Convenções e trade-offs

* **Padrão de camadas**: *routes → controllers → services → repositories* para separar responsabilidades.
* **DTOs/Validação**: normalizar o contrato na borda (controller) e validar inputs (campos obrigatórios e tamanhos).
* **Tratamento de erros**: respostas JSON padronizadas.
* **Logs**: mensagens curtas e contextuais; nada sensível.
* **Estilo de código**: ESLint + Prettier; Types estritos no TypeScript quando possível.
* **Commits**: utilizado o git flow para versionar e manter histórico claro.
* **Decisões de MVP**:

  * Sem autenticação inicialmente; foco no CRUD e no fluxo de ideias.
  * Validações pragmáticas para acelerar feedback do usuário.
  * SQL simples e índices mínimos; otimizações futuras no roadmap.

> Qualquer divergência de comandos/scripts em relação ao seu ambiente será ajustada rapidamente; este README foi escrito para evidenciar o raciocínio, as escolhas e o fluxo de desenvolvimento no MVP.


