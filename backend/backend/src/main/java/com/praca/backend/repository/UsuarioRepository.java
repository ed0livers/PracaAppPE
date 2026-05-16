package com.praca.backend.repository;

import com.praca.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositório de Usuários (UsuarioRepository)
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // O Spring cria essa função automaticamente baseando-se no nome "findByEmail"
    Optional<Usuario> findByEmail(String email);
}
