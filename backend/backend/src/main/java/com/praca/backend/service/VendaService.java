package com.praca.backend.service;

import com.praca.backend.model.ItemVenda;
import com.praca.backend.model.Produto;
import com.praca.backend.model.Venda;
import com.praca.backend.repository.ProdutoRepository;
import com.praca.backend.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Serviço de Vendas (VendaService)
 * Contém a lógica complexa de verificar estoque e calcular totais na hora de vender.
 */
@Service
public class VendaService {

    @Autowired
    private VendaRepository repositorioDeVendas;

    @Autowired
    private ProdutoRepository repositorioDeProdutos;

    public List<Venda> listarTodasAsVendas() {
        return repositorioDeVendas.findAll();
    }

    /**
     * @Transactional assegura que, se der erro no meio da venda, nada é salvo no banco.
     */
    @Transactional
    public Venda realizarVenda(Venda venda) {
        // 1. Marca a data e hora atual do momento em que a venda foi finalizada
        venda.setDataDaVenda(LocalDateTime.now());
        double totalDaVenda = 0.0;

        // 2. Se a venda possuir itens no carrinho, vamos checá-los um por um
        if (venda.getItens() != null) {
            for (ItemVenda item : venda.getItens()) {
                // Relaciona o item à venda pai
                item.setVenda(venda);
                
                // 3. Procura o produto no banco pelo ID enviado pelo aplicativo
                Produto produto = repositorioDeProdutos.findById(item.getProduto().getId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado no banco"));
                
                // 4. Copia o preço real do banco para não haver fraudes
                item.setPrecoUnitario(produto.getPreco());
                totalDaVenda += (item.getPrecoUnitario() * item.getQuantidade());

                // 5. Verifica se há estoque suficiente
                if (produto.getEstoque() < item.getQuantidade()) {
                    throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
                }
                
                // 6. Deduz a quantidade comprada do estoque atual e salva a nova quantidade
                produto.setEstoque(produto.getEstoque() - item.getQuantidade());
                repositorioDeProdutos.save(produto);
            }
        }
        
        // 7. Define o valor calculado total e salva a venda e seus itens no banco
        venda.setValorTotal(totalDaVenda);
        return repositorioDeVendas.save(venda);
    }
}
