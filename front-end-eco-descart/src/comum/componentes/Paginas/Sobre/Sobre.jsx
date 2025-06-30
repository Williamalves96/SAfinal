import React from "react";
import "./Sobre.css";
import SideBar from "../../SideBar/SideBar";
import Rodape from "../../Rodape/Rodape";

export default function Sobre() {
  return (<>
    <SideBar/>
    <main className="sobre-container">
      <section className="sobre-section">
        <h1 className="sobre-titulo">Quem Somos</h1>
        <p>
          O <strong>Eco-Descart</strong> nasceu com o propósito de promover o descarte
          correto de lixo eletrônico, conectando pessoas e empresas a pontos
          de coleta responsáveis, licenciados e ambientalmente comprometidos.
        </p>
        <p>
          Atendemos clientes que desejam se livrar de eletrônicos antigos com segurança,
          e empresas que buscam otimizar seu processo de logística reversa.
        </p>
      </section>

      <section className="sobre-section">
        <h2 className="sobre-subtitulo">💡 Nossa Solução</h2>
        <p>
          Unimos tecnologia e consciência ambiental para oferecer uma plataforma simples
          e eficiente de agendamento de coletas. Ao invés de deixar seus dispositivos
          eletrônicos acumulando poeira ou indo parar no lixo comum, você agenda a coleta
          conosco e garantimos o destino certo.
        </p>
      </section>

      <section className="sobre-section">
        <h2 className="sobre-subtitulo">🚛 Como Funciona</h2>
        <ul className="sobre-lista">
          <li>Você se cadastra gratuitamente na plataforma.</li>
          <li>Seleciona o tipo de equipamento que deseja descartar.</li>
          <li>Escolhe o dia e hora da coleta, de acordo com sua disponibilidade.</li>
          <li>Uma empresa parceira realiza a coleta no local agendado.</li>
          <li>O lixo eletrônico é destinado corretamente, com foco em reciclagem e segurança.</li>
        </ul>
      </section>

      <section className="sobre-section">
        <h2 className="sobre-subtitulo">🌱 Compromisso com o Meio Ambiente</h2>
        <p>
          Todos os parceiros da nossa plataforma são empresas regularizadas que seguem
          normas ambientais e de segurança. Além disso, incentivamos práticas de economia
          circular e reaproveitamento de componentes eletrônicos.
        </p>
      </section>

      <section className="sobre-section">
        <h2 className="sobre-subtitulo">🤝 Nossos Valores</h2>
        <ul className="sobre-lista">
          <li>Responsabilidade ambiental</li>
          <li>Transparência com usuários e parceiros</li>
          <li>Inovação com propósito</li>
          <li>Conexão entre pessoas, tecnologia e sustentabilidade</li>
        </ul>
      </section>
    </main>
    <Rodape/>
    </>
  );
}
