import db from "../database/ConecxaoMySql.js";

// Cadastrar agendamento
export const cadastrarAgendamento = (req, res) => {
  const { nome_item, tamanho_item, data_hora, id_usuario, id_ponto_coleta } = req.body;

  if (!nome_item || !tamanho_item || !data_hora || !id_usuario || !id_ponto_coleta) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
  }

  const query = `
    INSERT INTO agendamento 
    (nome_item, tamanho_item, data_hora, id_usuario, id_ponto_coleta)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [nome_item, tamanho_item, data_hora, id_usuario, id_ponto_coleta],
    (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar agendamento:", err);
        return res.status(500).json({ error: "Erro ao cadastrar agendamento" });
      }
      return res.status(201).json({ message: "Agendamento cadastrado com sucesso", id: result.insertId });
    }
  );
};

// Listar agendamentos (com filtro opcional por usuário)
export const listarAgendamentos = (req, res) => {
  const usuarioId = req.query.id_usuario;

  let query = `SELECT * FROM agendamento`;
  const params = [];

  if (usuarioId) {
    query += ` WHERE id_usuario = ?`;
    params.push(usuarioId);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro ao listar agendamentos:", err);
      return res.status(500).json({ error: "Erro ao listar agendamentos" });
    }
    res.json(results);
  });
};


// Atualizar agendamento
export const atualizarAgendamento = (req, res) => {
  const { id } = req.params;
  const { nome_item, tamanho_item, data_hora, id_usuario, id_ponto_coleta } = req.body;

  if (!id || !nome_item || !tamanho_item || !data_hora || !id_usuario || !id_ponto_coleta) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
  }

  const query = `
    UPDATE agendamento 
    SET nome_item = ?, tamanho_item = ?, data_hora = ?, id_usuario = ?, id_ponto_coleta = ?
    WHERE id_agendamento = ?
  `;

  db.query(
    query,
    [nome_item, tamanho_item, data_hora, id_usuario, id_ponto_coleta, id],
    (err) => {
      if (err) {
        console.error("Erro ao atualizar agendamento:", err);
        return res.status(500).json({ error: "Erro ao atualizar agendamento" });
      }
      return res.status(200).json({ message: "Agendamento atualizado com sucesso" });
    }
  );
};

// Excluir agendamento
export const excluirAgendamento = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID do agendamento é obrigatório" });
  }

  const query = `DELETE FROM agendamento WHERE id_agendamento = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir agendamento:", err);
      return res.status(500).json({ error: "Erro ao excluir agendamento" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }
    return res.status(200).json({ message: "Agendamento excluído com sucesso" });
  });
};
