import { Link } from 'react-router-dom';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="dashboard-page fade-in-up">
      <h2>Bem-vindo!</h2>
      <div className="card fade-in-up" style={{ animationDelay: '0.2s' }}>
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
      <button onClick={handleLogout} className="logout-button fade-in-up" style={{ animationDelay: '0.4s' }}>Sair</button>
    </div>
  );
}
