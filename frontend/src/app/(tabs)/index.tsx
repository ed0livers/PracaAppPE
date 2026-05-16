import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * TelaPainelPrincipal (DashboardScreen)
 * 
 * É a primeira tela que o usuário vê após logar.
 * Contém um resumo rápido do dia (vendas e pedidos) e atalhos para ações frequentes.
 * Como o conteúdo pode ultrapassar a tela, utilizamos o "ScrollView" para permitir rolagem.
 */
export default function TelaPainelPrincipal() {
  return (
    <ScrollView style={estilos.container}>
      {/* Cabeçalho de boas-vindas */}
      <View style={estilos.cabecalhoBoasVindas}>
        <Text style={estilos.saudacao}>Olá, Vendedor!</Text>
        <Text style={estilos.dataAtual}>16 de Maio de 2026</Text>
      </View>

      {/* Cartões de resumo financeiro */}
      <View style={estilos.containerDeResumo}>
        <View style={[estilos.cartaoResumo, { backgroundColor: '#e6f7ff' }]}>
          <Ionicons name="cash-outline" size={32} color="#0099ff" />
          <Text style={estilos.tituloCartao}>Vendas Hoje</Text>
          <Text style={estilos.valorCartao}>R$ 450,00</Text>
        </View>
        <View style={[estilos.cartaoResumo, { backgroundColor: '#f6ffed' }]}>
          <Ionicons name="cart-outline" size={32} color="#52c41a" />
          <Text style={estilos.tituloCartao}>Pedidos</Text>
          <Text style={estilos.valorCartao}>12</Text>
        </View>
      </View>

      {/* Botões de atalho rápido */}
      <View style={estilos.secaoAcoesRapidas}>
        <Text style={estilos.tituloDaSecao}>Ações Rápidas</Text>
        <View style={estilos.gradeDeAcoes}>
          {/* O botão navega o usuário direto para a aba de Vendas */}
          <TouchableOpacity style={estilos.botaoAcao} onPress={() => router.push('/(tabs)/vendas')}>
            <View style={[estilos.caixaDoIcone, { backgroundColor: '#e6f2ff' }]}>
              <Ionicons name="add-circle" size={28} color="#208AEF" />
            </View>
            <Text style={estilos.textoDaAcao}>Nova Venda</Text>
          </TouchableOpacity>
          
          {/* O botão navega o usuário para a tela Modal de Adicionar Produto */}
          <TouchableOpacity style={estilos.botaoAcao} onPress={() => router.push('/adicionar-produto')}>
            <View style={[estilos.caixaDoIcone, { backgroundColor: '#f0f5ff' }]}>
              <Ionicons name="cube" size={28} color="#5c8aeb" />
            </View>
            <Text style={estilos.textoDaAcao}>Novo Produto</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Lista das últimas vendas (dados estáticos por enquanto) */}
      <View style={estilos.secaoUltimasVendas}>
        <Text style={estilos.tituloDaSecao}>Últimas Vendas</Text>
        <View style={estilos.itemDeVenda}>
          <View style={estilos.informacoesDaVenda}>
            <Text style={estilos.produtoVendido}>2x Camiseta Básica</Text>
            <Text style={estilos.horarioVenda}>14:30</Text>
          </View>
          <Text style={estilos.precoVenda}>R$ 70,00</Text>
        </View>
        <View style={estilos.itemDeVenda}>
          <View style={estilos.informacoesDaVenda}>
            <Text style={estilos.produtoVendido}>1x Calça Jeans</Text>
            <Text style={estilos.horarioVenda}>13:15</Text>
          </View>
          <Text style={estilos.precoVenda}>R$ 120,00</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  cabecalhoBoasVindas: { padding: 20, paddingTop: 10 },
  saudacao: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  dataAtual: { fontSize: 14, color: '#666', marginTop: 4 },
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
  informacoesDaVenda: { flex: 1 },
  produtoVendido: { fontSize: 16, fontWeight: '500', color: '#333' },
  horarioVenda: { fontSize: 13, color: '#888', marginTop: 4 },
  precoVenda: { fontSize: 16, fontWeight: 'bold', color: '#208AEF' },
});
