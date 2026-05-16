import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * TelaFinanceiro (FinanceiroScreen)
 * 
 * Exibe as métricas de performance do negócio: faturamento total do mês 
 * e uma listagem histórica dos dias mais recentes com seus ganhos.
 */
export default function TelaFinanceiro() {
  return (
    <ScrollView style={estilos.container}>
      {/* Cartão principal de grande destaque contendo o faturamento */}
      <View style={estilos.cartaoPrincipal}>
        <Text style={estilos.tituloDoCartao}>Faturamento do Mês</Text>
        <Text style={estilos.valorDoCartao}>R$ 12.450,00</Text>
        <Text style={estilos.subtextoDoCartao}>+15% em relação ao mês passado</Text>
      </View>

      {/* Seção abaixo do cartão principal com a lista de datas */}
      <View style={estilos.secaoDeHistorico}>
        <Text style={estilos.tituloDaSecao}>Histórico Recente</Text>
        
        {/* Linha representando uma data (Mock Data) */}
        <View style={estilos.itemHistorico}>
          <Text style={estilos.dataDoHistorico}>16/05/2026</Text>
          <Text style={estilos.valorDoHistorico}>R$ 450,00</Text>
        </View>
        <View style={estilos.itemHistorico}>
          <Text style={estilos.dataDoHistorico}>15/05/2026</Text>
          <Text style={estilos.valorDoHistorico}>R$ 680,00</Text>
        </View>
        <View style={estilos.itemHistorico}>
          <Text style={estilos.dataDoHistorico}>14/05/2026</Text>
          <Text style={estilos.valorDoHistorico}>R$ 320,00</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  cartaoPrincipal: { backgroundColor: '#208AEF', padding: 24, borderRadius: 16, alignItems: 'center', elevation: 4, shadowColor: '#208AEF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, marginBottom: 24 },
  tituloDoCartao: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 8 },
  valorDoCartao: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtextoDoCartao: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  secaoDeHistorico: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  tituloDaSecao: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  itemHistorico: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  dataDoHistorico: { fontSize: 16, color: '#555' },
  valorDoHistorico: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});
