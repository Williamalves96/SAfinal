import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
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

  return (
    <div>
      <header className="sidebar-eco-header">
  <button className="sidebar-eco-menu-button" onClick={toggleSidebar}>
    {isOpen ? <FaTimes /> : <FiAlignJustify />}
  </button>

  <div className="sidebar-eco-logo-container" onClick={() => navigate("/")}>
    <img src="/logo.web.png" alt="Logo" className="sidebar-eco-logo-image" />
    <h1 className="sidebar-eco-logo-text">Eco-Descart</h1>
  </div>

  <div className="sidebar-eco-auth-buttons">
    <button
      className="sidebar-eco-auth-button"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
    <button
      className="sidebar-eco-auth-button"
      onClick={() => navigate("/cadastro")}
    >
      Cadastro
    </button>
  </div>
</header>

<div ref={sidebarRef} className={`sidebar-eco-sidebar ${isOpen ? "open" : ""}`}>
  <div className="sidebar-eco-sidebar-header">Menu</div>
  <ul className="sidebar-eco-sidebar-nav">
    <li className="sidebar-eco-nav-item" onClick={() => { navigate("/"); setIsOpen(false); }}>Início</li>
    <li className="sidebar-eco-nav-item" onClick={() => { navigate("/sobre"); setIsOpen(false); }}>Sobre nós</li>
    <li className="sidebar-eco-nav-item" onClick={() => { navigate("/suporte"); setIsOpen(false); }}>Suporte</li>
  </ul>
</div>

    </div>
  );
};

export default SideBar;
