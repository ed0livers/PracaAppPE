# 📱 Guia do Frontend — Praça App PE

Este documento explica a estrutura e o funcionamento do frontend desenvolvido em React Native (Expo) para o Praça App.

## 🏗️ Estrutura de Pastas e Arquivos

O frontend foi reestruturado utilizando o **Expo Router**, que utiliza o sistema de rotas baseadas em arquivos (File-based Routing). 

A estrutura principal dentro de `frontend/src/app` ficou da seguinte forma:

- `_layout.tsx`: O layout raiz do aplicativo. Ele gerencia o fluxo de navegação principal (Stack Navigation), definindo as telas soltas (Login, Modal de Adicionar Produto) e chamando o grupo de abas `(tabs)`.
- `index.tsx`: O ponto de entrada. Ele redireciona o usuário automaticamente para a tela de login.
- `login.tsx`: Tela de autenticação onde o usuário insere E-mail e Senha. Ao "logar", o usuário é direcionado para a área principal do app.
- `adicionar-produto.tsx`: Uma tela sobreposta (modal) para cadastrar novos produtos.

### 📑 Navegação por Abas `(tabs)`
A pasta `(tabs)` contém a área autenticada do aplicativo, dividida em 5 abas inferiores (Bottom Tabs):

1. `(tabs)/_layout.tsx`: Configura as propriedades da barra de navegação inferior, ícones (`Ionicons`) e cores baseadas no tema.
2. `(tabs)/index.tsx` (Início): O **Dashboard** com um resumo das vendas de hoje, pedidos e atalhos rápidos.
3. `(tabs)/vendas.tsx` (Vendas): O **Carrinho de vendas**, preparado para adicionar itens e finalizar um pedido.
4. `(tabs)/estoque.tsx` (Estoque): A **Lista de produtos** com barra de busca, categorias, preço e um indicador visual se o estoque está baixo.
5. `(tabs)/financeiro.tsx` (Finanças): O **Relatório financeiro**, mostrando o faturamento do mês e o histórico dos últimos dias.
6. `(tabs)/configuracoes.tsx` (Ajustes): O **Perfil do usuário**, com opções de editar perfil, ver suporte e fazer Logout.

## 🎨 Design e UI/UX

- **Cores e Tema:** O app utiliza um design moderno, com bordas arredondadas, sombras suaves (shadow/elevation) e cores vibrantes. A cor principal (Primary) é o azul `#208AEF`.
- **Ícones:** Utilizamos o pacote nativo `@expo/vector-icons` com a família `Ionicons` para ilustrar ações e navegação.
- **Responsividade:** Layouts estruturados utilizando o Flexbox do React Native para adaptar-se perfeitamente às telas do celular.

## 🔌 Próximos Passos (Integração)

Atualmente, o app possui "Mock Data" (dados estáticos) para visualização do design, já que o backend ainda não possui as tabelas/rotas concluídas. O próximo passo é substituir esses dados pelas chamadas da API (`fetch` ou `axios`) para o backend em Java (Spring Boot).

- No `login.tsx`, a função `handleLogin` deve enviar uma requisição `POST /auth/login`.
- No `estoque.tsx`, a lista `MOCK_PRODUTOS` será preenchida por uma requisição `GET /produtos`.
- No `adicionar-produto.tsx`, o botão "Salvar" enviará um `POST /produtos`.
