package com.praca.backend.controller;

import com.praca.backend.model.Venda;
import com.praca.backend.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador de Vendas (VendaController)
 * Cria os acessos (EndPoints) da API focados no fechamento de pedidos (Carrinho).
 */
@RestController
@RequestMapping("/api/vendas")
@CrossOrigin(origins = "*")
public class VendaController {

    @Autowired
    private VendaService servicoDeVendas;

    /**
     * API para histórico (Acessado via GET).
     * O celular vai usar essa rota na tela "Financeiro" ou "Histórico".
     */
    @GetMapping
    public List<Venda> obterListaDeVendas() {
        return servicoDeVendas.listarTodasAsVendas();
    }

    /**
     * API para Finalizar o Pedido do Carrinho (Acessado via POST).
     * O celular envia o carrinho e o backend diminui o estoque automaticamente.
     */
    @PostMapping
    public Venda registrarNovaVenda(@RequestBody Venda venda) {
        return servicoDeVendas.realizarVenda(venda);
    }
}
