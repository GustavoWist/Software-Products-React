import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="dashboard-container">
      <div className="card">
        <Link to="/login">
          <button>Entrar</button>
        </Link>
        <Link to="/register">
          <button>Registra-se</button>
        </Link>
      </div>
    </div>
  );
}