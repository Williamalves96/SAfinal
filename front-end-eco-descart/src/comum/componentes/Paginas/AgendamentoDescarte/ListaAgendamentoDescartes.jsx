import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { usuarioService } from "../../../../services/usuarioService";
import "./AgendamentoDescarte.css";

export default function ListaAgendamentoDescarte() {
  const usuarioLogado = usuarioService.obterUsuario();

  const [agendamentos, setAgendamentos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    tamanho: "Pequeno",
    data: "",
    hora: "",
    pontoColetaId: "",
  });
  const [pontosDisponiveis, setPontosDisponiveis] = useState([]);

  // Buscar pontos de coleta
  useEffect(() => {
    async function fetchPontos() {
      try {
        const res = await axios.get("http://localhost:3000/ponto_coleta");
        setPontosDisponiveis(res.data);
      } catch {
        toast.error("Erro ao carregar pontos de coleta.");
      }
    }
    fetchPontos();
  }, []);

  // Buscar agendamentos do usuário
  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const res = await axios.get(
          `http://localhost:3000/agendamento?usuarioId=${usuarioLogado.id}`
        );
        setAgendamentos(res.data);
      } catch {
        toast.error("Erro ao carregar agendamentos.");
      }
    }
    fetchAgendamentos();
  }, [usuarioLogado.id]);

  // Iniciar edição com os dados do agendamento
  const iniciarEdicao = (agendamento) => {
    const [data, hora] = agendamento.data_hora.split("T");
    setFormData({
      nome: agendamento.nome_item,
      tamanho: agendamento.tamanho_item,
      data,
      hora,
      pontoColetaId: agendamento.id_ponto_coleta,
    });
    setEditandoId(agendamento.id_agendamento);
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({
      nome: "",
      tamanho: "Pequeno",
      data: "",
      hora: "",
      pontoColetaId: "",
    });
  };

  // Atualizar formulário na edição
  const handleChange = (e) => {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  // Salvar edição
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
        id_ponto_coleta: pontoColetaId,
      });
      toast.success("Agendamento atualizado!");

      // Atualizar lista localmente
      setAgendamentos((old) =>
        old.map((a) =>
          a.id_agendamento === editandoId
            ? {
                ...a,
                nome_item: nome,
                tamanho_item: tamanho,
                data_hora: `${data}T${hora}`,
                id_ponto_coleta: pontoColetaId,
              }
            : a
        )
      );

      cancelarEdicao();
    } catch {
      toast.error("Erro ao atualizar agendamento.");
    }
  };

  // Excluir agendamento
  const excluirAgendamento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) return;

    try {
      await axios.delete(`http://localhost:3000/agendamento/${id}`);
      toast.success("Agendamento excluído.");

      setAgendamentos((old) => old.filter((a) => a.id_agendamento !== id));
    } catch {
      toast.error("Erro ao excluir agendamento.");
    }
  };

  return (
    <div className="lista-agendamento">
      <h2>Meus Agendamentos</h2>

      {agendamentos.length === 0 && <p>Nenhum agendamento encontrado.</p>}

      <ul>
        {agendamentos.map((a) =>
          editandoId === a.id_agendamento ? (
            <li key={a.id_agendamento} className="editando">
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome do produto"
              />
              <select name="tamanho" value={formData.tamanho} onChange={handleChange}>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
              <input name="data" type="date" value={formData.data} onChange={handleChange} />
              <input name="hora" type="time" value={formData.hora} onChange={handleChange} />
              <select
                name="pontoColetaId"
                value={formData.pontoColetaId}
                onChange={handleChange}
              >
                <option value="">Selecione um ponto de coleta</option>
                {pontosDisponiveis.map((p) => (
                  <option key={p.id_ponto_coleta} value={p.id_ponto_coleta}>
                    {p.nome_ponto} — {p.bairro}
                  </option>
                ))}
              </select>

              <button onClick={salvarEdicao}>Salvar</button>
              <button onClick={cancelarEdicao}>Cancelar</button>
            </li>
          ) : (
            <li key={a.id_agendamento}>
              <strong>{a.nome_item}</strong> — {a.tamanho_item} —{" "}
              {a.data_hora.replace("T", " ")} — Ponto: {a.id_ponto_coleta}
              <button onClick={() => iniciarEdicao(a)}>Editar</button>
              <button onClick={() => excluirAgendamento(a.id_agendamento)}>Excluir</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
