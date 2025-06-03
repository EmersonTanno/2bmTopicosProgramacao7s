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

### Auth
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
- Header: `Authorization: Bearer <token>`
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
- Header: `Authorization: Bearer <token>`
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

