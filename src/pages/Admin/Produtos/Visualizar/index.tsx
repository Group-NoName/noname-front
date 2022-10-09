// Tela do admin que vai pegar os produtos especificos
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import * as S from "./styles";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Nav_Admin from "../../../../components/Nav_Admin";
import { Button, Dropdown } from "react-bootstrap";
import useStateView from "../../../../validators/useStateView";
import PrecoValidador from "../../../../validators/precoValidador";

function Visualizar() {
  const [produto, setProduto] = useState<Iproduto>();
  const { id } = useParams();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    getProduto();
  }, [id]);
  const location = useLocation();
  const statusView = new useStateView();
  const validadePrice = new PrecoValidador();
  async function getProduto() {
    const response = await api.get<Iproduto>(`/produto/produtos/${id}`);
    setProduto(response.data);
  }
  const deleteProduto = useCallback(async (id: string) => {
    await api
      .delete(`/produto/excluir/${id}`)
      .then(function (response) {
        if (response) {
          navigate("/admin/produtos", {
            state: {
              data: response.data,
              status: response.status,
            },
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `${error.response.data}`,
          });
        }
      });
  }, []);

  const deleteRelacao = useCallback(async (idTags: string, idProd: string) => {
    await api
      .delete(`/tag/tag-produtos/${idTags}/${idProd}`)
      .then(function (response) {
        if (response) {
          navigate(`/admin/produtos/visualizar/${id}`, {
            state: {
              data: response.data,
              status: response.status,
            },
          }),
            navigate(0);
        }
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `${error.response.data}`,
          });
        }
      });
  }, []);

  return (
    <>
      <S.Home>
        {statusView.validacao(location.state?.status, location.state?.data)}
        {statusView.validacao(status.type, status.mensagem)}
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            <div className="mainContent">
              <AiOutlineArrowLeft
                className="icon"
                onClick={() => navigate(-1)}
              />
              <div className="left-content">
                <div className="content">
                  <h1>{produto?.nome}</h1>
                  <h3>R$ {produto?.preco}</h3>
                  {validadePrice.validar(produto)}
                  <div className="description">
                    <p>{produto?.descricao}</p>
                  </div>
                  <div className="tags">
                    <h2>Tags</h2>
                    <div className="tagscards">
                      {produto &&
                        produto?.tags.map((item) => {
                          if (item == null) {
                            return <h1></h1>;
                          } else {
                            return (
                              <>
                                <Dropdown>
                                  <Dropdown.Toggle>{item.nome}</Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.ItemText>
                                      <Button
                                        variant="danger"
                                        onClick={() =>
                                          deleteRelacao(
                                            String(item.id),
                                            String(produto.id)
                                          )
                                        }
                                      >
                                        Remover
                                      </Button>
                                    </Dropdown.ItemText>
                                    <Dropdown.ItemText>
                                      <Link
                                        to={`/admin/tags/visualizar/${item?.id}`}
                                      >
                                        <Button variant="primary">
                                          Visualizar
                                        </Button>
                                      </Link>
                                    </Dropdown.ItemText>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-content">
                <img src={`${produto?.images[0].url}`} alt="" />
                <Button
                  variant="outline-primary"
                  onClick={() =>
                    navigate(`/admin/produtos/editar/${produto?.id}`)
                  }
                >
                  Editar
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteProduto(String(produto?.id))}
                >
                  Deletar
                </Button>
              </div>
            </div>
          </main>
        </section>
      </S.Home>
    </>
  );
}
export default Visualizar;
