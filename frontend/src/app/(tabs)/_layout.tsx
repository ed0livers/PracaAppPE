import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * LayoutDasAbas (TabLayout)
 * 
 * Esta tela configura a barra de navegação inferior (Bottom Tabs).
 * Cada aba (Tabs.Screen) representa uma página diferente acessível no menu inferior.
 */
export default function LayoutDasAbas() {
  // Verifica se o usuário prefere tema escuro ou claro
  const esquemaDeCores = useColorScheme();
  const temaEscuroAtivado = esquemaDeCores === 'dark';

  return (
    // Componente Tabs configura a barra inferior e seu comportamento geral
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#208AEF', // Cor do ícone quando a aba estiver selecionada
      tabBarInactiveTintColor: temaEscuroAtivado ? '#888' : '#666', // Cor do ícone quando não estiver selecionada
      tabBarStyle: { backgroundColor: temaEscuroAtivado ? '#111' : '#fff', borderTopColor: temaEscuroAtivado ? '#222' : '#eee' },
      headerStyle: { backgroundColor: temaEscuroAtivado ? '#111' : '#fff' }, // Cor da barra de título (cabeçalho)
      headerTintColor: temaEscuroAtivado ? '#fff' : '#000', // Cor do texto no cabeçalho
    }}>
      
      {/* Aba de Início (Dashboard) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          // Função que renderiza o ícone da aba usando a biblioteca nativa Ionicons
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      
      {/* Aba de Vendas (Carrinho) */}
      <Tabs.Screen
        name="vendas"
        options={{
          title: 'Vendas',
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
        }}
      />
      
      {/* Aba de Estoque (Lista de Produtos) */}
      <Tabs.Screen
        name="estoque"
        options={{
          title: 'Estoque',
          tabBarIcon: ({ color }) => <Ionicons name="cube" size={24} color={color} />,
        }}
      />
      
      {/* Aba do Financeiro (Relatórios) */}
      <Tabs.Screen
        name="financeiro"
        options={{
          title: 'Finanças',
          tabBarIcon: ({ color }) => <Ionicons name="cash" size={24} color={color} />,
        }}
      />
      
      {/* Aba de Configurações (Perfil e Ajustes) */}
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
