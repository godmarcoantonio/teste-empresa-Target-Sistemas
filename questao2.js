let produtos = []; // Lista de produtos carregados do JSON
let movimentacoes = []; // Histórico das movimentações realizadas
let idMov = 1; // Identificador incremental para cada movimentação

// Função para movimentar o estoque de um produto
function movimentar(codigoProduto, quantidade, descricao) {
  const produto = produtos.find(p => p.codigoProduto === Number(codigoProduto)); // Busca o produto pelo código
  if (!produto) return "Produto não encontrado"; // Se não achar, retorna erro
  produto.estoque += Number(quantidade); // Atualiza o estoque
  // Adiciona a movimentação ao histórico
  movimentacoes.push({
    id: idMov++,
    codigoProduto,
    descricao,
    quantidade,
    descricaoProduto: produto.descricaoProduto,
    estoqueFinal: produto.estoque
  });
  return `Estoque final de ${produto.descricaoProduto}: ${produto.estoque}`; // Mensagem de sucesso
}

// Atualiza a tabela HTML com as movimentações
function atualizarTabela() {
  const tbody = document.querySelector('#tabelaMovimentacoes tbody');
  tbody.innerHTML = '';
  movimentacoes.forEach(mov => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${mov.id}</td><td>${mov.codigoProduto}</td><td>${mov.descricao}</td><td>${mov.quantidade}</td><td>${mov.descricaoProduto}</td><td>${mov.estoqueFinal}</td>`;
    tbody.appendChild(tr);
  });
}

// Ao carregar a página, busca os produtos e configura o formulário
document.addEventListener('DOMContentLoaded', () => {
  fetch('dadosquestao2.json')
    .then(resp => resp.json())
    .then(data => { produtos = data.estoque; }); // Carrega os produtos do arquivo JSON

  // Ao submeter o formulário, realiza a movimentação e atualiza a tabela
  document.getElementById('formMovimentacao').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigoProduto = document.getElementById('codigoProduto').value;
    const quantidade = document.getElementById('quantidade').value;
    const descricao = document.getElementById('descricao').value;
    const resultado = movimentar(codigoProduto, Number(quantidade), descricao);
    document.getElementById('resultado').textContent = resultado;
    atualizarTabela();
  });
});