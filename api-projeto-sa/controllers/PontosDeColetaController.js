import db from "../database/ConecxaoMySql.js";

export async function cadastrarPontoColeta(req, res) {
  const { nome_ponto, cep, estado, cidade, bairro, rua, numero } = req.body;

  if (!nome_ponto || !cep || !estado || !cidade || !bairro || !rua || !numero) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO ponto_coleta (nome_ponto, cep, estado, cidade, bairro, rua, numero)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome_ponto, cep, estado, cidade, bairro, rua, numero]
    );

    res.status(201).json({ id: result.insertId, mensagem: "Ponto cadastrado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar ponto de coleta." });
  }
}

export async function listarPontosColeta(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM ponto_coleta");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar pontos de coleta." });
  }
}

export async function buscarPontoPorId(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM ponto_coleta WHERE id_ponto_coleta = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Ponto não encontrado." });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar ponto de coleta." });
  }
}

export async function atualizarPontoColeta(req, res) {
  const { id } = req.params;
  const { nome_ponto, cep, estado, cidade, bairro, rua, numero } = req.body;

  if (!nome_ponto || !cep || !estado || !cidade || !bairro || !rua || !numero) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    const [result] = await db.query(
      `UPDATE ponto_coleta
       SET nome_ponto = ?, cep = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, numero = ?
       WHERE id_ponto_coleta = ?`,
      [nome_ponto, cep, estado, cidade, bairro, rua, numero, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Ponto não encontrado." });
    }

    res.json({ mensagem: "Ponto atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar ponto de coleta." });
  }
}

export async function excluirPontoColeta(req, res) {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM ponto_coleta WHERE id_ponto_coleta = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Ponto não encontrado." });
    }

    res.json({ mensagem: "Ponto excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao excluir ponto de coleta." });
  }
}
