import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Perguntas = () => {
  const [selecionadas, setSelecionadas] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const perguntas = [
    "Nome da Startup?",
    "Site da Startup?",
    "Linkedin da Startup?",
    "Ano de fundação?",
    "Cidade onde a startup está localizada?",
    "Qual é o seu modelo de negócio?",
    "Qual sua vertical de atuação?",
    "Qual problema você se propõe a resolver?",
    "Que solução você entrega para o problema apresentado?",
    "Quem é seu cliente ideal?",
    "Qual sua proposta de valor?",
    "Qual o nível de maturidade da sua Startup?",
    "Qual a quantidade de colaboradores por operação?",
    "Qual sua estratégia de aquisição de clientes?",
    "Qual o tamanho da sua base de clientes?",
    "Como está estruturado seu plano de crescimento?",
    "Qual seu maior desafio e como pretende resolvê-lo?",
    "Liste as 5 principais tecnologias desenvolvidas e utilizadas em seu modelo de negócios.",
    "Selecione tecnologias que apresentam sinergia com sua startup e defina o nível de impacto para o seu negócio hoje.",
    "Descreva o tamanho do seu mercado indicando seu TAM, SAM e SOM.",
    "Liste seus principais concorrentes.",
    "Qual sua principal fonte de receita?",
    "Já recebeu algum investimento antes?",
    "Qual seu MRR?",
    "Qual o valor da sua última captação?",
    "Qual seu ticket médio?",
    "Qual percentual de equity negociado na última captação?",
    "Está com rodada de captação aberta?",
    "Quanto está buscando de investimento?",
    "Qual o percentual de equity disponível na rodada atual?",
    "Qual seu valuation?",
    "Atualmente, qual o percentual de cap table dos sócios/founders?",
    "Existe uma estratégia de saída da Startup? Qual?",
    "Como serão alocados os recursos recebidos?",
    "Tem um pitch gravado ou PDF de apresentação? Informe o link aqui",
  ];

  const handleChange = (value) => {
    setErro(""); // Limpa o erro ao fazer uma seleção
    setSelecionadas((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const gerarFormulario = () => {
    if (selecionadas.length > 0) {
      navigate("/FormularioPerguntas", { state: { perguntas: selecionadas } });
    } else {
      setErro("Selecione pelo menos uma pergunta antes de continuar.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#FFFFFF",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#E0E7FF",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          cursor: "pointer",
          marginBottom: "16px",
          color: "#4C51BF",
          fontWeight: "bold",
          fontSize: "14px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#C3DAFE")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#E0E7FF")}
      >
        ← Voltar
      </button>

      <h1
        style={{
          fontSize: "28px",
          marginBottom: "16px",
          color: "#2D3748",
          fontWeight: "700",
        }}
      >
        Selecionar Perguntas
      </h1>
      <p style={{ marginBottom: "16px", color: "#4A5568", fontSize: "16px" }}>
        Marque as perguntas que deseja responder e clique em "Gerar Formulário".
      </p>

      {erro && (
        <p
          style={{
            color: "#E53E3E",
            fontSize: "14px",
            marginBottom: "16px",
            fontWeight: "500",
          }}
        >
          {erro}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxHeight: "400px",
          overflowY: "auto",
          padding: "12px",
          backgroundColor: "#F7FAFC",
          borderRadius: "8px",
          border: "1px solid #E2E8F0",
        }}
      >
        {perguntas.map((pergunta, index) => (
          <label
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              color: "#2D3748",
              padding: "8px",
              borderRadius: "6px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#EDF2F7")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <input
              type="checkbox"
              value={pergunta}
              onChange={() => handleChange(pergunta)}
              checked={selecionadas.includes(pergunta)}
              style={{ marginRight: "12px", transform: "scale(1.2)" }}
            />
            {pergunta}
          </label>
        ))}
      </div>

      <button
        style={{
          marginTop: "24px",
          padding: "12px 20px",
          backgroundColor: "#3182CE",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#2B6CB0")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#3182CE")}
        onClick={gerarFormulario}
      >
        Gerar Formulário
      </button>
    </div>
  );
};

export default Perguntas;
