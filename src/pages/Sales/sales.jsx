import { useState, useEffect } from 'react';
import './style.css';

export default function Sales() {
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [valorTotal, setValorTotal] = useState(0);
  const [mensagem, setMensagem] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/produtos', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(() => setMensagem('Erro ao buscar produtos.'));
  }, [token]);

  useEffect(() => {
    const produto = produtos.find(p => p.id === Number(produtoId));
    if (produto) {
      setValorTotal(produto.preco * quantidade);
    } else {
      setValorTotal(0);
    }
  }, [produtoId, quantidade, produtos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produtoId) {
      setMensagem('Selecione um produto.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/vendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          produto_id: produtoId,
          quantidade_vendida: quantidade,
          valor_total: valorTotal,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem(data.message);
      } else {
        setMensagem(data.error || 'Erro na venda');
      }
    } catch {
      setMensagem('Erro ao enviar dados.');
    }
  };

  return (
    <div className="sales-container">
      <h2>Registrar Venda</h2>
      {mensagem && <p className="message">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="sales-form">
        <label htmlFor="produto">Produto:</label>
        <select id="produto" value={produtoId} onChange={e => setProdutoId(e.target.value)}>
          <option value="">-- Selecione --</option>
          {produtos.map(prod => (
            <option key={prod.id} value={prod.id}>
              {prod.nome} (Preço: R$ {prod.preco.toFixed(2)})
            </option>
          ))}
        </select>

        <label htmlFor="quantidade">Quantidade:</label>
        <input
          id="quantidade"
          type="number"
          min="1"
          value={quantidade}
          onChange={e => setQuantidade(Number(e.target.value))}
          required
        />

        <label htmlFor="valorTotal">Valor Total:</label>
        <input
          id="valorTotal"
          type="text"
          value={`R$ ${valorTotal.toFixed(2)}`}
          readOnly
        />

        <button type="submit" className="btn-submit">Registrar Venda</button>
      </form>
    </div>
  );
}
