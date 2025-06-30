import bcrypt from "bcrypt";
import db from "../database/ConecxaoMySql.js";

// Cadastro
export const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  if (senha.length < 6) {
    return res.status(400).json({ error: "Senha deve ter pelo menos 6 caracteres" });
  }

  try {
    const [results] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);

    if (results.length > 0) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    await db.query(
      "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, hashedSenha]
    );

    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Login
export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  try {
    const [results] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const user = results[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    return res.json({
      message: "Login realizado com sucesso",
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
