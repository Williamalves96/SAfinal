import React from "react";
import { Navigate } from "react-router-dom";
import { usuarioService } from "./usuarioService"

export default function RotaProtegida({ children }) {
  const estaLogado = usuarioService.estaLogado();

  if (!estaLogado) {
    // usuário não logado: redireciona para login
    return <Navigate to="/login" replace />;
  }

  // usuário logado: renderiza o componente protegido
  return children;
}
