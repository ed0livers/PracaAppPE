package com.praca.backend.controller;

import com.praca.backend.model.Produto;
import com.praca.backend.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador de Produtos (ProdutoController)
 * 
 * Esta classe é a API (Interface de Programação de Aplicação). Ela cria os "EndPoints" (URLs)
 * que o nosso aplicativo React Native vai acessar para enviar e receber informações dos produtos.
 */
@RestController
@RequestMapping("/api/produtos") // Todos os acessos começarão com /api/produtos
@CrossOrigin(origins = "*") // Permite que o frontend acesse essa API sem erro de bloqueio (CORS)
public class ProdutoController {

    @Autowired
    private ProdutoService servicoDeProdutos;

    /**
     * API para buscar todos os produtos (Acessado via método GET).
     * O celular vai usar essa rota na tela de "Estoque".
     */
    @GetMapping
    public List<Produto> obterListaDeProdutos() {
        return servicoDeProdutos.listarTodosOsProdutos();
    }

    /**
     * API para buscar um único produto pelo ID (Acessado via método GET com ID).
     */
    @GetMapping("/{id}")
    public ResponseEntity<Produto> obterProdutoUnico(@PathVariable Long id) {
        Optional<Produto> produto = servicoDeProdutos.buscarProdutoPorId(id);
        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        } else {
            return ResponseEntity.notFound().build(); // Retorna erro 404 se não achar
        }
    }

    /**
     * API para cadastrar um novo produto (Acessado via método POST).
     * O celular vai usar essa rota na tela "Adicionar Produto".
     */
    @PostMapping
    public Produto cadastrarNovoProduto(@RequestBody Produto produto) {
        return servicoDeProdutos.salvarProduto(produto);
    }

    /**
     * API para excluir um produto (Acessado via método DELETE).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerProduto(@PathVariable Long id) {
        servicoDeProdutos.excluirProduto(id);
        return ResponseEntity.noContent().build();
    }
}
