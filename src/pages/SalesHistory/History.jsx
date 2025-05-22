import { useEffect, useState } from 'react';
import './History.css';

function SalesHistory() {
  const [vendas, setVendas] = useState([]);
  const [erro, setErro] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/vendas', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVendas(data);
        } else {
          setErro(data.error || 'Erro ao buscar vendas.');
        }
      })
      .catch(() => setErro('Erro ao conectar com o servidor.'));
  }, []);
  
  function formatarData(dataStr) {
    const data = new Date(dataStr);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    }

  return (
    <div className="sales-history-container">
      <h2>Histórico de Vendas</h2>
      {erro && <p className="erro">{erro}</p>}

      {vendas.length === 0 ? (
        <p>Nenhuma venda registrada ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Total</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map(venda => (
              <tr key={venda.id}>
                <td>{venda.produto_id}</td>
                <td>{venda.quantidade_vendida}</td>
                <td>R$ {venda.valor_total.toFixed(2)}</td>
                <td>{formatarData(venda.data_venda)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SalesHistory;