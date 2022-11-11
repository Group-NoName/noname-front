import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import CardPacote from "../../components/CardPacote";
import Nav_ from "../../components/Nav";
import Ipacote from "../../interfaces/pacote";
import { api } from "../../service/api";
import * as S from "./styles";

function Pacote() {
  const { id } = useParams();
  const [pacote, getPacote] = useState<Ipacote>();
  const placeholder =
    "https://almcharities.com/wp-content/uploads/2019/05/placeholder-circle.png";
  useEffect(() => {
    getPacotes();
  }, [id]);
  async function getPacotes() {
    const response = await api.get<Ipacote>(`/pacote/pacote/${id}`);
    getPacote(response.data);
  }

  return (
    <>
      <S.Container>
        <section>
          <header>
            <Nav_ />
          </header>
          <main>
            <div className="pacoteContent">
              <div className="imgCentral">
                <div className="posicao"></div>
              </div>
              <div className="pacoteInformation">
                <div className="pacoteDescricao">
                  <div className="nome">
                    <h1>{pacote?.nome}</h1>
                  </div>
                  <div className="desc">
                    <div className="itens">
                      <h3>Itens inclusos</h3>
                      {pacote?.produtos.map((itens) => {
                        return (
                          <Link
                            className="link"
                            to={`/produto/${itens.id}`}
                            key={itens.id}
                          >
                            {itens.nome}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pacotePrice">
                    <div className="price"></div>
                    <div className="pacotepricebuttom">
                      <Button
                        color={"#ffff"}
                        width={"8"}
                        height={"3"}
                        fontSize={"20"}
                        backgroundColor={"#3a4ad9"}
                        text={"Comprar"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pacotesLists">
              <div className="produtosSemelhantes">
                <h2>Pacotes Semelhantes</h2>
                <div className="cards">
                  <div className="card">
                    <CardPacote
                      name={"Teste"}
                      imageURL={`${placeholder}`}
                      preco={""}
                      pacoteID={`${id}`}
                    />
                  </div>
                </div>
              </div>
              <div className="produtosRelacionados">
                <h2>Pacotes Relacionados</h2>
                <div className="posicao">
                  <div>
                    <CardPacote
                      name={"Teste"}
                      imageURL={`${placeholder}`}
                      preco={""}
                      pacoteID={`${id}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      </S.Container>
    </>
  );
}
export default Pacote;
