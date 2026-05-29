import React, { createContext, useState, useContext } from 'react';

// Criamos o contexto que vai armazenar os dados do vendedor "globalmente" no app
const ContextoAutenticacao = createContext<any>(null);

export function FornecedorAutenticacao({ children }: { children: React.ReactNode }) {
  // Estado que guarda as informações do vendedor logado
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    foto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Foto padrão genérica
  });

  return (
    <ContextoAutenticacao.Provider value={{ usuario, setUsuario }}>
      {children}
    </ContextoAutenticacao.Provider>
  );
}

// Hook personalizado para facilitar o uso nas telas
export function usarAutenticacao() {
  return useContext(ContextoAutenticacao);
}
