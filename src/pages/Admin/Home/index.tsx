import Nav_Admin from "../../../components/Nav_Admin";
import { Helmet } from 'react-helmet';
import * as S from "./styles"
import Tags from "../../../interfaces/tags";
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
                        <div className="Cards">
                            <div className="conteudo">
                                <Link to='/admin/produtos'>produtos</Link>
                            </div>
                            <div className="conteudo">
                                <Link to='/admin/pacotes'>pacotes</Link>
                            </div>
                            <div className="conteudo">
                                <Link to='/admin/ofertas'>ofertas</Link>
                            </div>
                            <div className="conteudo">
                                <Link to='/admin/tags'>tags</Link>
                            </div>
                            <div className="conteudo">
                                <Link to='/admin/categorias'>categorias</Link>
                            </div>
                        </div>
                    </main>
                </section>
            </S.Home>
        </>
    )
}

export default Home;