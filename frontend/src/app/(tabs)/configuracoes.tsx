import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

/**
 * TelaDeConfiguracoes (ConfigsScreen)
 * 
 * É a área do perfil de usuário, onde o vendedor pode gerenciar os dados da conta 
 * e realizar operações importantes como desconectar do aplicativo (Logout).
 */
export default function TelaDeConfiguracoes() {
  
  /**
   * Função acionada pelo botão "Sair do App".
   * O "router.replace" desfaz a navegação atual e substitui tudo pela tela de login,
   * impedindo que o usuário volte pressionando a seta do sistema Android/iOS.
   */
  const realizarLogout = () => {
    router.replace('/login');
  };

  return (
    <View style={estilos.container}>
      {/* Bloco superior com a foto e e-mail da pessoa logada */}
      <View style={estilos.secaoDoPerfil}>
        <View style={estilos.avatarUsuario}>
          <Ionicons name="person" size={40} color="#208AEF" />
        </View>
        <Text style={estilos.nomeUsuario}>Vendedor Silva</Text>
        <Text style={estilos.emailUsuario}>vendedor@praca.com</Text>
      </View>

      {/* Lista de opções do menu */}
      <View style={estilos.menuDeOpcoes}>
        
        <TouchableOpacity style={estilos.itemDeMenu}>
          <Ionicons name="person-outline" size={24} color="#555" />
          <Text style={estilos.textoDoMenu}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={estilos.itemDeMenu}>
          <Ionicons name="notifications-outline" size={24} color="#555" />
          <Text style={estilos.textoDoMenu}>Notificações</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemDeMenu}>
          <Ionicons name="help-circle-outline" size={24} color="#555" />
          <Text style={estilos.textoDoMenu}>Ajuda e Suporte</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Botão destrutivo (Logout) - Tem destaque com a cor vermelha para alerta */}
        <TouchableOpacity style={[estilos.itemDeMenu, estilos.itemDeSair]} onPress={realizarLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ff4d4f" />
          <Text style={estilos.textoDeSair}>Sair do App</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  secaoDoPerfil: { alignItems: 'center', padding: 32, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatarUsuario: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e6f2ff', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  nomeUsuario: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  emailUsuario: { fontSize: 14, color: '#888', marginTop: 4 },
  menuDeOpcoes: { padding: 20 },
  itemDeMenu: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  textoDoMenu: { flex: 1, fontSize: 16, color: '#333', marginLeft: 16 },
  itemDeSair: { marginTop: 24, backgroundColor: '#fff1f0', borderWidth: 1, borderColor: '#ffccc7' },
  textoDeSair: { flex: 1, fontSize: 16, color: '#ff4d4f', marginLeft: 16, fontWeight: '500' },
});
