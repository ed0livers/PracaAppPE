package com.praca.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Entidade Venda
 * Representa o comprovante/recibo final de uma transação.
 */
@Entity
@Table(name = "vendas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime dataDaVenda;

    @Column(nullable = false)
    private Double valorTotal;

    // Relacionamento Um-para-Muitos: Uma venda possui vários Itens (Carrinho)
    // Cascade = Se salvar a Venda, já salva automaticamente todos os Itens dentro dela
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "venda")
    private List<ItemVenda> itens;
}
