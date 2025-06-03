Projeto desenvolvido com NestJS

---

## ✅ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/EmersonTanno/2bmTopicosProgramacao7s.git

# Acesse a pasta do projeto
cd 2bmTopicosProgramacao7s

# Instale as dependências
npm install
```

## ▶️ Execução

```bash
# Executar em modo de desenvolvimento
npm run start:dev

# Executar em produção
npm run start
```

## ⚙️ .env (Exemplo)

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

``` .env
MONGO_URL="mongodb://localhost:27017/atividadeTopicos"

JWTTOKEN="token"

SALTORROUNDS=10
```

## 📚 Rotas da API

### 🔑 Auth
#### ➕ Fazer Login
POST `/auth/login` </br>
(Pública — não requer autenticação)
Body (default user):
``` json
{
    "username": "Kannon",
    "password": "admin123"
}
```
Resposta:
`200 OK`
``` json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODJlMGExZGUxNTdmOGRjN2E3NjE0OTciLCJ1c2VybmFtZSI6Ikthbm5vbiIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTc0ODk3NDQ4NCwiZXhwIjoxNzQ4OTc0Nzg0fQ.BmM9uwSSYV-xY6WMNZVfb_X6fRD2RYOkXcMiaLWL_Aw"
}
```

### 👤 User
#### ➕ Criar Usuário  
POST `/users`  
**Requer:**
- Role: `admin`
- Header: `Authorization: Bearer <token>`
Body:
```json
{
  "name": "User1",
  "password": "123",
  "roles": ["user"]
}
```
Resposta:
`201 Created`

#### 📄 Listar todos os usuários
GET `/users` </br>
**Requer:**
- Role: `admin` ou `user`
- Header: `Authorization: Bearer <token>` </br>
Resposta:
`200 OK`
``` json
[
    {
        "id": "682e0a1de157f8dc7a761497",
        "name": "Kannon",
        "roles": [
            "admin"
        ]
    },
    {
        "id": "68370ce1d68f748950195620",
        "name": "Saga",
        "roles": [
            "user"
        ]
    },
    ...
]
```

#### 🔍 Buscar usuário por ID
GET `/users/:id` </br>
**Requer:**
- Role: `admin` ou `user`
- Header: `Authorization: Bearer <token>` </br>
Resposta:
`200 OK`
``` json
{
    "id": "68370ce1d68f748950195620",
    "name": "Saga",
    "roles": [
        "user"
    ]
}
```

#### ✏️ Atualizar usuário
PUT `/users/:id` </br>
**Requer:**
- Role: `admin`
- Header: `Authorization: Bearer <token>`
Body:
``` json
{
    "name": "Saga",
    "password": "asdas"
}
```
Resposta:
`200 OK`
``` json
{
    "id": "68370ce1d68f748950195620",
    "name": "Saga",
    "roles": [
        "user"
    ]
}
```

#### ❌ Deletar usuário
DELETE `/users/:id` </br>
**Requer:**
- Role: `admin`
- Header: `Authorization: Bearer <token>`</br>
Resposta:
`204 No Content`

### 📝 Tasks
#### ➕ Criar Task  
POST `/tasks`  
**Requer:**
- Role: `admin` ou `user`
- Header: `Authorization: Bearer <token>`
Body:
```json
{
    "taskName": "Task 1",
    "taskDescription": "Descrição task 1"
}
```
Resposta:
`201 Created`
``` json
{
    "userId": "682e0a1de157f8dc7a761497",
    "taskName": "Task 1",
    "taskDescription": "Descrição task 1",
    "taskStatus": "backlog",
    "_id": "683f4923178902b856168253",
    "__v": 0
}
```

#### 📄 Listar todas as tasks
GET `/tasks` </br>
**Requer:**
- Role: `admin` ou `user`
- Header: `Authorization: Bearer <token>` </br>
Resposta:
`200 OK`
``` json
[
    {
        "_id": "683b5659b9324229bd6e9ce0",
        "userId": "682e0a1de157f8dc7a761497",
        "taskName": "1",
        "taskDescription": "a",
        "taskStatus": "inProgress",
        "__v": 0
    },
    {
        "_id": "683b565eb9324229bd6e9ce2",
        "userId": "682e0a1de157f8dc7a761497",
        "taskName": "3",
        "taskDescription": "b",
        "taskStatus": "backlog",
        "__v": 0
    },
    ...
]
```

#### 🔍 Buscar task por ID
GET `/tasks/:id` </br>
**Requer:**
- Role: `admin` ou `user`
- Header: `Authorization: Bearer <token>` </br>
Resposta:
`200 OK`
``` json
{
    "_id": "683b5659b9324229bd6e9ce0",
    "userId": "682e0a1de157f8dc7a761497",
    "taskName": "3",
    "taskDescription": "a",
    "taskStatus": "inProgress",
    "__v": 0
}
```

#### ✏️ Atualizar task
PUT `/tasks/:id` </br>
**Requer:**
- Role: `admin`
- Header: `Authorization: Bearer <token>`
Body:
``` json
{
    "taskName": "1",
    "taskDescription": "2",
    "taskStatus": "inProgress"
}
```
Resposta:
`200 OK`
``` json
{
    "_id": "683b5659b9324229bd6e9ce0",
    "userId": "682e0a1de157f8dc7a761497",
    "taskName": "1",
    "taskDescription": "2",
    "taskStatus": "inProgress",
    "__v": 0
}
```

#### ❌ Deletar task
DELETE `/tasks/:id` </br>
**Requer:**
- Role: `admin` ou `user`
- Header: `Authorization: Bearer <token>`</br>
Resposta:
`204 No Content`

#### 📄 Listar todas as tasks do usuário logado
GET `/tasks/user/tasks` </br>
**Requer:**
- Role: `admin` ou `user`
- Header: `Authorization: Bearer <token>` </br>
Resposta:
`200 OK`
``` json
[
    {
        "_id": "683b565eb9324229bd6e9ce2",
        "userId": "682e0a1de157f8dc7a761497",
        "taskName": "1",
        "taskDescription": "a",
        "taskStatus": "backlog",
        "__v": 0
    },
    {
        "_id": "683f4923178902b856168253",
        "userId": "682e0a1de157f8dc7a761497",
        "taskName": "AIOLIA TASK",
        "taskDescription": "a",
        "taskStatus": "backlog",
        "__v": 0
    },
    ...
]
```

#### ✏️ Atualizar status da task
PUT `/tasks/:id/:status` </br>
**Requer:**
- Role: `admin`
- Header: `Authorization: Bearer <token>` </br>
Resposta:
`200 OK`
``` json
{
    "_id": "683b565eb9324229bd6e9ce2",
    "userId": "682e0a1de157f8dc7a761497",
    "taskName": "1",
    "taskDescription": "a",
    "taskStatus": "backlog",
    "__v": 0
}
```