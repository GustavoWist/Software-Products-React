import { useState } from 'react';
import './Registrar_produto.css';

function Registrar_produto() {
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    quantidade: '',
    status: 'Inativo',
    imagem: null,
  });

  const [produtoSalvo, setProdutoSalvo] = useState(false); // Novo estado
  const [imagemSelecionada, setImagemSelecionada] = useState(null); // Novo estado para nome do arquivo
  const [imagemPreview, setImagemPreview] = useState(null); // Novo estado para pré-visualização da imagem

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, imagem: file }));
    setImagemSelecionada(file ? file.name : null); // Atualiza o estado com o nome do arquivo

    // Cria a URL para pré-visualização da imagem
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagemPreview(previewUrl);
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
  
    const token = localStorage.getItem("token"); // PEGANDO O TOKEN
  
    fetch('http://localhost:5000/register_produto', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // ENVIANDO O TOKEN NO HEADER
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
    // Reseta o formulário
    setForm({
      nome: '',
      preco: '',
      quantidade: '',
      status: 'Inativo',
      imagem: null,
    });
    setImagemSelecionada(null); // Limpa o nome da imagem selecionada
    setImagemPreview(null); // Limpa a pré-visualização da imagem
    setProdutoSalvo(false);
  };

  return (
    <div className="form-container">
      <h2>Produto Salvo</h2>

      {produtoSalvo ? (
        <>
          <p style={{ color: 'green' }}>Produto registrado com sucesso!</p>
          <button onClick={handleNovoRegistro}>Registrar Outro Produto</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome do Produto:</label><br />
            <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
          </div>

          <div>
            <label>Preço:</label><br />
            <input type="number" name="preco" value={form.preco} onChange={handleChange} step="0.01" required />
          </div>

          <div>
            <label>Quantidade:</label><br />
            <input type="number" name="quantidade" value={form.quantidade} onChange={handleChange} required />
          </div>

          <div>
            <label>Status:</label><br />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <div className="image-upload-container">
            <label htmlFor="upload-img" className="custom-upload-label">
              Selecionar Imagem
            </label>
            <input
              id="upload-img"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}  // Esconde o input de arquivo real
            />
            {/* Exibe o nome do arquivo selecionado */}
            {imagemSelecionada && (
              <p style={{ marginTop: '0.5rem', color: 'gray' }}>
                Arquivo Selecionado: {imagemSelecionada}
              </p>
            )}

            {/* Exibe a pré-visualização da imagem, se houver */}
            {imagemPreview && (
              <div style={{ marginTop: '1rem' }}>
                <img src={imagemPreview} alt="Pré-visualização" style={{ width: '100px', height: 'auto', borderRadius: '8px' }} />
              </div>
            )}
          </div>

          <button type="submit" style={{ marginTop: '1rem' }}>Salvar Produto</button>
        </form>
      )}
    </div>
  );
}

export default Registrar_produto;
