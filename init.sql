-- Criação do banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS praca_app;
USE praca_app;

-- 1. Tabela de Usuários (Vendedores)
-- Servirá para o login no aplicativo.
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    -- Segurança: A senha não deve ser gravada em "texto puro" (ex: "123456").
    -- O backend Java usará BCrypt para transformá-la em um "Hash" (ex: "$2a$10$T8...").
    -- VARCHAR(255) é o tamanho ideal para armazenar esse Hash longo e seguro.
    senha_hash VARCHAR(255) NOT NULL,
    data_nascimento DATE
);

-- 2. Tabela de Produtos
-- Armazena os itens disponíveis para venda e seu estoque atual.
CREATE TABLE IF NOT EXISTS produtos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(255),
    preco DOUBLE NOT NULL,
    estoque INT NOT NULL
);

-- 3. Tabela de Vendas (Recibos / Comprovantes)
-- Armazena o registro de quando uma venda foi feita e o seu total final.
CREATE TABLE IF NOT EXISTS vendas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data_da_venda DATETIME NOT NULL,
    valor_total DOUBLE NOT NULL
);

-- 4. Tabela de Itens da Venda (Carrinho)
-- Armazena "o que" foi vendido dentro de cada venda (recibo).
-- Ela se conecta com a tabela de produtos (para saber o item) e de vendas (para saber o recibo).
CREATE TABLE IF NOT EXISTS itens_venda (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    produto_id BIGINT NOT NULL,
    venda_id BIGINT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DOUBLE NOT NULL,
    
    -- Chave estrangeira ligando ao Produto
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    
    -- Chave estrangeira ligando à Venda (Se a venda for apagada, apaga os itens dela automaticamente usando CASCADE)
    FOREIGN KEY (venda_id) REFERENCES vendas(id) ON DELETE CASCADE
);
