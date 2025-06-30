import express from "express";
import cors from "cors";
import { cadastrarUsuario, loginUsuario } from "./controllers/UsuarioControllers.js";
import {
  cadastrarAgendamento,
  atualizarAgendamento,
  excluirAgendamento,
  listarAgendamentos,
} from "./controllers/AgendamentoControllers.js";
import {
  cadastrarPontoColeta,
  listarPontosColeta,
  buscarPontoPorId,
  atualizarPontoColeta,
  excluirPontoColeta,
} from "./controllers/PontosDeColetaController.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas usuário
app.post("/cadastro", cadastrarUsuario);
app.post("/login", loginUsuario);

// Rotas agendamento
app.post("/agendamento", cadastrarAgendamento);
app.get("/agendamento", listarAgendamentos);  
app.put("/agendamento/:id", atualizarAgendamento);
app.delete("/agendamento/:id", excluirAgendamento); 

// Rotas ponto_coleta
app.post("/ponto_coleta", cadastrarPontoColeta);
app.get("/ponto_coleta", listarPontosColeta);
app.get("/ponto_coleta/:id", buscarPontoPorId);
app.put("/ponto_coleta/:id", atualizarPontoColeta);
app.delete("/ponto_coleta/:id", excluirPontoColeta);

// Rota raiz
app.get("/", (req, res) => {
  res.send("API EcoDescart funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
