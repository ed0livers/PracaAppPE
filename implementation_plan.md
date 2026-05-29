# Plano de Implementação — Integração de Telas e Compatibilidade com Expo Go

Este plano detalha as melhorias e integrações a serem realizadas no Praça App, conectando a interface mobile (React Native) com as APIs reais do backend (Spring Boot/MySQL), além de solucionar os problemas de execução no Expo Go.

## User Review Required

> [!IMPORTANT]
> **Compatibilidade com Expo Go:** 
> Para rodar no Expo Go sem precisar de builds de desenvolvimento locais (Android Studio / Xcode), removeremos a dependência direta do módulo nativo `react-native-worklets` e usaremos o `runOnJS` nativo do `react-native-reanimated` na animação da tela de Splash. Também removemos a biblioteca do `package.json` para evitar erros de compilação.
>
> **Variáveis de Ambiente (Conexão com API):**
> O IP do servidor backend (`192.168.1.12`) foi confirmado como o IP correto da sua máquina atual na rede local, portanto, a comunicação com o celular físico funcionará desde que ambos estejam no mesmo Wi-Fi.

## Proposed Changes

### Componente Frontend (React Native)

---

#### [MODIFY] [animated-icon.tsx](file:///c:/Users/ed_ne/OneDrive/Desktop/PracaAppPE-main/frontend/src/components/animated-icon.tsx)
- Remover o import de `scheduleOnRN` do pacote `react-native-worklets`.
- Importar `runOnJS` de `react-native-reanimated`.
- Substituir a chamada `scheduleOnRN(setVisible, false)` por `runOnJS(setVisible)(false)` na finalização do keyframe da tela de Splash.

#### [MODIFY] [package.json](file:///c:/Users/ed_ne/OneDrive/Desktop/PracaAppPE-main/frontend/package.json)
- Remover a linha `"react-native-worklets": "0.5.1"` das dependências para permitir que a instalação ocorra sem exigir módulos nativos customizados e prevenir erros no Expo Go.

#### [MODIFY] [estoque.tsx](file:///c:/Users/ed_ne/OneDrive/Desktop/PracaAppPE-main/frontend/src/app/%28tabs%29/estoque.tsx)
- Implementar variável de estado `pesquisa` e vinculá-la ao input de busca.
- Filtrar em tempo real a lista de produtos exibida na tela pelo nome/categoria digitados pelo usuário (busca case-insensitive).
- Implementar atualização automática da lista de produtos usando `useFocusEffect` (do `@react-navigation/native` ou `expo-router`), garantindo que quando o usuário retornar da tela de cadastro de produto (modal), a lista de estoque seja recarregada instantaneamente do banco de dados.

#### [MODIFY] [vendas.tsx](file:///c:/Users/ed_ne/OneDrive/Desktop/PracaAppPE-main/frontend/src/app/%28tabs%29/vendas.tsx)
- **Seleção de Produtos:** Adicionar um fluxo/modal ou lista de seleção para carregar todos os produtos ativos do backend (`GET /api/produtos`).
- **Carrinho Local:** Implementar estado local no React Native contendo itens do carrinho com:
  - Produto selecionado, quantidade, e preço unitário.
  - Botões de incrementar (+), decrementar (-) e remover (lixeira) itens.
- **Cálculo de Total:** Calcular em tempo real a soma dos itens do carrinho e atualizar o rodapé (`R$ 0,00` atual).
- **Finalização de Venda:** Fazer chamada `POST /api/vendas` enviando os itens no formato JSON estruturado exigido pela API Java. Em caso de sucesso, exibir um alerta de sucesso e zerar o carrinho.

#### [MODIFY] [index.tsx](file:///c:/Users/ed_ne/OneDrive/Desktop/PracaAppPE-main/frontend/src/app/%28tabs%29/index.tsx) (Painel Principal)
- Implementar chamadas à API (`GET /api/vendas` e `GET /api/produtos`) ao carregar a tela (e toda vez que ela focar).
- **Métricas do dia:** Calcular dinamicamente a receita total das vendas feitas na data de hoje ("Vendas Hoje") e a quantidade dessas vendas ("Pedidos").
- **Últimas Vendas:** Substituir a mensagem estática de "Nenhuma venda registrada" pela listagem em tempo real das últimas 3 transações registradas no banco de dados.

#### [MODIFY] [financeiro.tsx](file:///c:/Users/ed_ne/OneDrive/Desktop/PracaAppPE-main/frontend/src/app/%28tabs%29/financeiro.tsx)
- Implementar chamada à API (`GET /api/vendas`) ao carregar/focar a tela.
- **Faturamento do Mês:** Calcular a soma dos valores totais de todas as vendas do mês corrente e atualizar o painel de faturamento.
- **Histórico Real:** Agrupar as transações do banco de dados por data e mostrá-las ordenadas de forma decrescente no histórico.

## Verification Plan

### Testes Manuais
1. Rodar `npm install` na pasta `frontend` para atualizar as dependências sem `react-native-worklets`.
2. Executar `npm start` no frontend e certificar que o bundle inicia limpo.
3. Testar no celular físico / emulador o fluxo completo:
   - Cadastrar um novo produto (Modal).
   - Verificar se o novo produto aparece imediatamente listado no Estoque.
   - Testar a barra de pesquisa na tela de Estoque para filtrar produtos.
   - Ir na tela de Vendas, adicionar itens ao carrinho, ajustar quantidades, e finalizar a venda.
   - Confirmar se a venda abateu a quantidade correta do estoque correspondente.
   - Visualizar na tela de Finanças e no Início (Dashboard) as métricas atualizadas e o histórico real das vendas registradas no banco de dados MySQL.
