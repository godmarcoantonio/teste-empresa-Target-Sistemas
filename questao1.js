// Busca o arquivo de dados de vendas em formato JSON
fetch('dadosquestao1.json')
  // Converte a resposta para objeto JavaScript
  .then(response => response.json())
  .then(data => {
    let comissoes = {}; // Objeto para acumular as comissões por vendedor
    // Percorre cada venda
    data.vendas.forEach(v => {
      let c = 0; // Comissão inicial
      // Se valor >= 500, comissão é 5%
      if (v.valor >= 500) c = v.valor * 0.05;
      // Se valor >= 100, comissão é 1%
      else if (v.valor >= 100) c = v.valor * 0.01;
      // Inicializa o vendedor se ainda não existe
      if (!comissoes[v.vendedor]) comissoes[v.vendedor] = 0;
      // Soma a comissão ao vendedor
      comissoes[v.vendedor] += c;
    });
    // Monta o HTML com o resultado
    let html = '<ul>';
    Object.entries(comissoes).forEach(([v, c]) => {
      html += `<li>${v}: R$${c.toFixed(2)}</li>`;
    });
    html += '</ul>';
    // Exibe o resultado na página
    document.getElementById('resultado').innerHTML = html;
  });

