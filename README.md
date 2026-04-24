# 📱 Praça App - Gestão de Vendas e Estoque

Sistema mobile desenvolvido para auxiliar comerciantes da Praça das Flores no controle de estoque, vendas e faturamento, substituindo anotações manuais por uma solução digital eficiente.

---

## 🎯 Objetivo

Facilitar o dia a dia de vendedores que utilizam cadernos e anotações, oferecendo:

- Controle de estoque em tempo real
- Registro de vendas
- Relatórios de faturamento
- Cobrança via QR Code (futuro)

---

## 🏗️ Arquitetura do Sistema


App Mobile (React Native)
↓
API REST (Java Spring Boot)
↓
Banco de Dados (MySQL)


---

## 🚀 Tecnologias Utilizadas

### 📱 Frontend
- React Native
- Expo
- Node.js

### 🖥️ Backend
- Java 21
- Spring Boot
- Maven
- Lombok

### 🗄️ Banco de Dados
- MySQL

### 🧰 Ferramentas
- VS Code
- IntelliJ IDEA
- MySQL Workbench
- Git e GitHub

---

## 📂 Estrutura do Projeto


praca-app/
│
├── frontend/ # Aplicativo mobile
└── backend/ # API em Java


---

## ⚙️ Configuração do Ambiente

### 🔹 Backend

Arquivo: `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/praca_app
spring.datasource.username=app_user
spring.datasource.password=123456

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

🔹 Banco de Dados
CREATE DATABASE praca_app;
CREATE USER 'app_user'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON praca_app.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;

🔹 Rodar Backend
Abrir projeto no IntelliJ
Executar BackendApplication

📱 Rodar Frontend
cd frontend
npm install
npm start

Depois:
Abrir Expo Go no celular
Escanear QR Code

👥 Como Contribuir
1. Clonar o projeto
git clone https://github.com/seu-usuario/praca-app.git
2. Criar uma branch
git checkout -b feature/nome-da-feature
3. Commit
git commit -m "feat: descrição da funcionalidade"
4. Enviar
git push origin feature/nome-da-feature
5. Abrir Pull Request

📌 Padrões do Projeto
Separação entre frontend e backend
Uso de branches para novas funcionalidades
Não subir arquivos desnecessários (node_modules, target, etc.)

📊 Status do Projeto
🚧 Em desenvolvimento

✔ Ambiente configurado
✔ Backend funcional
✔ Integração com banco de dados

🔮 Próximas Funcionalidades
CRUD de produtos
Controle de estoque
Relatórios de vendas
Autenticação de usuários
Pagamento via QR Code

👨‍🎓 Projeto Acadêmico
Desenvolvido como projeto de extensão com foco em solução real para pequenos comerciantes.

📄 Licença
Uso acadêmico

