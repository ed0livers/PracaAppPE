// ==========================================
// 1. LÓGICA DE LOGIN
// ==========================================
const btnEntrar = document.getElementById('btn-entrar');
const telaLogin = document.getElementById('tela-login');
const telaPrincipal = document.getElementById('tela-principal');

btnEntrar.addEventListener('click', () => {
  telaLogin.style.display = 'none';
  telaPrincipal.style.display = 'block';
});

// ==========================================
// 2. LÓGICA DA BARRA INFERIOR
// ==========================================
const botoesNav = document.querySelectorAll('.nav-item');
const conteudosAba = document.querySelectorAll('.conteudo-aba');

botoesNav.forEach(botao => {
  botao.addEventListener('click', () => {
    // Troca a cor verde do ícone
    botoesNav.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    // Esconde todas as abas
    conteudosAba.forEach(aba => {
      aba.style.display = 'none';
    });

    // Mostra apenas a aba alvo
    const idAbaAlvo = botao.getAttribute('data-target');
    document.getElementById(idAbaAlvo).style.display = 'block';
  });
});

// ==========================================
// 3. LÓGICA DOS FILTROS (PILLS VERDES)
// ==========================================
const botoesFiltro = document.querySelectorAll('.btn-pill');

botoesFiltro.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');
  });
});

// ==========================================
// 4. LÓGICA DE ADICIONAR PRODUTO
// ==========================================
const btnAbrirAdd = document.getElementById('btn-abrir-add');
const telaAddProduto = document.getElementById('tela-add-produto');
const btnCancelarProduto = document.getElementById('btn-cancelar-produto');
const btnSalvarProduto = document.getElementById('btn-salvar-produto');

// Abre a tela de adicionar produto
btnAbrirAdd.addEventListener('click', () => {
  telaPrincipal.style.display = 'none';
  telaAddProduto.style.display = 'block';
});

// Cancela e volta para a tela principal
btnCancelarProduto.addEventListener('click', () => {
  telaAddProduto.style.display = 'none';
  telaPrincipal.style.display = 'block';
});

// Simula o salvamento e volta para a tela principal
btnSalvarProduto.addEventListener('click', () => {
  alert("Sucesso! Produto adicionado ao estoque.");
  telaAddProduto.style.display = 'none';
  telaPrincipal.style.display = 'block';
});