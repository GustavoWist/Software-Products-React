import { useState } from 'react';
import "./style.css"
export default function RegisterProduct() {
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    quantidade: '',
    status: 'Inativo',
    imagem: null,
  });

  const [produtoSalvo, setProdutoSalvo] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, imagem: file }));
    setImagemSelecionada(file ? file.name : null);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagemPreview(previewUrl);
    } else {
      setImagemPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('nome', form.nome);
    data.append('preco', form.preco);
    data.append('quantidade', form.quantidade);
    data.append('status', form.status);

    if (form.imagem) {
      data.append('imagem', form.imagem);
    }

    const token = localStorage.getItem("token");

    fetch('http://localhost:5000/register_produto', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Produto registrado com sucesso:', data);
        setProdutoSalvo(true);
      })
      .catch((error) => {
        console.error('Erro ao registrar produto:', error);
      });
  };

  const handleNovoRegistro = () => {
    setForm({
      nome: '',
      preco: '',
      quantidade: '',
      status: 'Inativo',
      imagem: null,
    });
    setImagemSelecionada(null);
    setImagemPreview(null);
    setProdutoSalvo(false);
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-form-container">
        <h2>Registrar Produto</h2>

        {produtoSalvo ? (
          <>
            <p className="register-success-message">Produto registrado com sucesso!</p>
            <button className="register-button" onClick={handleNovoRegistro}>
              Registrar Outro Produto
            </button>
          </>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label className="register-form-label">Nome do Produto:</label>
              <input
                className="register-form-input"
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label className="register-form-label">Preço:</label>
              <input
                className="register-form-input"
                type="number"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>

            <div className="register-form-group">
              <label className="register-form-label">Quantidade:</label>
              <input
                className="register-form-input"
                type="number"
                name="quantidade"
                value={form.quantidade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label className="register-form-label">Status:</label>
              <select
                className="register-form-select"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <div className="register-image-upload-container">
              <label htmlFor="upload-img" className="register-custom-upload-label">
                Selecionar Imagem
              </label>
              <input
                id="upload-img"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {imagemSelecionada && <p>Arquivo Selecionado: {imagemSelecionada}</p>}
              {imagemPreview && <img src={imagemPreview} alt="Pré-visualização" />}
            </div>

            <button className="register-button" type="submit">Salvar Produto</button>
          </form>
        )}
      </div>
    </div>
  );
}
