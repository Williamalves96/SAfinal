import React from 'react';
import './PaginaInicial.css';
import LandingPage from '../LandingPage/LandingPage';
import SideBar from '../../SideBar/SideBar';

const PaginaInicial = () => {
  return (
    <div className="pagina-inicial">
      <SideBar/>
      <LandingPage/>
    </div>
  );
};

export default PaginaInicial;
