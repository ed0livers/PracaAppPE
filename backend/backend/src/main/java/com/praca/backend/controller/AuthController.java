package com.praca.backend.controller;

import com.praca.backend.model.Usuario;
import com.praca.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controlador de Autenticação (AuthController)
 * EndPoints focados no Login e Cadastro do vendedor.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService servicoDeUsuarios;

    /**
     * Rota de Cadastro. (Acessado via POST)
     */
    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario novoUsuario) {
        Usuario usuarioSalvo = servicoDeUsuarios.cadastrarUsuario(novoUsuario);
        return ResponseEntity.ok(usuarioSalvo);
    }

    /**
     * Rota de Login. (Acessado via POST)
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dadosDoLogin) {
        String email = dadosDoLogin.get("email");
        String senha = dadosDoLogin.get("senha");

        Usuario usuarioLogado = servicoDeUsuarios.realizarLogin(email, senha);

        if (usuarioLogado != null) {
            return ResponseEntity.ok(usuarioLogado); // Retorna o objeto (nome, email, etc) pro aplicativo!
        } else {
            return ResponseEntity.status(401).body("E-mail ou senha incorretos.");
        }
    }
}
