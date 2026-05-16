package com.praca.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuração de Segurança (SecurityConfig)
 * Configura como o Spring Security vai proteger a nossa aplicação.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Disponibiliza o BCrypt para a aplicação conseguir embaralhar as senhas.
     */
    @Bean
    public PasswordEncoder codificadorDeSenha() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configura as rotas. Por ser um ambiente de testes/iniciante, 
     * vamos permitir acesso a todas as rotas da API sem bloquear por enquanto,
     * mas deixando a ferramenta de Hash de senhas ativa.
     */
    @Bean
    public SecurityFilterChain configuracaoDeSeguranca(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa proteção CSRF para facilitar testes locais
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // Libera qualquer requisição (ideal para iniciantes testarem as telas primeiro)
            );
            
        return http.build();
    }
}
