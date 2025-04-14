import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';


function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const [erro, setErro] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (data.message === 'Login bem-sucedido.') {
      localStorage.setItem("token", data.token); // <- Aqui!
      onLogin();
      navigate('/dashboard');
    } else {
      setErro(data.error || 'Erro no login.');
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

        <button type="submit">Entrar</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <p>Ainda não tem uma conta?</p>
        <button onClick={handleNavigateToRegister}>Criar conta</button>
      </div>
    </div>
  );
}

export default Login;

