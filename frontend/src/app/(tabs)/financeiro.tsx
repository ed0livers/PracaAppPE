import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { URL_API } from '@/constants/api';

interface FaturamentoDiario {
  data: string;
  valor: number;
  dataRaw: string;
}

export default function TelaFinanceiro() {
  const [vendas, setVendas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      buscarVendasDoServidor();
    }, [])
  );

  const buscarVendasDoServidor = async () => {
    try {
      const resposta = await fetch(`${URL_API}/vendas`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setVendas(dados);
      }
    } catch (erro) {
      console.error('Erro ao obter dados financeiros:', erro);
    } finally {
      setCarregando(false);
    }
  };

  // Retorna a string local no formato YYYY-MM
  const obterMesCorrenteString = (ajusteMes = 0) => {
    const data = new Date();
    if (ajusteMes !== 0) {
      data.setMonth(data.getMonth() + ajusteMes);
    }
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    return `${ano}-${mes}`;
  };

  const mesAtualStr = obterMesCorrenteString();
  const mesAnteriorStr = obterMesCorrenteString(-1);

  // Calcula faturamentos mensais
  const vendasMesAtual = vendas.filter(v => v.dataDaVenda && v.dataDaVenda.startsWith(mesAtualStr));
  const vendasMesAnterior = vendas.filter(v => v.dataDaVenda && v.dataDaVenda.startsWith(mesAnteriorStr));

  const faturamentoMensal = vendasMesAtual.reduce((soma, v) => soma + v.valorTotal, 0);
  const faturamentoMesAnterior = vendasMesAnterior.reduce((soma, v) => soma + v.valorTotal, 0);

  // Calcula variação percentual
  let subtextoComparativo = 'Primeiro mês de faturamento';
  if (faturamentoMesAnterior > 0) {
    const diferenca = ((faturamentoMensal - faturamentoMesAnterior) / faturamentoMesAnterior) * 100;
    subtextoComparativo = `${diferenca >= 0 ? '+' : ''}${diferenca.toFixed(0)}% em relação ao mês anterior`;
  }

  // Agrupa vendas por dia
  const agruparVendasPorData = (): FaturamentoDiario[] => {
    const grupos: { [key: string]: { valor: number; dataRaw: string } } = {};
    vendas.forEach(v => {
      if (!v.dataDaVenda) return;
      const dataRaw = v.dataDaVenda.split('T')[0]; // Formato YYYY-MM-DD
      const [ano, mes, dia] = dataRaw.split('-');
      const dataFormatada = `${dia}/${mes}/${ano}`;

      if (!grupos[dataFormatada]) {
        grupos[dataFormatada] = { valor: 0, dataRaw };
      }
      grupos[dataFormatada].valor += v.valorTotal;
    });

    return Object.keys(grupos).map(data => ({
      data,
      valor: grupos[data].valor,
      dataRaw: grupos[data].dataRaw
    })).sort((a, b) => b.dataRaw.localeCompare(a.dataRaw));
  };

  const historicoDiario = agruparVendasPorData();

  return (
    <ScrollView style={estilos.container} showsVerticalScrollIndicator={false}>
      {/* Cartão principal de grande destaque contendo o faturamento */}
      {carregando ? (
        <View style={[estilos.cartaoPrincipal, { justifyContent: 'center' }]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ) : (
        <View style={estilos.cartaoPrincipal}>
          <Text style={estilos.tituloDoCartao}>Faturamento do Mês</Text>
          <Text style={estilos.valorDoCartao}>R$ {faturamentoMensal.toFixed(2).replace('.', ',')}</Text>
          <Text style={estilos.subtextoDoCartao}>{subtextoComparativo}</Text>
        </View>
      )}

      {/* Seção abaixo do cartão principal com a lista de datas */}
      <View style={estilos.secaoDeHistorico}>
        <Text style={estilos.tituloDaSecao}>Histórico de Faturamento Diário</Text>
        
        {carregando ? (
          <ActivityIndicator size="small" color="#208AEF" />
        ) : historicoDiario.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 32 }}>
            <Ionicons name="bar-chart-outline" size={48} color="#ccc" />
            <Text style={{ color: '#888', marginTop: 12, fontStyle: 'italic' }}>Nenhuma transação financeira registrada.</Text>
          </View>
        ) : (
          historicoDiario.map((item) => (
            <View key={item.data} style={estilos.itemHistorico}>
              <Text style={estilos.dataDoHistorico}>{item.data}</Text>
              <Text style={estilos.valorDoHistorico}>R$ {item.valor.toFixed(2).replace('.', ',')}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  cartaoPrincipal: { backgroundColor: '#208AEF', padding: 24, borderRadius: 16, alignItems: 'center', elevation: 4, shadowColor: '#208AEF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, marginBottom: 24, minHeight: 140, justifyContent: 'center' },
  tituloDoCartao: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 8 },
  valorDoCartao: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtextoDoCartao: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  secaoDeHistorico: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 40 },
  tituloDaSecao: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  itemHistorico: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  dataDoHistorico: { fontSize: 16, color: '#555' },
  valorDoHistorico: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});
