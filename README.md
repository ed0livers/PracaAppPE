# 📱 Praça App PE - Gestão de Vendas e Estoque

**Sistema mobile completo** para auxiliar comerciantes da Praça das Flores no controle de estoque, vendas e faturamento, substituindo anotações manuais por uma solução digital eficiente e segura.

---

## 🎯 Objetivo

Facilitar o dia a dia de vendedores com uma solução profissional que oferece:

✅ **Autenticação segura** com email e senha criptografados (BCrypt)  
✅ **Controle de estoque** em tempo real com atualização automática  
✅ **Registro de vendas** rápido e intuitivo com carrinho de compras  
✅ **Relatórios financeiros** com faturamento mensal e histórico de transações  
✅ **Dashboard** com métricas do dia (vendas e pedidos)  
✅ **Aplicativo mobile** responsivo e de fácil uso  

---

## 🏗️ Arquitetura do Sistema

O projeto segue uma arquitetura em **3 camadas** profissionais:

```
┌─────────────────────────────────────────┐
│  📱 Frontend (React Native + Expo)      │
│     Telas, UI e Navegação               │
└─────────────────┬───────────────────────┘
                  │ HTTP REST
                  ↓
┌─────────────────────────────────────────┐
│  🖥️  Backend (Java + Spring Boot)       │
│     API REST, Segurança, Regras         │
└─────────────────┬───────────────────────┘
                  │ JDBC/SQL
                  ↓
┌─────────────────────────────────────────┐
│  🗄️  Banco de Dados (MySQL)             │
│     Usuários, Produtos, Vendas          │
└─────────────────────────────────────────┘
```

---

## 🚀 Tecnologias Utilizadas

### 📱 **Frontend (Mobile)**
- **React Native** — Framework para aplicativos multiplataforma
- **Expo Router** — Roteamento baseado em arquivos (File-based Routing)
- **Expo Go** — Para desenvolvimento e testes em tempo real
- **TypeScript** — Tipagem estática para JavaScript
- **@expo/vector-icons** (Ionicons) — Ícones padronizados
- **Node.js & npm** — Gerenciamento de dependências

### 🖥️ **Backend (API REST)**
- **Java 21** — Linguagem de programação
- **Spring Boot** — Framework para aplicações Java
- **Spring Data JPA** — Persistência de dados
- **Spring Security** — Autenticação e proteção
- **BCrypt** — Criptografia de senhas
- **Maven** — Gerenciador de compilação
- **Lombok** — Redução de boilerplate

### 🗄️ **Banco de Dados**
- **MySQL 8.0** — Sistema gerenciador relacional
- **Docker** — Containerização

---

## 📋 Pré-Requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v16+) e **npm** — [Baixar](https://nodejs.org/)
- **Java JDK** (v21+) — [Baixar](https://www.oracle.com/java/technologies/downloads/)
- **Maven** (v3.6+) — [Baixar](https://maven.apache.org/download.cgi)
- **Docker Desktop** — [Baixar](https://www.docker.com/products/docker-desktop/)
- **Git** — [Baixar](https://git-scm.com/)

---

## 🚀 Como Rodar o Projeto

### ⚡ Opção 1: Com Docker (Recomendado)

A forma mais rápida e segura é usar Docker Compose. O projeto inteiro (banco de dados + backend) sobe com um único comando.

#### 1️⃣ Inicie o Docker Compose

```bash
cd c:\Users\ed_ne\OneDrive\Desktop\PracaAppPE-main
docker compose up --build
```

> ⏳ Na primeira vez, pode levar 2-3 minutos para fazer o build e iniciar os serviços.

#### 2️⃣ Verifique se está tudo funcionando

- **Backend está rodando?** → Acesse http://localhost:8080
- **MySQL está pronto?** → Conecte com o client: `localhost:3306` (Usuário: `root`, Senha: `123456`)

#### 3️⃣ Inicie o Frontend

Em outra janela do terminal:

```bash
cd frontend
npm install
npm start
```

Escaneie o QR code com o Expo Go no seu celular ou pressione `i` para iOS / `a` para Android.

---

### 💻 Opção 2: Rodando Localmente (Sem Docker)

Se preferir não usar Docker, siga os passos abaixo:

#### 🗄️ **Passo 1: Configure o Banco de Dados MySQL**

1. Instale o MySQL e inicie o serviço
2. Crie o banco de dados e as tabelas:

```bash
cd c:\Users\ed_ne\OneDrive\Desktop\PracaAppPE-main
mysql -u root -p < init.sql
```

Quando solicitado, insira a senha (padrão: `123456`).

#### 🖥️ **Passo 2: Configure o Backend Java**

1. Abra a pasta do backend:

```bash
cd backend/backend
```

2. Configure as credenciais do banco de dados em `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/praca_app
spring.datasource.username=root
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. Compile e execute:

```bash
mvn clean install
mvn spring-boot:run
```

✅ O backend estará disponível em http://localhost:8080

#### 📱 **Passo 3: Inicie o Frontend**

1. Abra outra janela do terminal:

```bash
cd frontend
npm install
npm start
```

2. Escaneie o QR code com Expo Go ou pressione as teclas indicadas.

---

## 📲 Usando o Aplicativo

### 1️⃣ **Login**
- Insira seu **email** e **senha**
- As credenciais são verificadas contra o banco de dados com segurança BCrypt

### 2️⃣ **Dashboard (Início)**
- Visualize as **vendas de hoje** e **quantidade de pedidos**
- Veja o **histórico das últimas 3 transações**
- Acesse atalhos rápidos para outras funcionalidades

### 3️⃣ **Estoque**
- Visualize todos os **produtos cadastrados**
- **Busque** produtos por nome ou categoria
- **Cadastre novos produtos** com nome, categoria, preço e quantidade
- Produtos com estoque baixo aparecem destacados

### 4️⃣ **Vendas**
- Selecione produtos do estoque
- **Adicione ao carrinho** com quantidade
- Ajuste quantidades ou **remova itens**
- Visualize o **total da venda** em tempo real
- **Finalize a venda** (abate automaticamente do estoque)

### 5️⃣ **Financeiro**
- Visualize o **faturamento do mês**
- Consulte o **histórico de transações** agrupado por data
- Monitore a **receita total**

### 6️⃣ **Configurações**
- Edite seu **perfil**
- Acesse **suporte**
- **Faça logout** da conta

---

## 🔌 API REST (Endpoints)

### 📦 **Produtos**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/produtos` | Lista todos os produtos |
| `POST` | `/api/produtos` | Cadastra um novo produto |
| `GET` | `/api/produtos/{id}` | Busca um produto específico |
| `DELETE` | `/api/produtos/{id}` | Remove um produto |

**Exemplo de requisição POST:**
```json
{
  "nome": "Camiseta Azul",
  "categoria": "Roupas",
  "preco": 49.90,
  "estoque": 15
}
```

### 🛒 **Vendas**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/vendas` | Lista histórico de vendas |
| `POST` | `/api/vendas` | Registra uma nova venda |

**Exemplo de requisição POST:**
```json
{
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 2,
      "preco_unitario": 49.90
    },
    {
      "produto_id": 3,
      "quantidade": 1,
      "preco_unitario": 120.00
    }
  ]
}
```

### 🔐 **Autenticação**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/login` | Autentica usuário |

**Exemplo:**
```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

---

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

**`usuarios`** — Credenciais de acesso
- `id` — Identificador único
- `email` — Email do usuário (nome de usuário)
- `senha_hash` — Senha criptografada com BCrypt

**`produtos`** — Catálogo de estoque
- `id` — Identificador único
- `nome` — Nome do produto
- `categoria` — Categoria (ex: Roupas, Eletrônicos)
- `preco` — Preço unitário
- `estoque` — Quantidade disponível

**`vendas`** — Histórico de transações
- `id` — Identificador único
- `data_da_venda` — Timestamp da venda
- `valor_total` — Valor total da transação

**`itens_venda`** — Itens de cada venda
- `id` — Identificador único
- `venda_id` — Referência à venda (FK)
- `produto_id` — Referência ao produto (FK)
- `quantidade` — Quantidade vendida
- `preco_unitario` — Preço no momento da venda

---

## 📖 Guias Detalhados

Para aprofundar em cada parte do projeto, consulte:

- [GUIA_BACKEND.md](GUIA_BACKEND.md) — Arquitetura, serviços e rotas da API
- [GUIA_FRONTEND.md](GUIA_FRONTEND.md) — Estrutura de componentes e navegação
- [GUIA_BANCO_DE_DADOS.md](GUIA_BANCO_DE_DADOS.md) — Modelo relacional e tabelas
- [implementation_plan.md](implementation_plan.md) — Plano de implementação e integrações

---

## 🛠️ Solução de Problemas

### ❌ Docker não conecta ao banco de dados

```bash
# Verifique o status dos containers
docker compose ps

# Limpe e reinicie
docker compose down -v
docker compose up --build
```

### ❌ Porta 8080 já está em uso

```bash
# Mude a porta no docker-compose.yml
# Ou finalize o processo que está usando:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### ❌ Erro ao conectar do celular ao backend

1. Certifique-se que celular e computador estão na **mesma rede Wi-Fi**
2. Edite o arquivo `.env` do frontend com o IP correto da sua máquina
3. Use `ipconfig` no Windows para encontrar o IP local

### ❌ Problemas com npm ou Node

```bash
# Limpe o cache
npm cache clean --force

# Reinstale as dependências
rm -r node_modules package-lock.json
npm install
```

---

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na pasta `frontend/` com as configurações:

```env
# API Backend
EXPO_PUBLIC_API_URL=http://localhost:8080/api

# Para celular físico (substituir pelo IP da sua máquina)
EXPO_PUBLIC_API_URL=http://192.168.1.12:8080/api
```

---

## 🤝 Contribuições

Este projeto foi desenvolvido como solução digital para comerciantes da Praça das Flores. Sugestões e melhorias são bem-vindas!

---

## 📞 Suporte

Em caso de dúvidas ou erros:

1. Verifique os [guias detalhados](./GUIA_BACKEND.md)
2. Consulte o [plano de implementação](./implementation_plan.md)
3. Revise os logs do Docker: `docker compose logs -f`

---

## 📄 Licença

Este projeto é propriedade da Praça das Flores - PE. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para facilitar a vida dos comerciantes.** 🛍️

### 🗄️ Banco de Dados
- MySQL

---

## 📂 Estrutura do Projeto

```text
PracaAppPE/
│
├── frontend/                 # Código do aplicativo mobile (React Native)
│   └── src/app/              # Telas construídas e layout de navegação 
│
├── backend/                  # Código da API REST em Java
│   └── backend/src/main/     # Controladores, Modelos, Repositórios e Serviços
│
├── init.sql                  # Script para criação imediata do Banco de Dados
├── GUIA_FRONTEND.md          # Manual de funcionamento da interface
├── GUIA_BACKEND.md           # Manual de funcionamento das regras da API
└── GUIA_BANCO_DE_DADOS.md    # Manual explicativo das tabelas
```

---

## ⚙️ Passo a Passo: Como Rodar o Projeto

Para testar as funcionalidades em sua máquina local, você deve iniciar as três partes do sistema (Banco de Dados, Backend e Frontend).

### Passo 1: O Banco de Dados (MySQL)
1. Instale e abra o seu servidor MySQL (ex: **XAMPP**, **MySQL Workbench**, etc).
2. Verifique se você possui o usuário `root` e a senha `123456` configurados na sua máquina, ou ajuste as configurações no backend.
3. Importe e execute o arquivo **`init.sql`** presente na raiz deste projeto. Ele vai criar o banco `praca_app` e todas as 4 tabelas de forma 100% automática e relacionada.

### Passo 2: O Backend (Java / Spring Boot)
1. Certifique-se de ter o **Java 21** e o **Maven** instalados em seu computador.
2. Abra a pasta `backend/backend` através da sua IDE preferida (recomendamos o **IntelliJ IDEA** ou Eclipse).
3. Aguarde o carregamento e sincronização das bibliotecas pelo `pom.xml`.
4. Aperte o botão de Play/Run no arquivo principal: `BackendApplication.java`.
5. O servidor iniciará! O Console do terminal mostrará que a aplicação subiu e a API estará online na porta **`8080`**.

### Passo 3: O Frontend (Aplicativo Mobile)
1. Abra um terminal (Prompt de Comando ou Terminal do VS Code) e entre na pasta do app:
   ```bash
   cd frontend
   ```
2. Instale as bibliotecas base da interface (React e afins):
   ```bash
   npm install
   ```
3. Inicie o servidor central do Expo:
   ```bash
   npm start
   ```
4. Baixe o aplicativo **Expo Go** no seu celular Android ou iOS.
5. Certifique-se de que o seu celular e o seu computador estão conectados na **mesma rede Wi-Fi**. Abra o Expo Go no celular e escaneie o **QR Code** que apareceu na tela do terminal.
6. A compilação começará e, em segundos, a tela de **Login** do Praça App abrirá no seu celular, pronta para usar!

---

## 📊 Status de Desenvolvimento

🚧 **Em evolução** (No momento, o foco é plugar as telas já desenhadas do app com o nosso backend rodando).

- [x] Estruturação base de pastas
- [x] Layout Rico (Dashboard, Abas Inferiores, Cores UI/UX) - Frontend
- [x] API Lógica de Produtos e Estoque - Backend
- [x] API Lógica de Vendas e Carrinho com Abatimento Automático - Backend
- [x] API de Autenticação de Usuários com BCrypt e Hash - Backend
- [x] Modelagem Relacional do Banco de Dados (`init.sql`)
- [x] Conectar os dados dinâmicos da API Java dentro das telas do React Native (utilizando o `fetch`).

---

## 👨‍🎓 Projeto Acadêmico
Desenvolvido como projeto de extensão e focado em apresentar uma solução de gestão real e viável para os pequenos comerciantes da Praça das Flores.

---

📄 **Licença**
Uso estritamente acadêmico.
