import React, { useState, useEffect } from "react";
import "./AgendamentoDescarte.css";
import SidebarLogado from "../../SidebarLogado/SideBarLogado";
import { usuarioService } from "../../../../services/usuarioService";
import axios from "axios";
import { toast } from "react-toastify";

export default function AgendamentoDescarte({ onAgendar }) {
  const usuarioLogado = usuarioService.obterUsuario();

  const [nome, setNome] = useState("");
  const [tamanho, setTamanho] = useState("pequeno");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [pontoColetaId, setPontoColetaId] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    tamanho: "pequeno",
    data: "",
    hora: "",
    pontoColetaId: "",
  });

  const [pontosDisponiveis, setPontosDisponiveis] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/ponto_coleta");
        setPontosDisponiveis(resp.data);
      } catch (error) {
        console.error("Erro ao carregar pontos de coleta:", error);
        toast.error("Erro ao carregar pontos de coleta.");
      }
    };

    void fetchPontos();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:3000/agendamento?id=${usuarioLogado.id}`
      );
      setAgendamentos(resp.data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      toast.error("Erro ao carregar agendamentos.");
    }
  };

  useEffect(() => {
    if (usuarioLogado?.id) {
      void carregarAgendamentos();
    }
  }, [usuarioLogado]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !data || !hora || !pontoColetaId) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/agendamento", {
        nome_item: nome,
        tamanho_item: tamanho,
        data_hora: `${data}T${hora}`,
        id_usuario: usuarioLogado.id,
        id_ponto_coleta: Number(pontoColetaId),
      });

      toast.success("Agendamento realizado com sucesso!");
      setNome("");
      setTamanho("pequeno");
      setData("");
      setHora("");
      setPontoColetaId("");
      await carregarAgendamentos();
      if (onAgendar) onAgendar();
    } catch (err) {
      console.error("Erro no agendamento:", err);
      toast.error("Erro ao agendar, tente novamente.");
    }
  };

  const iniciarEdicao = (agendamento) => {
    const [dataPart, horaPart] = agendamento.data_hora.split("T");
    setFormData({
      nome: agendamento.nome_item,
      tamanho: agendamento.tamanho_item,
      data: dataPart,
      hora: horaPart,
      pontoColetaId: agendamento.id_ponto_coleta.toString(),
    });
    setEditandoId(agendamento.id_agendamento);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({
      nome: "",
      tamanho: "pequeno",
      data: "",
      hora: "",
      pontoColetaId: "",
    });
  };

  const handleChange = (e) => {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const salvarEdicao = async () => {
    const { nome, tamanho, data, hora, pontoColetaId } = formData;

    if (!nome || !data || !hora || !pontoColetaId) {
      toast.warn("Preencha todos os campos para editar!");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/agendamento/${editandoId}`, {
        nome_item: nome,
        tamanho_item: tamanho,
        data_hora: `${data}T${hora}`,
        id_usuario: usuarioLogado.id,
        id_ponto_coleta: Number(pontoColetaId),
      });

      toast.success("Agendamento atualizado com sucesso!");
      cancelarEdicao();
      await carregarAgendamentos();
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      toast.error("Erro ao atualizar agendamento.");
    }
  };

  const excluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este agendamento?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/agendamento/${id}`);
      toast.success("Agendamento excluído.");
      setAgendamentos((old) => old.filter((a) => a.id_agendamento !== id));
    } catch (err) {
      console.error("Erro ao excluir agendamento:", err);
      toast.error("Erro ao excluir agendamento.");
    }
  };

  if (!usuarioLogado) {
    toast.error("Você precisa estar logado para agendar.");
    return <div>Usuário não logado. Faça login para continuar.</div>;
  }

  return (
    <>
      <SidebarLogado />
      <form onSubmit={handleSubmit} className="form-agendamento">
        <h2>Agendar Descarte</h2>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input-eco"
          disabled={editandoId !== null}
        />

        <select
          value={tamanho}
          onChange={(e) => setTamanho(e.target.value)}
          className="input-eco"
          disabled={editandoId !== null}
        >
          <option value="pequeno">Pequeno</option>
          <option value="medio">Médio</option>
          <option value="grande">Grande</option>
        </select>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="input-eco"
          disabled={editandoId !== null}
        />

        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="input-eco"
          disabled={editandoId !== null}
        />

        <select
          value={pontoColetaId}
          onChange={(e) => setPontoColetaId(e.target.value)}
          className="input-eco"
          disabled={editandoId !== null}
        >
          <option value="">Selecione um ponto de coleta</option>
          {pontosDisponiveis.map((p) => (
            <option key={p.id_ponto_coleta} value={p.id_ponto_coleta}>
              {p.nome_ponto} — {p.localizacao || p.bairro}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn-eco"
          disabled={editandoId !== null}
        >
          Agendar
        </button>
      </form>

      <hr />

      <h2>Meus Agendamentos</h2>

      <table className="tabela-agendamentos">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Tamanho</th>
            <th>Data e Hora</th>
            <th>Ponto de Coleta</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Nenhum agendamento encontrado.
              </td>
            </tr>
          ) : (
            agendamentos.map((a) =>
              editandoId === a.id_agendamento ? (
                <tr key={a.id_agendamento}>
                  <td>
                    <input
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="input-eco"
                    />
                  </td>
                  <td>
                    <select
                      name="tamanho"
                      value={formData.tamanho}
                      onChange={handleChange}
                      className="input-eco"
                    >
                      <option value="pequeno">Pequeno</option>
                      <option value="medio">Médio</option>
                      <option value="grande">Grande</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      className="input-eco"
                    />
                    <input
                      type="time"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                      className="input-eco"
                    />
                  </td>
                  <td>
                    <select
                      name="pontoColetaId"
                      value={formData.pontoColetaId}
                      onChange={handleChange}
                      className="input-eco"
                    >
                      <option value="">Selecione</option>
                      {pontosDisponiveis.map((p) => (
                        <option
                          key={p.id_ponto_coleta}
                          value={p.id_ponto_coleta}
                        >
                          {p.nome_ponto} — {p.localizacao || p.bairro}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={salvarEdicao}
                      className="btn-eco btn-success"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelarEdicao}
                      className="btn-eco btn-cancel"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={a.id_agendamento}>
                  <td>{a.nome_item}</td>
                  <td>{a.tamanho_item}</td>
                  <td>{new Date(a.data_hora).toLocaleString()}</td>
                  <td>
                    {pontosDisponiveis.find(
                      (p) => p.id_ponto_coleta === a.id_ponto_coleta
                    )?.nome_ponto || "—"}
                  </td>
                  <td>
                    <button
                      onClick={() => iniciarEdicao(a)}
                      className="btn-eco btn-edit"
                      disabled={editandoId !== null}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluir(a.id_agendamento)}
                      className="btn-eco btn-delete"
                      disabled={editandoId !== null}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </>
  );
}
