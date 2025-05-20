// src/Ativacao.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Ativacao() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });

    const data = await response.json();

    if (data.message) {
      setMensagem(data.message);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMensagem(data.error || 'Erro na ativação.');
    }
  };

  return (
    <div className="ativacao-container">
      <h2>Ativar Conta</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Código de Ativação:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button type="submit">Ativar</button>
      </form>
    </div>
  );
}

