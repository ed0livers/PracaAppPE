# 🗄️ Guia do Banco de Dados — Praça App PE

Este documento explica de forma detalhada o nosso banco de dados, criado para suportar o Praça App. Utilizaremos o **MySQL**, e os dados se basearão em um arquivo que criamos chamado `init.sql`. O foco desse guia é esclarecer como o banco de dados armazena suas informações.

## 🗂️ Tabelas (O que elas fazem?)

O nosso banco foi criado para ser o "cérebro memorizador" da aplicação. Ele possui 4 gavetas principais (tabelas):

### 1. Tabela `usuarios` (Quem usa o app)
Guarda as credenciais de acesso do vendedor.
- **Colunas Importantes:** 
  - `email`: Serve como nome de usuário.
  - `senha_hash`: Em vez de guardar a senha de forma visível, o nosso backend usa uma criptografia (Spring Security com BCrypt) para gravar um texto embaralhado. Assim, se alguém invadir o banco de dados, não saberá a senha do vendedor!

### 2. Tabela `produtos` (O que você tem na loja)
É o estoque virtual.
- **Colunas Importantes:** 
  - `estoque`: Um número inteiro que sobe e desce a cada venda.
  - `preco`: O valor base do produto na loja.

### 3. Tabela `vendas` (A Nota Fiscal / O Recibo)
Toda vez que você aperta em "Finalizar Venda" no aplicativo, uma "nota" é gerada aqui.
- **Colunas Importantes:** 
  - `data_da_venda`: Registra a hora exata.
  - `valor_total`: O somatório em dinheiro de tudo o que foi vendido nessa transação.

### 4. Tabela `itens_venda` (O conteúdo do carrinho)
Sabe aquele papelzinho do supermercado que lista todos os itens de uma compra? É essa tabela!
- Se você comprar "1 Calça" e "2 Camisas", teremos **duas linhas** novas gravadas nessa tabela.
- Ambas estarão apontando para o mesmo `venda_id` (o recibo "pai"), garantindo que o sistema saiba que essas peças saíram no mesmo pedido.
- Ela usa **Chaves Estrangeiras (FOREIGN KEYS)**, ou seja, ela "amarra" os dados para que o sistema não cadastre um "Fantasma" que não exista na tabela `produtos`.

---

## 🛠️ Como preparar o seu banco de dados?

Se você formatar o computador ou quiser preparar o projeto na máquina de um colega:
1. Abra o seu servidor **MySQL** (usando o MySQL Workbench ou o phpMyAdmin do XAMPP).
2. Abra o arquivo **`init.sql`** que está na raiz do projeto.
3. Copie todo o código que está lá e mande executar (`Run`).

Ele automaticamente criará o banco `praca_app` e todas essas 4 tabelas conectadas, com os tipos corretos de formatação! 🚀
