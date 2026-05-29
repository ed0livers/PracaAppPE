import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { URL_API } from '@/constants/api';

interface ItemCarrinho {
  produtoId: number;
  nome: string;
  categoria: string;
  precoUnitario: number;
  quantidade: number;
  estoqueDisponivel: number;
}

export default function TelaDeVendas() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<any[]>([]);
  const [pesquisaProduto, setPesquisaProduto] = useState('');
  const [modalSelecaoVisivel, setModalSelecaoVisivel] = useState(false);
  const [carregandoProdutos, setCarregandoProdutos] = useState(false);
  const [finalizandoVenda, setFinalizandoVenda] = useState(false);

  // Busca produtos disponíveis no backend ao focar na tela de vendas
  useFocusEffect(
    useCallback(() => {
      carregarProdutosDoBackend();
    }, [])
  );

  const carregarProdutosDoBackend = async () => {
    setCarregandoProdutos(true);
    try {
      const resposta = await fetch(`${URL_API}/produtos`);
      if (resposta.ok) {
        const dados = await resposta.json();
        // Filtra apenas produtos que têm pelo menos 1 unidade em estoque
        setProdutosDisponiveis(dados);
      }
    } catch (erro) {
      console.error('Erro ao carregar produtos para venda:', erro);
    } finally {
      setCarregandoProdutos(false);
    }
  };

  // Adiciona um produto ao carrinho
  const adicionarAoCarrinho = (produto: any) => {
    if (produto.estoque <= 0) {
      Alert.alert('Produto sem estoque', 'Este produto não possui unidades em estoque.');
      return;
    }

    const itemExistente = carrinho.find(item => item.produtoId === produto.id);

    if (itemExistente) {
      if (itemExistente.quantidade >= produto.estoque) {
        Alert.alert('Limite atingido', `Só existem ${produto.estoque} unidades disponíveis deste produto.`);
        return;
      }
      setCarrinho(carrinho.map(item => 
        item.produtoId === produto.id 
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setCarrinho([...carrinho, {
        produtoId: produto.id,
        nome: produto.nome,
        categoria: produto.categoria,
        precoUnitario: produto.preco,
        quantidade: 1,
        estoqueDisponivel: produto.estoque
      }]);
    }
  };

  // Remove ou diminui a quantidade de um item no carrinho
  const alterarQuantidade = (produtoId: number, operacao: 'aumentar' | 'diminuir') => {
    const item = carrinho.find(i => i.produtoId === produtoId);
    if (!item) return;

    if (operacao === 'diminuir') {
      if (item.quantidade === 1) {
        // Se a quantidade for 1, remove do carrinho
        setCarrinho(carrinho.filter(i => i.produtoId !== produtoId));
      } else {
        setCarrinho(carrinho.map(i => 
          i.produtoId === produtoId ? { ...i, quantidade: i.quantidade - 1 } : i
        ));
      }
    } else if (operacao === 'aumentar') {
      if (item.quantidade >= item.estoqueDisponivel) {
        Alert.alert('Estoque insuficiente', `Apenas ${item.estoqueDisponivel} unidades disponíveis em estoque.`);
        return;
      }
      setCarrinho(carrinho.map(i => 
        i.produtoId === produtoId ? { ...i, quantidade: i.quantidade + 1 } : i
      ));
    }
  };

  // Remove completamente um produto do carrinho
  const removerDoCarrinho = (produtoId: number) => {
    setCarrinho(carrinho.filter(i => i.produtoId !== produtoId));
  };

  // Calcula o valor total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((soma, item) => soma + (item.precoUnitario * item.quantidade), 0);
  };

  // Finaliza a venda enviando a transação para o backend
  const finalizarPedido = async () => {
    if (carrinho.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione pelo menos um produto para finalizar a venda.');
      return;
    }

    setFinalizandoVenda(true);
    try {
      // Monta o payload estruturado como a entidade Venda do backend exige
      const payloadVenda = {
        itens: carrinho.map(item => ({
          produto: { id: item.produtoId },
          quantidade: item.quantidade
        }))
      };

      const resposta = await fetch(`${URL_API}/vendas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadVenda)
      });

      if (resposta.ok) {
        Alert.alert('Sucesso!', 'Venda registrada e estoque atualizado com sucesso!');
        setCarrinho([]); // Limpa o carrinho
        carregarProdutosDoBackend(); // Recarrega o estoque dos produtos
      } else {
        const textoErro = await resposta.text();
        Alert.alert('Erro ao finalizar', textoErro || 'Não foi possível finalizar a venda.');
      }
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor backend.');
    } finally {
      setFinalizandoVenda(false);
    }
  };

  // Filtra produtos na busca do modal
  const produtosFiltrados = produtosDisponiveis.filter(p => {
    const termo = pesquisaProduto.toLowerCase();
    const nomeMatch = p.nome ? p.nome.toLowerCase().includes(termo) : false;
    const categoriaMatch = p.categoria ? p.categoria.toLowerCase().includes(termo) : false;
    return nomeMatch || categoriaMatch;
  });

  return (
    <View style={estilos.container}>
      {/* Botão de adicionar itens */}
      <TouchableOpacity 
        style={estilos.botaoAdicionarItem} 
        onPress={() => {
          carregarProdutosDoBackend();
          setModalSelecaoVisivel(true);
        }}
      >
        <Ionicons name="add-circle-outline" size={24} color="#208AEF" />
        <Text style={estilos.textoBotaoAdicionarItem}>Adicionar Produtos ao Carrinho</Text>
      </TouchableOpacity>

      {/* Lista de itens no carrinho */}
      {carrinho.length === 0 ? (
        <View style={estilos.estadoVazio}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text style={estilos.tituloEstadoVazio}>Carrinho Vazio</Text>
          <Text style={estilos.textoEstadoVazio}>Adicione produtos clicando no botão acima para iniciar uma venda</Text>
        </View>
      ) : (
        <FlatList
          data={carrinho}
          keyExtractor={(item) => item.produtoId.toString()}
          contentContainerStyle={estilos.listaCarrinho}
          renderItem={({ item }) => (
            <View style={estilos.itemCarrinhoCard}>
              <View style={estilos.itemInfo}>
                <Text style={estilos.itemNome}>{item.nome}</Text>
                <Text style={estilos.itemCategoria}>{item.categoria || 'Sem categoria'}</Text>
                <Text style={estilos.itemPrecoUnitario}>R$ {item.precoUnitario.toFixed(2).replace('.', ',')} un</Text>
              </View>

              <View style={estilos.controlesQuantidade}>
                <TouchableOpacity 
                  style={estilos.botaoQtd} 
                  onPress={() => alterarQuantidade(item.produtoId, 'diminuir')}
                >
                  <Ionicons name="remove" size={16} color="#555" />
                </TouchableOpacity>
                <Text style={estilos.qtdTexto}>{item.quantidade}</Text>
                <TouchableOpacity 
                  style={estilos.botaoQtd} 
                  onPress={() => alterarQuantidade(item.produtoId, 'aumentar')}
                >
                  <Ionicons name="add" size={16} color="#555" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={estilos.botaoRemover} 
                  onPress={() => removerDoCarrinho(item.produtoId)}
                >
                  <Ionicons name="trash-outline" size={20} color="#cf1322" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Rodapé fixo na base da tela mostrando o somatório e o botão de confirmar a venda */}
      <View style={estilos.rodapeFixo}>
        <View style={estilos.linhaDoTotal}>
          <Text style={estilos.textoTotalRotulo}>Total:</Text>
          <Text style={estilos.textoTotalValor}>R$ {calcularTotal().toFixed(2).replace('.', ',')}</Text>
        </View>
        <TouchableOpacity 
          style={[estilos.botaoFinalizarVenda, carrinho.length === 0 && estilos.botaoFinalizarDesabilitado]} 
          onPress={finalizarPedido}
          disabled={finalizandoVenda || carrinho.length === 0}
        >
          {finalizandoVenda ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={estilos.textoBotaoFinalizar}>Finalizar Venda</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal de Seleção de Produtos */}
      <Modal
        visible={modalSelecaoVisivel}
        animationType="slide"
        onRequestClose={() => setModalSelecaoVisivel(false)}
      >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalCabecalho}>
            <Text style={estilos.modalTitulo}>Selecionar Produtos</Text>
            <TouchableOpacity 
              onPress={() => {
                setPesquisaProduto('');
                setModalSelecaoVisivel(false);
              }}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={estilos.modalPesquisaContainer}>
            <Ionicons name="search" size={20} color="#888" style={estilos.iconePesquisa} />
            <TextInput 
              style={estilos.campoDePesquisa}
              placeholder="Buscar por nome ou categoria..."
              placeholderTextColor="#888"
              value={pesquisaProduto}
              onChangeText={setPesquisaProduto}
            />
          </View>

          {carregandoProdutos ? (
            <ActivityIndicator size="large" color="#208AEF" style={{ marginTop: 50 }} />
          ) : (
            <FlatList
              data={produtosFiltrados}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={estilos.modalLista}
              ListEmptyComponent={
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  <Ionicons name="cube-outline" size={48} color="#ccc" />
                  <Text style={{ color: '#888', marginTop: 12 }}>Nenhum produto em estoque</Text>
                </View>
              }
              renderItem={({ item }) => {
                const itemNoCarrinho = carrinho.find(c => c.produtoId === item.id);
                const qtdNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
                const esgotado = item.estoque <= 0;

                return (
                  <View style={[estilos.modalProdutoCard, esgotado && { opacity: 0.5 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={estilos.modalProdutoNome}>{item.nome}</Text>
                      <Text style={estilos.modalProdutoInfo}>
                        {item.categoria || 'Sem Categoria'} • Estoque: {item.estoque} un
                      </Text>
                      <Text style={estilos.modalProdutoPreco}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
                    </View>

                    <TouchableOpacity 
                      style={[
                        estilos.modalBotaoAdicionar, 
                        esgotado && { backgroundColor: '#ccc' },
                        qtdNoCarrinho > 0 && !esgotado && { backgroundColor: '#e6f7ff', borderColor: '#208AEF', borderWidth: 1 }
                      ]} 
                      onPress={() => adicionarAoCarrinho(item)}
                      disabled={esgotado}
                    >
                      {qtdNoCarrinho > 0 ? (
                        <Text style={{ color: '#208AEF', fontWeight: 'bold' }}>{qtdNoCarrinho} no carrinho</Text>
                      ) : (
                        <Text style={estilos.modalBotaoAdicionarTexto}>
                          {esgotado ? 'Esgotado' : 'Adicionar'}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}

          <TouchableOpacity 
            style={estilos.modalBotaoFechar} 
            onPress={() => {
              setPesquisaProduto('');
              setModalSelecaoVisivel(false);
            }}
          >
            <Text style={estilos.modalBotaoFecharTexto}>Ver Carrinho ({carrinho.length})</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  botaoAdicionarItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', margin: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee', gap: 8 },
  textoBotaoAdicionarItem: { fontSize: 16, fontWeight: '600', color: '#208AEF' },
  estadoVazio: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40, paddingHorizontal: 40 },
  tituloEstadoVazio: { fontSize: 20, fontWeight: 'bold', color: '#555', marginTop: 16 },
  textoEstadoVazio: { fontSize: 15, color: '#888', marginTop: 8, textAlign: 'center' },
  listaCarrinho: { padding: 16, paddingTop: 0 },
  itemCarrinhoCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  itemInfo: { flex: 1 },
  itemNome: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemCategoria: { fontSize: 13, color: '#888', marginTop: 2 },
  itemPrecoUnitario: { fontSize: 15, fontWeight: '600', color: '#208AEF', marginTop: 6 },
  controlesQuantidade: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  botaoQtd: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  qtdTexto: { fontSize: 16, fontWeight: 'bold', minWidth: 24, textAlign: 'center' },
  botaoRemover: { marginLeft: 8, padding: 4 },
  rodapeFixo: { backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingBottom: 30 },
  linhaDoTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  textoTotalRotulo: { fontSize: 18, fontWeight: '500', color: '#555' },
  textoTotalValor: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  botaoFinalizarVenda: { backgroundColor: '#208AEF', padding: 16, borderRadius: 12, alignItems: 'center' },
  botaoFinalizarDesabilitado: { backgroundColor: '#a9d4fa' },
  textoBotaoFinalizar: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  
  // Estilos do Modal
  modalContainer: { flex: 1, backgroundColor: '#f8f9fa' },
  modalCabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  modalPesquisaContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  iconePesquisa: { marginRight: 8 },
  campoDePesquisa: { flex: 1, paddingVertical: 12, fontSize: 16 },
  modalLista: { padding: 16, paddingTop: 0 },
  modalProdutoCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  modalProdutoNome: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  modalProdutoInfo: { fontSize: 13, color: '#888', marginTop: 2 },
  modalProdutoPreco: { fontSize: 15, fontWeight: '600', color: '#208AEF', marginTop: 6 },
  modalBotaoAdicionar: { backgroundColor: '#208AEF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  modalBotaoAdicionarTexto: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  modalBotaoFechar: { backgroundColor: '#208AEF', margin: 16, padding: 16, borderRadius: 12, alignItems: 'center', elevation: 2 },
  modalBotaoFecharTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
