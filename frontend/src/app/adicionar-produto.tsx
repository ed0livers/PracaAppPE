import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { URL_API } from '@/constants/api'; // Importando nosso endereço do Java

/**
 * TelaAdicionarProduto (AdicionarProdutoScreen)
 * 
 * Este componente atua como um formulário. Ele fica responsável por capturar as
 * informações em texto digitadas sobre o produto e envia para o backend.
 */
export default function TelaAdicionarProduto() {
  
  // Guardando os valores digitados nos campos
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [salvando, setSalvando] = useState(false);

  /**
   * Esta função pega o que foi escrito e dispara uma solicitação POST para a API Java.
   */
  const salvarProdutoNaAPI = async () => {
    // Validação básica
    if (!nome || !preco || !estoque) {
      Alert.alert('Atenção', 'Nome, preço e estoque são obrigatórios.');
      return;
    }

    setSalvando(true);

    try {
      // Monta o objeto no formato JSON exigido pela nossa API
      const novoProduto = {
        nome: nome,
        categoria: categoria,
        preco: parseFloat(preco.replace(',', '.')), // Converte "10,50" para número 10.50
        estoque: parseInt(estoque, 10) // Garante que seja número inteiro
      };

      const resposta = await fetch(`${URL_API}/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto) // Transforma o objeto em texto JSON
      });

      if (resposta.ok) {
        Alert.alert('Sucesso!', 'Seu produto foi salvo no banco de dados!');
        router.back(); // Fecha a tela modal voltando para a lista de estoque
      } else {
        Alert.alert('Erro', 'Não foi possível salvar o produto.');
      }
    } catch (erro) {
      console.error(erro);
      Alert.alert('Falha', 'Não foi possível conectar ao servidor backend.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={estilos.container}>
      {/* Agrupamento de formulário */}
      <View style={estilos.formulario}>
        
        {/* Campo de nome do produto */}
        <View style={estilos.grupoDeEntrada}>
          <Text style={estilos.rotuloCampo}>Nome do Produto</Text>
          <TextInput style={estilos.campoDeTexto} placeholder="Ex: Camiseta Branca" value={nome} onChangeText={setNome} />
        </View>

        {/* Campo de categoria */}
        <View style={estilos.grupoDeEntrada}>
          <Text style={estilos.rotuloCampo}>Categoria</Text>
          <TextInput style={estilos.campoDeTexto} placeholder="Ex: Roupas" value={categoria} onChangeText={setCategoria} />
        </View>

        {/* Esta View flex cria uma divisão dividida ao meio. Coloca preço e estoque lado a lado. */}
        <View style={estilos.linhaFlexivel}>
          {/* Preço (lado esquerdo) */}
          <View style={[estilos.grupoDeEntrada, { flex: 1, marginRight: 8 }]}>
            <Text style={estilos.rotuloCampo}>Preço (R$)</Text>
            {/* keyboardType="numeric" obriga o celular a abrir apenas o teclado de números */}
            <TextInput style={estilos.campoDeTexto} placeholder="0,00" keyboardType="numeric" value={preco} onChangeText={setPreco} />
          </View>
          
          {/* Estoque (lado direito) */}
          <View style={[estilos.grupoDeEntrada, { flex: 1, marginLeft: 8 }]}>
            <Text style={estilos.rotuloCampo}>Estoque Inicial</Text>
            <TextInput style={estilos.campoDeTexto} placeholder="0" keyboardType="numeric" value={estoque} onChangeText={setEstoque} />
          </View>
        </View>

        {/* Botão de confirmar */}
        <TouchableOpacity style={estilos.botaoConfirmar} onPress={salvarProdutoNaAPI} disabled={salvando}>
          {salvando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={estilos.textoBotaoConfirmar}>Salvar Produto</Text>
          )}
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  formulario: { padding: 24 },
  grupoDeEntrada: { marginBottom: 16 },
  linhaFlexivel: { flexDirection: 'row' },
  rotuloCampo: { fontSize: 14, fontWeight: '500', color: '#555', marginBottom: 8 },
  campoDeTexto: { backgroundColor: '#f8f9fa', borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  botaoConfirmar: { backgroundColor: '#208AEF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 24 },
  textoBotaoConfirmar: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
