import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { usuarioService } from "../../../services/usuarioService"; 
import SidebarLogado from "../SidebarLogado/SideBarLogado";
import Rodape from "../Rodape/Rodape";

const API_URL = "http://localhost:3000/ponto_coleta";

export default function PontosDeColeta() {
  const [form, setForm] = useState({
    nome_ponto: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
  });

  const usuarioLogado = usuarioService.obterUsuario();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buscarCep = async () => {
    if (!form.cep || form.cep.length < 8) {
      toast.error("Informe um CEP válido.");
      return;
    }
    try {
      const cepLimpo = form.cep.replace(/\D/g, "");
      const resp = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepLimpo}`);
      setForm((prev) => ({
        ...prev,
        rua: resp.data.street || "",
        bairro: resp.data.neighborhood || "",
        cidade: resp.data.city || "",
        estado: resp.data.state || "",
      }));
      toast.success("Endereço preenchido com sucesso!");
    } catch (error) {
      toast.error("CEP não encontrado ou erro na consulta.");
    }
  };

  const validarCampos = () => {
    const campos = ["nome_ponto", "cep", "estado", "cidade", "bairro", "rua", "numero"];
    for (let campo of campos) {
      if (!form[campo]) {
        toast.error(`Preencha o campo: ${campo.replace("_", " ")}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    try {
      if (!usuarioLogado || !usuarioLogado.id) {
        toast.error("Usuário não autenticado.");
        return;
      }

      const dadosParaSalvar = {
        ...form,
        id_usuario: usuarioLogado.id,
      };

      // Apenas cadastrar, sem edição
      await axios.post(API_URL, dadosParaSalvar);
      toast.success("Ponto de coleta cadastrado!");

      setForm({
        nome_ponto: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
      });
    } catch (error) {
      toast.error("Erro ao salvar ponto de coleta.");
      console.error(error);
    }
  };

  return (
    <>
    <SidebarLogado/><br/><br/><br/>
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>

      <h2 style={{ color: "#08967D", textAlign: "center" }}>Cadastrar Ponto de Coleta</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          ["nome_ponto", "Nome do Ponto"],
          ["cep", "CEP"],
          ["estado", "Estado"],
          ["cidade", "Cidade"],
          ["bairro", "Bairro"],
          ["rua", "Rua"],
          ["numero", "Número"],
        ].map(([name, label]) => (
          <div key={name} style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor={name} style={{ marginBottom: 4 }}>
              {label}:
            </label>
            <input
              type="text"
              id={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              onBlur={name === "cep" ? buscarCep : undefined}
              readOnly={["estado", "cidade", "bairro", "rua"].includes(name)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            backgroundColor: "#08967D",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: 10,
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#077c68")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#08967D")}
        >
          Cadastrar
        </button>
      </form>
    </div>
    <Rodape/>
    </>
  );
}
