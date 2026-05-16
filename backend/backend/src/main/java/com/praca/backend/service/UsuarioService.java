package com.praca.backend.service;

import com.praca.backend.model.Usuario;
import com.praca.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Serviço de Usuários (UsuarioService)
 */
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repositorioDeUsuarios;

    @Autowired
    private PasswordEncoder codificadorDeSenha;

    /**
     * Função para registrar um novo vendedor.
     */
    public Usuario cadastrarUsuario(Usuario usuario) {
        // Antes de salvar, pegamos a senha "123456" e transformamos num Hash gigantesco!
        String senhaEmbaralhada = codificadorDeSenha.encode(usuario.getSenha());
        usuario.setSenha(senhaEmbaralhada);
        
        return repositorioDeUsuarios.save(usuario);
    }

    /**
     * Função que tenta realizar o Login comparando o e-mail e a senha digitada.
     */
    public boolean realizarLogin(String email, String senhaDigitada) {
        // 1. Procura se existe algum usuário com esse e-mail no banco
        Optional<Usuario> usuarioEncontrado = repositorioDeUsuarios.findByEmail(email);

        if (usuarioEncontrado.isPresent()) {
            // 2. Se encontrou o e-mail, usamos o BCrypt para comparar a senha digitada com o Hash gravado no banco
            Usuario usuario = usuarioEncontrado.get();
            return codificadorDeSenha.matches(senhaDigitada, usuario.getSenha());
        }

        // Retorna falso se o e-mail não existir
        return false;
    }
}
