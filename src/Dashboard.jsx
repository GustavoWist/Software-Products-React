import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
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
      </div>
    </div>
  );
}

export default Dashboard;
