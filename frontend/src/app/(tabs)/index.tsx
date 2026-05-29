import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usarAutenticacao } from '@/context/AuthContext';
import { URL_API } from '@/constants/api';

export default function TelaPainelPrincipal() {
  const { usuario } = usarAutenticacao();
  const [vendas, setVendas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Recarrega o painel toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      buscarDadosFinanceiros();
    }, [])
  );

  const buscarDadosFinanceiros = async () => {
    try {
      const resposta = await fetch(`${URL_API}/vendas`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setVendas(dados);
      }
    } catch (erro) {
      console.error('Falha ao buscar faturamento no dashboard:', erro);
    } finally {
      setCarregando(false);
    }
  };

  // Retorna a string local no formato YYYY-MM-DD
  const obterDataHojeString = () => {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const hojeStr = obterDataHojeString();
  const vendasHoje = vendas.filter(v => v.dataDaVenda && v.dataDaVenda.startsWith(hojeStr));
  
  const faturamentoHoje = vendasHoje.reduce((soma, v) => soma + v.valorTotal, 0);
  const quantidadePedidosHoje = vendasHoje.length;

  // Pega as últimas 3 vendas ordenadas por id / data decrescente
  const ultimasVendas = [...vendas]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  const formatarHora = (dataIso: string) => {
    try {
      const partes = dataIso.split('T');
      if (partes.length > 1) {
        return partes[1].substring(0, 5); // Retorna HH:MM
      }
    } catch (e) {}
    return '';
  };

  const formatarDescricaoItens = (venda: any) => {
    if (!venda.itens || venda.itens.length === 0) return 'Venda sem itens';
    return venda.itens
      .map((item: any) => `${item.quantidade}x ${item.produto ? item.produto.nome : 'Produto'}`)
      .join(', ');
  };

  return (
    <ScrollView style={estilos.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho de boas-vindas */}
      <View style={estilos.cabecalhoBoasVindas}>
        <Text style={estilos.saudacao}>Olá, {usuario?.nome || 'Vendedor'}!</Text>
        <Text style={estilos.dataAtual}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </View>

      {/* Cartões de resumo financeiro com dados dinâmicos */}
      {carregando ? (
        <ActivityIndicator size="small" color="#208AEF" style={{ marginVertical: 20 }} />
      ) : (
        <View style={estilos.containerDeResumo}>
          <View style={[estilos.cartaoResumo, { backgroundColor: '#e6f7ff' }]}>
            <Ionicons name="cash-outline" size={32} color="#0099ff" />
            <Text style={estilos.tituloCartao}>Vendas Hoje</Text>
            <Text style={estilos.valorCartao}>R$ {faturamentoHoje.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={[estilos.cartaoResumo, { backgroundColor: '#f6ffed' }]}>
            <Ionicons name="cart-outline" size={32} color="#52c41a" />
            <Text style={estilos.tituloCartao}>Pedidos</Text>
            <Text style={estilos.valorCartao}>{quantidadePedidosHoje}</Text>
          </View>
        </View>
      )}

      {/* Botões de atalho rápido */}
      <View style={estilos.secaoAcoesRapidas}>
        <Text style={estilos.tituloDaSecao}>Ações Rápidas</Text>
        <View style={estilos.gradeDeAcoes}>
          <TouchableOpacity style={estilos.botaoAcao} onPress={() => router.push('/(tabs)/vendas')}>
            <View style={[estilos.caixaDoIcone, { backgroundColor: '#e6f2ff' }]}>
              <Ionicons name="add-circle" size={28} color="#208AEF" />
            </View>
            <Text style={estilos.textoDaAcao}>Nova Venda</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={estilos.botaoAcao} onPress={() => router.push('/adicionar-produto')}>
            <View style={[estilos.caixaDoIcone, { backgroundColor: '#f0f5ff' }]}>
              <Ionicons name="cube" size={28} color="#5c8aeb" />
            </View>
            <Text style={estilos.textoDaAcao}>Novo Produto</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Lista das últimas vendas */}
      <View style={estilos.secaoUltimasVendas}>
        <Text style={estilos.tituloDaSecao}>Últimas Vendas</Text>
        
        {carregando ? (
          <ActivityIndicator size="small" color="#208AEF" />
        ) : ultimasVendas.length === 0 ? (
          <View style={[estilos.itemDeVenda, { justifyContent: 'center' }]}>
            <Text style={{ color: '#888', fontStyle: 'italic', paddingVertical: 10 }}>
              Nenhuma venda registrada ainda.
            </Text>
          </View>
        ) : (
          ultimasVendas.map((venda) => (
            <View key={venda.id} style={estilos.itemDeVenda}>
              <View style={estilos.informacoesDaVenda}>
                <Text style={estilos.produtoVendido} numberOfLines={1}>
                  {formatarDescricaoItens(venda)}
                </Text>
                <Text style={estilos.horarioVenda}>
                  Pedido #{venda.id} • às {formatarHora(venda.dataDaVenda)}
                </Text>
              </View>
              <Text style={estilos.precoVenda}>
                R$ {venda.valorTotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  cabecalhoBoasVindas: { padding: 20, paddingTop: 10 },
  saudacao: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  dataAtual: { fontSize: 14, color: '#666', marginTop: 4, textTransform: 'capitalize' },
  containerDeResumo: { flexDirection: 'row', paddingHorizontal: 20, gap: 16 },
  cartaoResumo: { flex: 1, padding: 16, borderRadius: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  tituloCartao: { fontSize: 14, color: '#555', marginTop: 8 },
  valorCartao: { fontSize: 22, fontWeight: 'bold', color: '#111', marginTop: 4 },
  secaoAcoesRapidas: { padding: 20 },
  tituloDaSecao: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  gradeDeAcoes: { flexDirection: 'row', gap: 16 },
  botaoAcao: { alignItems: 'center', flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 16 },
  caixaDoIcone: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  textoDaAcao: { fontSize: 14, fontWeight: '600', color: '#444' },
  secaoUltimasVendas: { padding: 20, paddingTop: 0 },
  itemDeVenda: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  informacoesDaVenda: { flex: 1, marginRight: 8 },
  produtoVendido: { fontSize: 16, fontWeight: '500', color: '#333' },
  horarioVenda: { fontSize: 13, color: '#888', marginTop: 4 },
  precoVenda: { fontSize: 16, fontWeight: 'bold', color: '#208AEF' },
});
