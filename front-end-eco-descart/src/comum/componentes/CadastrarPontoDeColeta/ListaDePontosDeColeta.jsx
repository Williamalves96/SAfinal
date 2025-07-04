import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { usuarioService } from "../../../services/usuarioService"; // ajuste o caminho conforme seu projeto
import SidebarLogado from "../SidebarLogado/SideBarLogado";
import "./ListaDePontosDeColeta.css";

const API_URL = "http://localhost:3000/ponto_coleta";

export default function ListaDePontosDeColeta() {
  const [pontos, setPontos] = useState([]);
  const usuarioLogado = usuarioService.obterUsuario('usuarioLogado');

  useEffect(() => {
    fetchPontos();
  }, []);

  async function fetchPontos() {
    try {
      const res = await axios.get(API_URL);
      setPontos(res.data);
    } catch (error) {
      toast.error("Erro ao buscar pontos de coleta");
      console.error(error);
    }
  }

  return (
    <>
      <SidebarLogado />
      <br />
      <br />
      <br />
      <div className="lista-pontos-container">

        <h3 className="titulo-lista">Pontos de Coleta Cadastrados</h3>
        <br />
        <table className="lista-pontos-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CEP</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Bairro</th>
              <th>Rua</th>
              <th>Número</th>
            </tr>
          </thead>
          <tbody>
            {pontos.length === 0 && (
              <tr>
                <td colSpan={7} className="sem-pontos">
                  Nenhum ponto de coleta cadastrado.
                </td>
              </tr>
            )}

            {pontos.map((ponto) => (
              <tr key={ponto.id_ponto_coleta}>
                <td>{ponto.nome_ponto}</td>
                <td>{ponto.cep}</td>
                <td>{ponto.estado}</td>
                <td>{ponto.cidade}</td>
                <td>{ponto.bairro}</td>
                <td>{ponto.rua}</td>
                <td>{ponto.numero}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
