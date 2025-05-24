import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterProduct from './pages/RegisterProduct';
import Products from './pages/Products';
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

export default function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('token') !== null;
});
  const logout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false); // o useEffect acima cuidará do redirecionamento
};

  return (
    <Routes>
      <Route path="/" element={
        isLoggedIn ? <Navigate to='./dashboard' replace /> :
        <Home />} />
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => 
            setIsLoggedIn(true)} />
        }
      />
      <Route
        path="/register"
        element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />
      <Route path="/ativar" element={<Ativacao />} />
      <Route
        path="/dashboard"
        element={
          <RotaProtegida isLoggedIn={isLoggedIn}>
            <Dashboard onLogout={logout} />
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
        path="/historico_vendas"
        element={
          <RotaProtegida isLoggedIn={isLoggedIn}>
            <SalesHistory />
          </RotaProtegida>
        }
      />
    </Routes>
  );
}
