import { AxiosError } from "axios";
import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardProds from "../../components/CardProds";
import Nav_ from "../../components/Nav";
import Iproduto from "../../interfaces/produto";
import { api } from "../../service/api";
import * as S from "./styles";
import Carousel from "react-bootstrap/Carousel";
import ICategoria from "../../interfaces/categoria";
import CardPacote from "../../components/CardPacote";
import Ipacote from "../../interfaces/pacote";
import PrecoValidador from "../../validators/precoValidador";

function Home() {
  useEffect(() => {
    getAllCategoria(), getAllPacote();
  });
  const validacaoPreco = new PrecoValidador();
  const [categorias, setCategoria] = useState<ICategoria[]>([]);
  const [pacotes, setpacote] = useState<Ipacote[]>([]);

  async function getAllCategoria() {
    const response = await api.get<ICategoria[]>("/categoria/categorias");
    setCategoria(response.data);
  }

  async function getAllPacote() {
    const response = await api.get<Ipacote[]>("/pacote/pacotes");
    setpacote(response.data);
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
            <div className="categorias">
              {categorias &&
                categorias.map((itemCategoria) => {
                  if (itemCategoria.produtos.length > 0) {
                    return (
                      <div key={itemCategoria.id}>
                        <div className="listCategorias">
                          <h1>Categoria: {itemCategoria.nome}</h1>
                          <div className="produtosmap">
                            {itemCategoria.produtos.map((i) => {
                              return (
                                <div className="disposicaoItem" key={i.id}>
                                  <CardProds
                                    imageURL={`${i?.images[0].url}`}
                                    name={`${i?.nome}`}
                                    produtoID={`${i?.id}`}
                                    preco={i?.preco}
                                    produtos={i}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
            {/* DEIXAR OS CARDS DO PACOTE DO LADO DIREITO DAS CATEGORIAS */}
            <div className="pacotes">
              <div className="listpacotes">
                <h1>Pacotes</h1>
                {pacotes &&
                  pacotes.map((i) => {
                    return (
                      <div className="pacote" key={i.id}>
                        <CardPacote
                          imageURL={`${i?.images[0].url}`}
                          name={`${i?.nome}`}
                          pacoteID={`${i?.id}`}
                          preco={i?.preco}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </main>
        </section>
      </S.Container>
    </>
  );
}

export default Home;
