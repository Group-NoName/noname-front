import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav_ from "../../components/Nav";
import Iproduto from "../../interfaces/produto";
import { api } from "../../service/api";
import * as S from "./styles";
import ICategoria from "../../interfaces/categoria";
import CardPacote from "../../components/CardPacote";
import Ipacote from "../../interfaces/pacote";
import PrecoValidador from "../../validators/precoValidador";

function Home() {
  useEffect(() => {
    getAllProdutos();
  });
  const validacaoPreco = new PrecoValidador();
  const [categorias, setCategoria] = useState<ICategoria[]>([]);
  const [pacotes, setpacote] = useState<Ipacote[]>([]);
  const [produtos, setprodutos] = useState<Iproduto[]>([]);
  async function getAllProdutos() {
    const response = await api.get<Iproduto[]>("/produto/produtos");
    setprodutos(response.data);
  }
  const navigate = useNavigate();

  return (
    <>
      <S.Container>
        <section>
          <header>
            <Nav_ />
          </header>
          <main>
            {produtos &&
              produtos.map((i) => {
                return <p>{i.nome}</p>;
              })}
            <div className="categorias"></div>
            <div className="pacotes">
              <div className="listpacotes">
                <h1>Pacotes</h1>
              </div>
            </div>
          </main>
        </section>
      </S.Container>
    </>
  );
}

export default Home;
