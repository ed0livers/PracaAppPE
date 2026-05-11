// ==========================================
// 1. LÓGICA DE LOGIN (TROCA DE TELAS)
// ==========================================
const btnEntrar = document.getElementById('btn-entrar');
const telaLogin = document.getElementById('tela-login');
const telaPrincipal = document.getElementById('tela-principal');

btnEntrar.addEventListener('click', () => {
  // Esconde a tela de login (deleta ela da visualização)
  telaLogin.style.display = 'none';
  
  // Mostra a tela principal
  telaPrincipal.style.display = 'block';
});

// ==========================================
// 2. LÓGICA DOS FILTROS DE ESTOQUE
// ==========================================
const botoesFiltro = document.querySelectorAll('.btn-pill');

botoesFiltro.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');
  });
});

// ==========================================
// 3. LÓGICA DA BARRA INFERIOR
// ==========================================
const botoesNav = document.querySelectorAll('.nav-item');

botoesNav.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesNav.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');
  });
});