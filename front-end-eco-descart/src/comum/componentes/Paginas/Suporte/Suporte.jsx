import React, { useState } from "react";
import "./Suporte.css";
import SideBar from "../../SideBar/SideBar";

export default function Suporte() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    alert("Mensagem enviada com sucesso!");
    setNome("");
    setEmail("");
    setMensagem("");
  };

  return (
    <>
      <SideBar />
      <main className="suporte-container">
        <h1>Fale com o Suporte</h1>
        <p>
          Tem dúvidas, sugestões ou precisa de ajuda? Estamos aqui para ajudar
          você em todo o processo de descarte consciente.
        </p>

        <form onSubmit={handleSubmit} className="suporte-form">
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="suporte-input"
          />
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="suporte-input"
          />
          <textarea
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="suporte-textarea"
            rows="6"
          />
          <button type="submit" className="suporte-button">
            Enviar mensagem
          </button>
        </form>

        <section className="suporte-section">
          <h2>Como funciona o agendamento?</h2>
          <ol className="suporte-steps">
            <li>
              <strong>1.</strong> Faça seu cadastro com nome, email e senha.
            </li>
            <li>
              <strong>2.</strong> Acesse sua conta e vá para "Agendar Coleta".
            </li>
            <li>
              <strong>3.</strong> Escolha o tipo de item (pequeno, médio ou
              grande).
            </li>
            <li>
              <strong>4.</strong> Informe a data e horário desejado para a
              coleta.
            </li>
            <li>
              <strong>5.</strong> Aguarde a confirmação de uma empresa parceira.
              Pronto!
            </li>
          </ol>
        </section>

        <section className="suporte-section">
          <h2>Em que podemos te ajudar?</h2>
          <ul className="suporte-ajuda">
            <li>❓ Dúvidas sobre cadastro ou login</li>
            <li>📅 Alterações ou cancelamento de agendamento</li>
            <li>📦 Informações sobre o que pode ser descartado</li>
            <li>🚚 Status da coleta agendada</li>
            <li>💬 Suporte técnico ou sugestões</li>
          </ul>
          <p>
            Estamos comprometidos em oferecer um atendimento rápido, claro e
            eficaz.
          </p>
        </section>
      </main>
    </>
  );
}
