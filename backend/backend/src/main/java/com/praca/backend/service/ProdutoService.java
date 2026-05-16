package com.praca.backend.service;

import com.praca.backend.model.Produto;
import com.praca.backend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Serviço de Produtos (ProdutoService)
 * 
 * Aqui ficam as regras de negócio relacionadas aos produtos.
 * O serviço chama o repositório para salvar ou buscar as informações.
 */
@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repositorioDeProdutos;

    /**
     * Função para listar todos os produtos cadastrados.
     */
    public List<Produto> listarTodosOsProdutos() {
        return repositorioDeProdutos.findAll();
    }

    /**
     * Função para buscar um produto específico pelo seu ID.
     */
    public Optional<Produto> buscarProdutoPorId(Long id) {
        return repositorioDeProdutos.findById(id);
    }

    /**
     * Função para cadastrar um novo produto ou atualizar um já existente.
     */
    public Produto salvarProduto(Produto produto) {
        return repositorioDeProdutos.save(produto);
    }

    /**
     * Função para excluir um produto baseado no seu ID.
     */
    public void excluirProduto(Long id) {
        repositorioDeProdutos.deleteById(id);
    }
}
