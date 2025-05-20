import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    celular: '',
    senha: ''
  });

  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setMensagem(null);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(data.message || 'Usuário registrado com sucesso!');
        setTimeout(() => {
          navigate('/ativar');
        }, 3000); // redireciona após 3s
      } else {
        setErro(data.error || 'Erro no registro.');
      }
    } catch (err) {
      console.log(err)
      setErro('Erro na conexão com o servidor.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar Conta</h2>
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

        <label>CNPJ:</label>
        <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Celular (com DDD):</label>
        <input type="text" name="celular" value={formData.celular} onChange={handleChange} required />

        <label>Senha:</label>
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

