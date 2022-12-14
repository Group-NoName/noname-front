import Nav_Admin from "../../../components/Nav_Admin";
import * as S from "./styles";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <S.Home>
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            <h1>Bem vindo ao Painel Administrativo</h1>
            <p>Estas são suas opções</p>
            <div className="Cards">
              <Link to="/admin/produtos" className="link">
                <p>Produtos</p>
              </Link>
              <Link to="/admin/categorias" className="link">
                <p>Serviços</p>
              </Link>
              {/* <Link to="/admin/tags" className="link">
                <p>Tags</p>
              </Link> */}
              <Link to="/admin/pacotes" className="link">
                <p>Pacotes</p>
              </Link>
              <Link to="/admin/ofertas" className="link">
                <p>Ofertas</p>
              </Link>
            </div>
          </main>
        </section>
      </S.Home>
    </>
  );
}

export default Home;
