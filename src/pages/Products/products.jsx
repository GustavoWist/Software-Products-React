import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Products() {
  const [produtos, setProdutos] = useState([]);
  const [uploadingId, setUploadingId] = useState(null);

  const fetchProdutos = () => {
    fetch("http://localhost:5000/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleImagemUpload = (produtoId, file) => {
    const formData = new FormData();
    formData.append("imagem", file);
    setUploadingId(produtoId);

    fetch(`http://localhost:5000/produtos/${produtoId}/imagem`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        fetchProdutos();
        setUploadingId(null);
      })
      .catch((err) => {
        console.error("Erro ao enviar imagem:", err);
        setUploadingId(null);
      });
  };

  return (
    <>
      <h1>Produtos</h1>
      <div className="product-container">
        {produtos.map((produto) => (
          <div key={produto.id} className="product-card">
            <Link
              to={`/produto/${produto.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3>{produto.nome}</h3>
              <p>
                <strong>Preço:</strong> R$ {produto.preco}
              </p>
              <p>
                <strong>Quantidade:</strong> {produto.quantidade}
              </p>
              <p>
                <strong>Status:</strong> {produto.status}
              </p>
            </Link>

            {produto.imagem ? (
              <img
                src={`http://localhost:5000${produto.imagem}`}
                alt={produto.nome}
              />
            ) : (
               <div className="image-upload-container">
                <p className="no-image">Sem imagem</p>
              
                <label htmlFor={`upload-${produto.id}`} className="custom-upload-label">
                  Adicionar imagem
                </label>
                <input
                  id={`upload-${produto.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleImagemUpload(produto.id, file);
                  }}
                />
              
                {uploadingId === produto.id && (
                  <p className="uploading">Enviando imagem...</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

