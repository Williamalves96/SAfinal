import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { usuarioService } from "../../../services/usuarioService";

const SidebarLogado = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Função para fazer logout
  const handleLogout = () => {
    usuarioService.removerUsuario();  // limpa o localStorage
    setIsOpen(false);
    navigate("/login");               // redireciona para login (ou "/")
  };

  return (
    <div>
      <header className="sidebar-eco-header">
        <button className="sidebar-eco-menu-button" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FiAlignJustify />}
        </button>

        <div
          className="sidebar-eco-logo-container"
          onClick={() => navigate("/logado")}
          style={{ cursor: "pointer" }}
        >
          <img src="/logo.web.png" alt="Logo" className="sidebar-eco-logo-image" />
          <h1 className="sidebar-eco-logo-text">Eco-Descart</h1>
        </div>
      </header>

      <div ref={sidebarRef} className={`sidebar-eco-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-eco-sidebar-header">Painel do Usuário</div>
        <ul className="sidebar-eco-sidebar-nav">
          <li
            className="sidebar-eco-nav-item"
            onClick={() => {
              navigate("/lista-agendamento");
              setIsOpen(false);
            }}
          >
            Lista de Agendamentos
          </li>
          <li
            className="sidebar-eco-nav-item"
            onClick={() => {
              navigate("/cadastro-pontos-coleta");
              setIsOpen(false);
            }}
          >
            Cadastrar Pontos de Coleta
          </li>
          <li
            className="sidebar-eco-nav-item"
            onClick={() => {
              navigate("/lista-pontos-coleta");
              setIsOpen(false);
            }}
          >
            Pontos de Coleta
          </li>
          <li
            className="sidebar-eco-nav-item"
            onClick={() => {
              navigate("/agendamento");
              setIsOpen(false);
            }}
          >
            Agendar Coleta
          </li>
          <li
            className="sidebar-eco-nav-item"
            onClick={handleLogout}
          >
            Sair
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarLogado;
