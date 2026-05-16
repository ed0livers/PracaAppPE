import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { API_URL } from '@/constants/api'; // Importamos a URL do servidor

/**
 * TelaDeEstoque (EstoqueScreen)
 * 
 * Apresenta a listagem de todos os produtos buscando diretamente do nosso Banco de Dados MySQL
 * utilizando o backend Spring Boot.
 */
export default function TelaDeEstoque() {
  // Variáveis de estado
  const [produtos, setProdutos] = useState([]); // Lista de produtos vinda da API
  const [carregando, setCarregando] = useState(true); // Controla se mostramos a bolinha de loading

  // O "useEffect" roda um pedaço de código sozinho toda vez que a tela é carregada
  useEffect(() => {
    buscarProdutosNaAPI();
  }, []);

  const buscarProdutosNaAPI = async () => {
    try {
      const resposta = await fetch(`${API_URL}/produtos`);
      const dadosDoBanco = await resposta.json();
      setProdutos(dadosDoBanco); // Atualiza a tela com os dados reais
    } catch (erro) {
      console.error('Falha ao buscar produtos:', erro);
    } finally {
      setCarregando(false); // Esconde a bolinha de carregamento
    }
  };

  return (
    <View style={estilos.container}>
      {/* Campo de pesquisa de produtos */}
      <View style={estilos.containerDePesquisa}>
        <Ionicons name="search" size={20} color="#888" style={estilos.iconePesquisa} />
        <TextInput 
          style={estilos.campoDePesquisa}
          placeholder="Buscar produtos..."
          placeholderTextColor="#888"
        />
      </View>

      {/* Se estiver carregando, mostra uma animação. Se não, mostra a lista. */}
      {carregando ? (
        <ActivityIndicator size="large" color="#208AEF" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={produtos} // Usando a lista real baixada do servidor
          keyExtractor={(produto) => produto.id.toString()} // O ID do banco de dados
          contentContainerStyle={estilos.estiloLista}
          
          // A função "renderItem" diz como CADA produto da lista deve ser desenhado na tela
          renderItem={({ item }) => (
            <View style={estilos.cartaoDoProduto}>
              <View style={estilos.informacoesDoProduto}>
                <Text style={estilos.nomeDoProduto}>{item.nome}</Text>
                <Text style={estilos.categoriaDoProduto}>{item.categoria || 'Sem categoria'}</Text>
                <Text style={estilos.precoDoProduto}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
              </View>
              
              <View style={estilos.containerDeEstoque}>
                <View style={[estilos.crachaDeEstoque, { backgroundColor: item.estoque > 10 ? '#e6f7ff' : '#fff1f0' }]}>
                  <Text style={[estilos.textoDoEstoque, { color: item.estoque > 10 ? '#0099ff' : '#cf1322' }]}>
                    {item.estoque} un
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* Botão flutuante fixado no canto da tela para acionar a tela de cadastro */}
      <TouchableOpacity style={estilos.botaoFlutuante} onPress={() => router.push('/adicionar-produto')}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  containerDePesquisa: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  iconePesquisa: { marginRight: 8 },
  campoDePesquisa: { flex: 1, paddingVertical: 12, fontSize: 16 },
  estiloLista: { padding: 16, paddingTop: 0 },
  cartaoDoProduto: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  informacoesDoProduto: { flex: 1 },
  nomeDoProduto: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  categoriaDoProduto: { fontSize: 13, color: '#888', marginTop: 2 },
  precoDoProduto: { fontSize: 15, fontWeight: '600', color: '#208AEF', marginTop: 8 },
  containerDeEstoque: { justifyContent: 'center', alignItems: 'flex-end' },
  crachaDeEstoque: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  textoDoEstoque: { fontSize: 14, fontWeight: 'bold' },
  botaoFlutuante: { position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#208AEF', justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
});
