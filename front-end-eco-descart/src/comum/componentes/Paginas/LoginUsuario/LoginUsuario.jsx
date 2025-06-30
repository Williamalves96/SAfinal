import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { usuarioService } from "../../../../services/usuarioService"; 
import "./LoginUsuario.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.warn("Preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha,
      });

      const user = response.data.user;

      // Salva usuário no localStorage
      usuarioService.salvarUsuario(user);

      toast.success("Login realizado com sucesso!");

      if (onLogin) onLogin(user);
      setTimeout(() => navigate("/logado"), 2000);
    } catch (error) {
      const msg =
        error.response?.data?.error || "Erro ao fazer login. Tente novamente.";
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Login</h2>
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
        Entrar
      </button>

      <p className="cadastro-link">
        Ainda não tem uma conta?{" "}
        <span
          onClick={() => navigate("/cadastro")}
          style={{ color: "#08967D", cursor: "pointer", fontWeight: "bold" }}
        >
          Cadastre-se
        </span>
      </p>
    </form>
  );
}
