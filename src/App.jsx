import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import eu from '/eu.jpg';
import Login from './login';
import Products from './products';
import Registrar_produto from './registrar_produto';
import ProductDetails from './ProductDetails';
import Dashboard from './Dashboard';
import Register from './Register';
import Ativacao from './Activate';

function Home() {
  return (
    <>
      <div>
        <a href="https://linkedin.com/in/gustavo-santos-319317269/" target='_blank'>
          <img src={eu} className="logo eu" alt="EU logo" />
        </a>
      </div>
      <div className="card">
        <Link to="/produtos">
          <button>Produtos</button>
        </Link>
      </div>
      <div className='regisprod'>
        <Link to='/registrar_produto'>
          <button>Registrar Produto</button>
        </Link>
      </div>
    </>
  );
}

// Rota protegida
function RotaProtegida({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login redireciona para dashboard se logado */}
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        
        <Route path="/ativar" element={<Ativacao />} />


        {/* Dashboard após login */}
        <Route
          path="/dashboard"
          element={
            <RotaProtegida isLoggedIn={isLoggedIn}>
              <Dashboard />
            </RotaProtegida>
          }
        />
        <Route path="/register" element={<Register />} />
        {/* Outras rotas protegidas */}
        <Route
          path="/"
          element={
            <RotaProtegida isLoggedIn={isLoggedIn}>
              <Home />
            </RotaProtegida>
          }
        />
        <Route
          path="/produtos"
          element={
            <RotaProtegida isLoggedIn={isLoggedIn}>
              <Products />
            </RotaProtegida>
          }
        />
        <Route
          path="/registrar_produto"
          element={
            <RotaProtegida isLoggedIn={isLoggedIn}>
              <Registrar_produto />
            </RotaProtegida>
          }
        />
        <Route
          path="/produto/:id"
          element={
            <RotaProtegida isLoggedIn={isLoggedIn}>
              <ProductDetails />
            </RotaProtegida>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
