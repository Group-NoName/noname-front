import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Nav_Admin from "../../../../components/Nav_Admin";
import Ipacote from "../../../../interfaces/pacote";
import * as S from "./styles";
import { api } from "../../../../service/api";
import { Button } from "react-bootstrap";

function cadastro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pacote, getPacote] = useState<Ipacote>();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  useEffect(() => {
    getPacotes();
  }, [id]);
  async function getPacotes() {
    const response = await api.get<Ipacote>(`/pacote/pacote/${id}`);
    getPacote(response.data);
  }

  const deletarRelacao = useCallback(async (id: string, idProduto: string) => {
    await api
      .put(`/pacote/remover-produto/${id}`, {
        produtos: [
          {
            id: `${idProduto}`,
          },
        ],
      })
      .then(function (response) {
        setStatus({
          type: "sucesso",
          mensagem: `${response.data}`,
        }),
          navigate(0);
      })
      .catch((error) => {
        alert(`Produto não foi removido! Erro: ${error}`);
      });
  }, []);
  const deletePacote = useCallback(async (id: string) => {
    await api
      .delete(`/pacote/excluir/${id}`)
      .then(() => {
        alert("Pacote Deletado");
        navigate(-1);
      })
      .catch((err) => {
        alert(`Pacote não foi deletado! Erro:${err}`);
      });
  }, []);

  return (
    <section>
      <Nav_Admin />
      <S.Visualizar>
        <main>
          {status.type === "sucesso" ? (
            <p style={{ color: "blue" }}>{status.mensagem}</p>
          ) : (
            ""
          )}
          <div className="mainContent">
            <AiOutlineArrowLeft className="icon" onClick={() => navigate(-1)} />
            <div className="left-content">
              <div className="content">
                <h1>{pacote?.nome}</h1>
                <h3>R$ {pacote?.preco}</h3>
                <div className="description">
                  <p>{pacote?.descricao}</p>
                </div>
                <div className="tags">
                  <h2>Produtos</h2>
                  <div className="tagscards">
                    {pacote &&
                      pacote?.produtos.map((item) => {
                        if (item == null) {
                          return <h1></h1>;
                        } else {
                          return (
                            <>
                              <div className="tag" key={item.id}>
                                <p>{item?.nome}</p>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    deletarRelacao(
                                      String(pacote?.id),
                                      String(item.id)
                                    )
                                  }
                                >
                                  Remover
                                </Button>
                                <Link
                                  to={`/admin/produtos/visualizar/${item?.id}`}
                                >
                                  <Button variant="primary">Visualizar</Button>
                                </Link>
                              </div>
                            </>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <img src={`${pacote?.images[0].url}`} alt="" />
              <Button
                variant="outline-primary"
                onClick={() => navigate(`/admin/pacotes/editar/${pacote?.id}`)}
              >
                Editar
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => deletePacote(String(pacote?.id))}
              >
                Deletar
              </Button>
            </div>
          </div>
        </main>
      </S.Visualizar>
    </section>
  );
}
export default cadastro;
