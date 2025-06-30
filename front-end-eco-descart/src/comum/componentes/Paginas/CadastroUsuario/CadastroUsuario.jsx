import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { usuarioService } from "../../../../services/usuarioService";
import "./CadastroUsuario.css";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      toast.warn("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        nome,
        email,
        senha,
      });

      toast.success(response.data.message || "Usuário cadastrado com sucesso!");

      // Se o backend retornar o usuário (ex: response.data.user), salve no localStorage e navegue para logado
      if (response.data.user) {
        usuarioService.salvarUsuario(response.data.user);
        setTimeout(() => navigate("/logado"), 2000);
      } else {
        // Caso contrário, limpe os campos e vá para login
        setNome("");
        setEmail("");
        setSenha("");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        "Erro ao cadastrar. Tente novamente mais tarde.";
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-cadastro">
      <h2>Cadastro de Usuário</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="input-eco"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-eco"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="input-eco"
      />
      <button type="submit" className="btn-eco">
        Cadastrar
      </button>

      <p className="login-link">
        Já tem uma conta?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#08967D", cursor: "pointer", fontWeight: "bold" }}
        >
          Faça login
        </span>
      </p>
    </form>
  );
}
