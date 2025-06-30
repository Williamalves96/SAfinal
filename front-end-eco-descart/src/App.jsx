import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // ✅ Adicione essa linha
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Cabecalho from "./comum/componentes/Cabecalho/Cabecalho";
import PaginaInicial from "./comum/componentes/Paginas/PaginaInicial/PaginaInicial";
import Rodape from "./comum/componentes/Rodape/Rodape";
import Login from "./comum/componentes/Paginas/LoginUsuario/LoginUsuario";
import CadastroUsuario from "./comum/componentes/Paginas/CadastroUsuario/CadastroUsuario";
import AgendamentoDescarte from "./comum/componentes/Paginas/AgendamentoDescarte/AgendamentoDescarte";
import LandingPage from "./comum/componentes/Paginas/LandingPage/LandingPage";
import Sobre from "./comum/componentes/Paginas/Sobre/Sobre";
import Suporte from "./comum/componentes/Paginas/Suporte/Suporte";
import Logado from "./comum/componentes/Paginas/Logado/Logado";
import RotaProtegida from "./services/RotaProtegida";
import ListaDePontosDeColeta from "./comum/componentes/CadastrarPontoDeColeta/ListaDePontosDeColeta";
import PontosDeColeta from "./comum/componentes/CadastrarPontoDeColeta/CadastrarPontoDeColeta";
import ListaAgendamentoDescarte from "./comum/componentes/Paginas/AgendamentoDescarte/ListaAgendamentoDescartes";

const Layout = ({ children }) => (
  <>
    <Cabecalho />
    {children}
    <Rodape />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <PaginaInicial />,
  },
  {
    path: "/logado",
    element: (
      <RotaProtegida>
        <Logado />
      </RotaProtegida>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/cadastro",
    element: (
      <Layout>
        <CadastroUsuario />
      </Layout>
    ),
  },
  {
    path: "/agendamento",
    element: (
      <RotaProtegida>
        <AgendamentoDescarte />
      </RotaProtegida>
    ),
  },
  {
    path: "/lista-pontos-coleta",
    element: (
      <RotaProtegida>
        <ListaDePontosDeColeta />
      </RotaProtegida>
    ),
  },
  {
    path: "/cadastro-pontos-coleta",
    element: (
      <RotaProtegida>
        <PontosDeColeta/>
      </RotaProtegida>
    ),
  },
  {
    path: "/lista-agendamento",
    element: (
      <RotaProtegida>
        <ListaAgendamentoDescarte/>
      </RotaProtegida>
    ),
  },
  {
    path: "/page",
    element: <LandingPage />,
  },
  {
    path: "/sobre",
    element: <Sobre />,
  },
  {
    path: "/suporte",
    element: <Suporte />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar/>
      <RouterProvider router={router}></RouterProvider>
    
    </>
  );
}

export default App;
