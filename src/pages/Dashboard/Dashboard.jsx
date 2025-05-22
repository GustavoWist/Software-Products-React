import { Link } from 'react-router-dom';
import './style.css';

export default function Dashboard({ onLogout }) {
  return (
    <div className="dashboard-container">
      <h2>Bem-vindo!</h2>
      <div className="card">
        <Link to="/produtos">
          <button>Produtos</button>
        </Link>
        <Link to="/registrar_produto">
          <button>Registrar Produto</button>
        </Link>
        <Link to="/vendas">
          <button>Vender Produto</button>
        </Link>
        <Link to="/historico_vendas">
          <button>Histórico de Vendas</button>
        </Link>
      </div>
      <button onClick={onLogout} className="logout-button">Sair</button>
    </div>
  );
}