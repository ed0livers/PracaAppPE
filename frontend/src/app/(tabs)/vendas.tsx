import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * TelaDeVendas (VendasScreen)
 * 
 * Funciona como o "Carrinho" do vendedor ou o terminal de registro de vendas (PDV).
 * Nela o usuário verá os itens adicionados e poderá concluir o pedido gerando um faturamento.
 */
export default function TelaDeVendas() {
  return (
    <View style={estilos.container}>
      {/* ScrollView permite que a lista de itens cresça o quanto for necessário */}
      <ScrollView style={estilos.conteudo}>
        
        {/* Quando não houver produtos adicionados, este aviso visual vazio é exibido */}
        <View style={estilos.estadoVazio}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text style={estilos.tituloEstadoVazio}>Carrinho Vazio</Text>
          <Text style={estilos.textoEstadoVazio}>Adicione produtos para iniciar uma venda</Text>
        </View>
        
      </ScrollView>

      {/* Rodapé fixo na base da tela mostrando o somatório e o botão de confirmar a venda */}
      <View style={estilos.rodapeFixo}>
        <View style={estilos.linhaDoTotal}>
          <Text style={estilos.textoTotalRotulo}>Total:</Text>
          <Text style={estilos.textoTotalValor}>R$ 0,00</Text>
        </View>
        <TouchableOpacity style={estilos.botaoFinalizarVenda}>
          <Text style={estilos.textoBotaoFinalizar}>Finalizar Venda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  conteudo: { flex: 1, padding: 20 },
  estadoVazio: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 },
  tituloEstadoVazio: { fontSize: 20, fontWeight: 'bold', color: '#555', marginTop: 16 },
  textoEstadoVazio: { fontSize: 15, color: '#888', marginTop: 8, textAlign: 'center' },
  rodapeFixo: { backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingBottom: 30 },
  linhaDoTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  textoTotalRotulo: { fontSize: 18, fontWeight: '500', color: '#555' },
  textoTotalValor: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  botaoFinalizarVenda: { backgroundColor: '#208AEF', padding: 16, borderRadius: 12, alignItems: 'center' },
  textoBotaoFinalizar: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
