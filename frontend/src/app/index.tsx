import { Redirect } from 'expo-router';

/**
 * TelaInicial (Index)
 * 
 * Este arquivo é o primeiro a ser carregado quando o aplicativo abre.
 * A única função dele é redirecionar automaticamente o usuário para a tela de login.
 * No futuro, pode ser configurado para verificar se o usuário já está logado e mandar direto para a aba inicial.
 */
export default function TelaInicial() {
  // O componente Redirect força a mudança de rota imediatamente
  return <Redirect href="/login" />;
}