import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import RegisterProduct from './pages/RegisterProduct';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register';
import Ativacao from './pages/Activate';
import Sales from './pages/Sales';
import SalesHistory from './pages/SalesHistory';


// Rota protegida
function RotaProtegida({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('token') !== null;
});
  const logout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
};

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
              <Dashboard onLogout={logout} />
            </RotaProtegida>
          }
        />
        <Route path="/register" element={<Register />} />
        {/* Outras rotas protegidas */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
              <RegisterProduct />
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
        <Route
          path="/vendas"
          element={
            <RotaProtegida isLoggedIn={isLoggedIn}>
              <Sales />
            </RotaProtegida>
          }
        />
        <Route 
          path='historico_vendas'
          element={
            <RotaProtegida isLoggedIn={isLoggedIn}>
              <SalesHistory />
            </RotaProtegida>
          }
          />
      </Routes>
    </Router>
  );
}

export default App;
