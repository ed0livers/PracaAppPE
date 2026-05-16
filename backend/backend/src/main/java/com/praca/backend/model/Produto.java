package com.praca.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Classe Produto
 * Esta classe representa um produto no estoque da loja.
 * Ela mapeia diretamente para a tabela "produtos" no banco de dados MySQL.
 */
@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    
    // Identificador único do produto (Chave Primária), gerado automaticamente
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome do produto (ex: "Camiseta Básica"). Não pode ser nulo.
    @Column(nullable = false)
    private String nome;

    // Categoria do produto (ex: "Roupas")
    private String categoria;

    // Preço de venda do produto
    @Column(nullable = false)
    private Double preco;

    // Quantidade atual de itens disponíveis em estoque
    @Column(nullable = false)
    private Integer estoque;
}
