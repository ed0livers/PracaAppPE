import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import * as ImagePicker from 'expo-image-picker'; // Biblioteca para acessar Câmera e Galeria

/**
 * TelaDeConfiguracoes (ConfigsScreen)
 */
export default function TelaDeConfiguracoes() {
  const { usuario, setUsuario } = useAuth();
  
  const [isEditando, setIsEditando] = useState(false);
  const [novaUrlFoto, setNovaUrlFoto] = useState('');

  /**
   * Função para acessar a Galeria de Fotos do celular
   */
  const escolherDaGaleria = async () => {
    // 1. Pede permissão para ler a galeria
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissao.granted === false) {
      Alert.alert('Permissão Negada', 'Você precisa dar acesso à galeria para escolher uma foto.');
      return;
    }

    // 2. Abre a galeria limitando apenas a Imagens
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite cortar a foto
      aspect: [1, 1], // Força um corte quadrado (1:1)
      quality: 0.5, // Reduz um pouco a qualidade para o app ficar mais rápido
    });

    // 3. Se a pessoa escolheu a foto e não cancelou, salva no perfil
    if (!resultado.canceled) {
      setUsuario({ ...usuario, foto: resultado.assets[0].uri });
      setIsEditando(false); // Fecha o menu de edição
    }
  };

  /**
   * Função para abrir a Câmera do celular e tirar uma foto na hora
   */
  const tirarFoto = async () => {
    // 1. Pede permissão para usar a câmera
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissao.granted === false) {
      Alert.alert('Permissão Negada', 'Precisamos de acesso à sua câmera para tirar uma foto.');
      return;
    }

    // 2. Abre a câmera nativa do celular
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    // 3. Salva a foto tirada
    if (!resultado.canceled) {
      setUsuario({ ...usuario, foto: resultado.assets[0].uri });
      setIsEditando(false);
    }
  };

  /**
   * Opção manual caso a pessoa prefira apenas colar um link da internet
   */
  const salvarLinkDeFoto = () => {
    if (novaUrlFoto.trim() !== '') {
      setUsuario({ ...usuario, foto: novaUrlFoto });
    }
    setIsEditando(false);
    setNovaUrlFoto('');
  };

  const realizarLogout = () => {
    router.replace('/login');
  };

  return (
    // Adicionado ScrollView para não cortar a tela caso as opções fiquem grandes
    <ScrollView style={estilos.container} showsVerticalScrollIndicator={false}>
      
      {/* Bloco superior com a foto e dados reais */}
      <View style={estilos.secaoDoPerfil}>
        <View style={estilos.avatarContainer}>
          <Image source={{ uri: usuario?.foto }} style={estilos.imagemAvatar} />
        </View>
        
        <Text style={estilos.nomeUsuario}>{usuario?.nome || 'Vendedor'}</Text>
        <Text style={estilos.emailUsuario}>{usuario?.email || 'email@exemplo.com'}</Text>

        {/* Menu de Troca de Foto */}
        {isEditando && (
          <View style={estilos.areaDeEdicao}>
            <Text style={estilos.tituloEdicao}>Escolha de onde importar a foto</Text>
            
            {/* Botões Nativos do Celular */}
            <View style={estilos.botoesDeMidia}>
              <TouchableOpacity style={estilos.botaoMidia} onPress={tirarFoto}>
                <Ionicons name="camera" size={28} color="#208AEF" />
                <Text style={estilos.textoBotaoMidia}>Tirar Foto</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={estilos.botaoMidia} onPress={escolherDaGaleria}>
                <Ionicons name="images" size={28} color="#208AEF" />
                <Text style={estilos.textoBotaoMidia}>Da Galeria</Text>
              </TouchableOpacity>
            </View>

            <Text style={estilos.textoOu}>--- ou cole um link ---</Text>

            {/* Alternativa por Link */}
            <TextInput 
              style={estilos.campoDeLink} 
              placeholder="http://site.com/foto.png"
              value={novaUrlFoto}
              onChangeText={setNovaUrlFoto}
            />
            <TouchableOpacity style={estilos.botaoSalvarFoto} onPress={salvarLinkDeFoto}>
              <Text style={estilos.textoBotaoSalvar}>Salvar Link</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Lista de opções do menu */}
      <View style={estilos.menuDeOpcoes}>
        
        <TouchableOpacity style={estilos.itemDeMenu} onPress={() => setIsEditando(!isEditando)}>
          <Ionicons name="person-outline" size={24} color="#555" />
          <Text style={estilos.textoDoMenu}>Editar Perfil (Trocar Foto)</Text>
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

        {/* Botão destrutivo (Logout) */}
        <TouchableOpacity style={[estilos.itemDeMenu, estilos.itemDeSair]} onPress={realizarLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ff4d4f" />
          <Text style={estilos.textoDeSair}>Sair da Conta</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  secaoDoPerfil: { alignItems: 'center', padding: 32, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e6f2ff', justifyContent: 'center', alignItems: 'center', marginBottom: 16, overflow: 'hidden', borderWidth: 2, borderColor: '#208AEF' },
  imagemAvatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  nomeUsuario: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  emailUsuario: { fontSize: 14, color: '#888', marginTop: 4 },
  
  // Estilos da nova área de edição
  areaDeEdicao: { width: '100%', marginTop: 24, padding: 16, backgroundColor: '#f0f5ff', borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#e6f2ff' },
  tituloEdicao: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  botoesDeMidia: { flexDirection: 'row', gap: 16, marginBottom: 16, width: '100%' },
  botaoMidia: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  textoBotaoMidia: { fontSize: 14, fontWeight: '600', color: '#555', marginTop: 8 },
  textoOu: { color: '#888', marginBottom: 16, fontSize: 12 },
  
  campoDeLink: { width: '100%', backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  botaoSalvarFoto: { backgroundColor: '#208AEF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, width: '100%', alignItems: 'center' },
  textoBotaoSalvar: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  menuDeOpcoes: { padding: 20 },
  itemDeMenu: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  textoDoMenu: { flex: 1, fontSize: 16, color: '#333', marginLeft: 16 },
  itemDeSair: { marginTop: 24, backgroundColor: '#fff1f0', borderWidth: 1, borderColor: '#ffccc7' },
  textoDeSair: { flex: 1, fontSize: 16, color: '#ff4d4f', marginLeft: 16, fontWeight: '500' },
});
