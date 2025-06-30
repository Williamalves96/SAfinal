import React from "react";
import "./LandingPage.css";
import SideBar from "../../SideBar/SideBar";
import Rodape from "../../Rodape/Rodape";

export default function LandingPage() {
  return (<>
    <main className="landing-container">
      <section className="hero-section">
        <p className="subheadline">
          Conectamos pessoas a empresas especializadas no descarte consciente de lixo eletrônico.
        </p>

        <div className="hero-image-container">
          <img
            src="/reciclagem-lixo-eletronico.jpg"
            alt="Ilustração de lixo eletrônico"
            className="hero-image"
          />
        </div>
      </section>

      <section className="info-section">
        <h2>📦 O que é lixo eletrônico?</h2>
        <p>
          Lixo eletrônico, ou e-lixo, refere-se a dispositivos e componentes
          eletrônicos descartados, como celulares, computadores, televisores,
          baterias e carregadores. Muitos desses materiais contêm metais pesados
          e substâncias tóxicas que podem prejudicar o meio ambiente e a saúde
          se descartados de forma inadequada.
        </p>
      </section>

      <section className="problem-section">
        <h2>⚠️ Por que o descarte correto é importante?</h2>
        <ul>
          <li>💧 Evita a contaminação do solo, da água e do ar.</li>
          <li>🔄 Permite a reciclagem de materiais valiosos.</li>
          <li>📜 Atende às normas ambientais e de sustentabilidade.</li>
          <li>🌱 Contribui para um futuro mais limpo e consciente.</li>
        </ul>
      </section>

      <section className="solution-section">
        <h2>🤝 Como o Eco-Descart facilita sua vida?</h2>
        <p>
          Somos a ponte entre você e empresas licenciadas para o recolhimento e
          tratamento do lixo eletrônico. Agende seu descarte com poucos cliques,
          de forma segura, gratuita e responsável.
        </p>
      </section>

      <section className="call-to-action">
        <h3>🚀 Pronto para fazer a diferença?</h3>
        <p>Cadastre-se agora e agende seu primeiro descarte com empresas confiáveis da sua região.</p>
        <button onClick={() => window.location.href = "/cadastro"} className="btn-eco">
          Começar agora
        </button>
      </section>
    </main>
    </>
  );
}
