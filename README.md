# 📱 Praça App - Gestão de Vendas e Estoque

Sistema mobile desenvolvido para auxiliar comerciantes da Praça das Flores no controle de estoque, vendas e faturamento, substituindo anotações manuais por uma solução digital eficiente.

---

## 🎯 Objetivo

Facilitar o dia a dia de vendedores que utilizam cadernos e anotações, oferecendo:

- Controle de estoque em tempo real
- Registro de vendas e emissão de pedidos
- Relatórios financeiros e métricas de faturamento
- Segurança de dados com autenticação protegida por Hashing

---

## 🏗️ Arquitetura do Sistema

O projeto é dividido em 3 camadas profissionais que se conectam em rede:

```text
[ App Mobile (React Native / Expo) ]
               ↓
    Requisições HTTP (API REST)
               ↓
[ Backend (Java Spring Boot + Security) ]
               ↓
          Consultas SQL
               ↓
[ Banco de Dados (MySQL) ]
```

---

## 🚀 Tecnologias Utilizadas

### 📱 Frontend
- React Native
- Expo Router (Navegação super moderna e veloz baseada em arquivos)
- Node.js
- @expo/vector-icons (Ícones padronizados)

### 🖥️ Backend
- Java 21
- Spring Boot (Data JPA, Web)
- Spring Security (Proteção com BCrypt)
- Maven
- Lombok

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
2. Verifique se você possui o usuário `app_user` e a senha `123456` configurados na sua máquina, ou ajuste as configurações no backend.
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
