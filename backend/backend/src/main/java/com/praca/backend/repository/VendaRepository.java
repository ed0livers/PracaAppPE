package com.praca.backend.repository;

import com.praca.backend.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositório de Vendas (VendaRepository)
 * Permite buscar e salvar as vendas finalizadas no banco de dados.
 */
@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {
}
