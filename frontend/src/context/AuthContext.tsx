import React, { createContext, useState, useContext } from 'react';

// Criamos o contexto que vai armazenar os dados do vendedor "globalmente" no app
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado que guarda as informações do vendedor logado
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    foto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Foto padrão genérica
  });

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso nas telas
export function useAuth() {
  return useContext(AuthContext);
}
