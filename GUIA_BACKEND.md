# 🖥️ Guia do Backend — Praça App PE

Este documento explica de forma detalhada o backend da aplicação, desenvolvido em **Java** com o framework **Spring Boot**. O objetivo desse guia é ajudar iniciantes a entenderem como cada camada do projeto funciona e se comunica com o banco de dados (MySQL) e o Frontend (React Native).

## 🏗️ Estrutura e Camadas do Projeto

O sistema segue a arquitetura tradicional em "Camadas" (MVC adaptado para APIs REST), que divide as responsabilidades para manter o código organizado. Aqui estão as três camadas principais que criamos:

### 1. `model/` (Entidades / Modelos de Dados)
A camada **Model** é a base de tudo. As classes aqui representam as tabelas que vão existir lá no nosso banco de dados.

- **`Produto.java`**: Essa classe é a nossa tabela `produtos`. Nela declaramos coisas como o `nome`, `categoria`, `preco` e o `estoque` (quantidade).
- **`Venda.java`**: Representa um recibo (Data da Venda e Valor Total).
- **`ItemVenda.java`**: Representa cada linha do carrinho. Mostra a quantidade de um produto específico vendida naquela transação.

### 2. `repository/` (Repositórios / Acesso a Dados)
A camada **Repository** é a ponte entre a aplicação Java e o banco de dados MySQL.

- Ao criarmos `ProdutoRepository.java` e `VendaRepository.java`, não escrevemos códigos complexos de inserção (SQL). O Spring Boot cria eles sozinho nos bastidores.

### 3. `service/` (Serviços / Regras de Negócio)
A camada **Service** é o cérebro da aplicação. Nela escrevemos as regras que exigem inteligência, como uma verificação de fraude ou um cálculo complexo.

- **`VendaService.java`**: Aqui foi criada a função mágica `realizarVenda()`. O que ela faz?
  1. Varre o carrinho que veio do aplicativo;
  2. Verifica na tabela se os produtos realmente existem;
  3. Checa se há "estoque" suficiente para cada item (se não tiver, cancela toda a compra!);
  4. Reduz a quantidade comprada do estoque;
  5. Salva o pedido.

### 4. `controller/` (Controladores / API REST)
A camada **Controller** é a "Porta de Entrada" do backend. É ela que cria as URLs (EndPoints) que o aplicativo React Native vai acessar usando a internet.

---

## 🔌 Resumo de Rotas Disponíveis (APIs)

### 📦 Produtos
| Método | URL (EndPoint)             | Função | Explicação |
|--------|----------------------------|--------|------------|
| `GET`  | `/api/produtos`            | `obterListaDeProdutos()` | Retorna a lista de todos os produtos do estoque no formato JSON. |
| `POST` | `/api/produtos`            | `cadastrarNovoProduto()` | Recebe informações em formato JSON e cadastra um produto novo no banco. |
| `GET`  | `/api/produtos/{id}`       | `obterProdutoUnico()` | Busca e retorna um produto com o ID específico. |
| `DELETE`| `/api/produtos/{id}`      | `removerProduto()` | Apaga definitivamente um produto do banco de dados. |

### 🛒 Vendas (Carrinho)
| Método | URL (EndPoint)             | Função | Explicação |
|--------|----------------------------|--------|------------|
| `GET`  | `/api/vendas`              | `obterListaDeVendas()` | Retorna o Histórico de transações para a tela financeira. |
| `POST` | `/api/vendas`              | `registrarNovaVenda()` | Finaliza uma compra abatendo o estoque automaticamente. |

> **Nota para iniciantes:**  
> O código foi estruturado com variáveis e métodos totalmente em Português para fins acadêmicos, facilitando a correlação de ações reais ("vender", "cadastrar") com a linguagem da programação (métodos e funções).
