// ==========================================
// 1. LÓGICA DE LOGIN (TROCA DE TELAS)
// ==========================================
const btnEntrar = document.getElementById('btn-entrar');
const telaLogin = document.getElementById('tela-login');
const telaPrincipal = document.getElementById('tela-principal');

btnEntrar.addEventListener('click', () => {
  telaLogin.style.display = 'none';
  telaPrincipal.style.display = 'block';
});

// ==========================================
// 2. LÓGICA DOS FILTROS (PILLS VERDES)
// ==========================================
const botoesFiltro = document.querySelectorAll('.btn-pill');

botoesFiltro.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');
  });
});

// ==========================================
// 3. LÓGICA DA NAVEGAÇÃO ENTRE ABAS (BARRA INFERIOR)
// ==========================================
const botoesNav = document.querySelectorAll('.nav-item');
const conteudosAba = document.querySelectorAll('.conteudo-aba');

botoesNav.forEach(botao => {
  botao.addEventListener('click', () => {
    // Passo A: Troca a cor verde do ícone da barra inferior
    botoesNav.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    // Passo B: Esconde TODAS as abas (Início, Estoque, Vendas, etc)
    conteudosAba.forEach(aba => {
      aba.style.display = 'none';
    });

    // Passo C: Descobre qual botão foi clicado através do "data-target"
    // E mostra APENAS a aba correspondente
    const idAbaAlvo = botao.getAttribute('data-target');
    document.getElementById(idAbaAlvo).style.display = 'block';
  });
});