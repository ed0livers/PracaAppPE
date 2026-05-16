package com.praca.backend.repository;

import com.praca.backend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositório de Produtos (ProdutoRepository)
 * 
 * Esta interface é responsável por acessar os dados da tabela de produtos.
 * O Spring Boot (JPA) implementa automaticamente os comandos de banco de dados (Salvar, Listar, Excluir, etc)
 * sem precisarmos escrever códigos SQL complexos.
 */
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    // Métodos personalizados podem ser adicionados aqui se necessário
}
