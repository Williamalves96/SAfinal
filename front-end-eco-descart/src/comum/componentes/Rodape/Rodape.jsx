import "./Rodape.css";

const Rodape = () => {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="rodape_root">
      <div className="rodape-content">
        <p>Copyright © {anoAtual} - Todos os direitos reservados - Eco-Descart.</p>
      </div>
    </footer>
  );
};

export default Rodape;
