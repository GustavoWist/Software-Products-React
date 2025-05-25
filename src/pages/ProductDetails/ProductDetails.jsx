import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [imagemFile, setImagemFile] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProduto(data);
        } else {
          setError("Produto não encontrado.");
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar produto:", err);
        setError("Erro ao carregar o produto.");
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      setImagemPreview(URL.createObjectURL(file));
    }
  };

  const salvarAlteracoes = async () => {
    try {
      await fetch(`http://localhost:5000/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produto),
      });

      if (imagemFile) {
        const formData = new FormData();
        formData.append("imagem", imagemFile);

        await fetch(`http://localhost:5000/produtos/${id}/imagem`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      alert("Produto atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar alterações:", err);
      alert("Erro ao salvar alterações.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-product-container">
      <h1>Editar Produto</h1>

      {imagemPreview || produto.imagem ? (
        <img
          src={imagemPreview || `http://localhost:5000${produto.imagem}`}
          alt={produto.nome}
          className="product-image"
        />
      ) : (
        <p className="no-image">Sem imagem</p>
      )}

      <div className="input-group">
        <label>Nome:</label>
        <input name="nome" value={produto.nome} onChange={handleInputChange} />
      </div>

      <div className="input-group">
        <label>Preço:</label>
        <input name="preco" value={produto.preco} onChange={handleInputChange} />
      </div>

      <div className="input-group">
        <label>Quantidade:</label>
        <input name="quantidade" value={produto.quantidade} onChange={handleInputChange} />
      </div>

      <div className="input-group">
        <label>Status:</label>
        <select name="status" value={produto.status} onChange={handleInputChange}>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <div className="image-upload-container">
        <label htmlFor={`upload-${produto.id}`} className="custom-upload-label">
          Atualizar imagem
        </label>
        <input
          id={`upload-${produto.id}`}
          type="file"
          accept="image/*"
          onChange={handleImagemChange}
        />
      </div>

      <button onClick={salvarAlteracoes} className="save-button">
        Salvar Alterações
      </button>
    </div>
  );
}
