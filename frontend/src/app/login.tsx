import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { URL_API } from '@/constants/api';
import { usarAutenticacao } from '@/context/AuthContext';

/**
 * TelaDeLogin (LoginScreen)
 */
export default function TelaDeLogin() {
  const [estaEmModoCadastro, setEstaEmModoCadastro] = useState(false);
  
  // Variáveis de estado
  const [nomeDigitado, setNomeDigitado] = useState('');
  const [dataNascimentoDigitada, setDataNascimentoDigitada] = useState('');
  const [emailDigitado, setEmailDigitado] = useState('');
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [confirmarSenhaDigitada, setConfirmarSenhaDigitada] = useState('');
  
  const [carregando, setCarregando] = useState(false);

  /**
   * Mascarar e formatar a data para DD/MM/YYYY enquanto o usuário digita
   */
  const formatarData = (texto: string) => {
    let limpo = texto.replace(/\D/g, ''); // Remove letras, permite só números
    if (limpo.length > 8) limpo = limpo.slice(0, 8); // Limite de 8 dígitos numéricos
    
    // Insere as barras automaticamente
    if (limpo.length > 4) {
      limpo = limpo.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (limpo.length > 2) {
      limpo = limpo.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }
    setDataNascimentoDigitada(limpo);
  };

  // Extrair a função setUsuario do nosso contexto
  const { setUsuario } = usarAutenticacao();

  const realizarLogin = async () => {
    if (!emailDigitado || !senhaDigitada) {
      Alert.alert('Atenção', 'Preencha seu e-mail e senha!');
      return;
    }

    setCarregando(true);
    try {
      const resposta = await fetch(`${URL_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailDigitado, senha: senhaDigitada }),
      });

      if (resposta.ok) {
        // Lemos a resposta como texto primeiro para evitar o "JSON Parse error"
        const textoDaResposta = await resposta.text();
        
        try {
          // Tenta converter para JSON (caso o Java já esteja rodando a versão nova)
          const dadosDoUsuario = JSON.parse(textoDaResposta);
          setUsuario({
            nome: dadosDoUsuario.nome,
            email: dadosDoUsuario.email,
            foto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Foto padrão
          });
        } catch (e) {
          // Se der erro ao converter, significa que o Java retornou "Login realizado com sucesso!" (Versão antiga do código)
          // Salva dados genéricos só para permitir a entrada
          setUsuario({
            nome: 'Vendedor',
            email: emailDigitado,
            foto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          });
        }

        router.replace('/(tabs)');
      } else {
        Alert.alert('Ops!', 'E-mail ou senha incorretos.');
      }
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro de Conexão', `Não foi possível conectar ao backend (${URL_API}). Verifique se o IP está correto no arquivo api.ts.`);
    } finally {
      setCarregando(false);
    }
  };

  const realizarCadastro = async () => {
    // 1. Validação de Campos Vazios
    if (!nomeDigitado || !emailDigitado || !senhaDigitada || !confirmarSenhaDigitada || !dataNascimentoDigitada) {
      Alert.alert('Atenção', 'Preencha todos os campos para se cadastrar!');
      return;
    }

    // 2. Validação de E-mail (RegEx que verifica se tem um @ e um ponto)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(emailDigitado)) {
      Alert.alert('E-mail Inválido', 'Por favor, insira um endereço de e-mail real (ex: nome@email.com).');
      return;
    }

    // 3. Validação das Senhas (checar se ambas são iguais)
    if (senhaDigitada !== confirmarSenhaDigitada) {
      Alert.alert('Senhas Diferentes', 'A senha de confirmação não bate com a primeira senha digitada.');
      return;
    }

    // 4. Validação de Força de Senha (Mínimo 8, 1 Maiúscula, 1 Número, 1 Caractere Especial)
    const senhaForteRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!senhaForteRegex.test(senhaDigitada)) {
      Alert.alert(
        'Sua senha é muito fraca', 
        'A senha deve conter:\n- No mínimo 8 caracteres\n- Pelo menos 1 letra Maiúscula\n- Pelo menos 1 Número\n- Pelo menos 1 Caractere Especial (@, #, !, etc).'
      );
      return;
    }

    // 5. Validação da Data
    if (dataNascimentoDigitada.length !== 10) {
      Alert.alert('Data Inválida', 'Preencha a data de nascimento completa no formato DD/MM/AAAA.');
      return;
    }

    // Converte DD/MM/YYYY para o formato de banco de dados e do Java (YYYY-MM-DD)
    const [dia, mes, ano] = dataNascimentoDigitada.split('/');
    const dataFormatadaParaOJava = `${ano}-${mes}-${dia}`;

    setCarregando(true);
    try {
      const resposta = await fetch(`${URL_API}/auth/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome: nomeDigitado, 
          email: emailDigitado, 
          senha: senhaDigitada,
          dataNascimento: dataFormatadaParaOJava // Novo campo enviado pro banco!
        }),
      });

      if (resposta.ok) {
        Alert.alert('Sucesso!', 'Conta criada com sucesso! Faça login para acessar o app.');
        // Limpa os campos de senha
        setSenhaDigitada('');
        setConfirmarSenhaDigitada('');
        setEstaEmModoCadastro(false); // Volta pra tela inicial
      } else {
        // Como o e-mail é UNIQUE na tabela, se falhar muito provável é duplicado
        Alert.alert('E-mail indisponível', 'Este e-mail já está sendo utilizado por outra conta. Faça o login!');
      }
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro de Conexão', `Não foi possível conectar ao backend (${URL_API}).`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={estilos.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ScrollView permite que a tela role para baixo caso o formulário fique muito grande, ótimo para celulares pequenos */}
      <ScrollView contentContainerStyle={estilos.conteudoScrollView} showsVerticalScrollIndicator={false}>
        
        <View style={estilos.cabecalho}>
          <Text style={estilos.titulo}>Praça App</Text>
          <Text style={estilos.subtitulo}>Gestão de Vendas e Estoque</Text>
        </View>

        <View style={estilos.formulario}>
          
          {/* Só mostra Nome e Data se o botão de "Cadastrar" foi clicado */}
          {estaEmModoCadastro && (
            <>
              <TextInput
                style={estilos.campoDeTexto}
                placeholder="Seu Nome Completo"
                placeholderTextColor="#888"
                value={nomeDigitado}
                onChangeText={setNomeDigitado}
              />
              <TextInput
                style={estilos.campoDeTexto}
                placeholder="Data de Nascimento (DD/MM/AAAA)"
                placeholderTextColor="#888"
                keyboardType="numeric" // Traz teclado numérico para facilitar
                value={dataNascimentoDigitada}
                onChangeText={formatarData} // Passa pela função que adiciona as Barras (/)
                maxLength={10}
              />
            </>
          )}

          <TextInput
            style={estilos.campoDeTexto}
            placeholder="E-mail"
            placeholderTextColor="#888"
            value={emailDigitado}
            onChangeText={setEmailDigitado}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={estilos.campoDeTexto}
            placeholder="Senha"
            placeholderTextColor="#888"
            value={senhaDigitada}
            onChangeText={setSenhaDigitada}
            secureTextEntry
          />
          
          {/* Se estiver no cadastro, mostra o campo de confirmação */}
          {estaEmModoCadastro && (
            <TextInput
              style={estilos.campoDeTexto}
              placeholder="Confirmar Senha"
              placeholderTextColor="#888"
              value={confirmarSenhaDigitada}
              onChangeText={setConfirmarSenhaDigitada}
              secureTextEntry
            />
          )}
          
          <TouchableOpacity 
            style={estilos.botaoPrincipal} 
            onPress={estaEmModoCadastro ? realizarCadastro : realizarLogin}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={estilos.textoBotaoPrincipal}>
                {estaEmModoCadastro ? 'Criar Conta' : 'Entrar'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={estilos.botaoSecundario} 
            onPress={() => setEstaEmModoCadastro(!estaEmModoCadastro)}}
            disabled={carregando}
          >
            <Text style={estilos.textoBotaoSecundario}>
              {estaEmModoCadastro ? 'Já tem uma conta? Faça Login' : 'Não tem conta? Cadastre-se'}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  conteudoScrollView: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingVertical: 48 },
  cabecalho: { alignItems: 'center', marginBottom: 40 },
  titulo: { fontSize: 42, fontWeight: 'bold', color: '#208AEF', marginBottom: 8 },
  subtitulo: { fontSize: 16, color: '#666' },
  formulario: { gap: 14 },
  campoDeTexto: { backgroundColor: '#fff', borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  botaoPrincipal: { backgroundColor: '#208AEF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12 },
  textoBotaoPrincipal: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  botaoSecundario: { padding: 16, alignItems: 'center' },
  textoBotaoSecundario: { color: '#208AEF', fontSize: 15, fontWeight: '600' },
});
