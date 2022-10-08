import { useCallback, useEffect, useState } from "react";
import Nav_Admin from "../../../../components/Nav_Admin";
import tags from "../../../../interfaces/tags";
import { api } from "../../../../service/api";
import * as S from "./styles";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import useStateView from "../../../../validators/useStateView";

function visualizarTag() {
  const [tag, setTag] = useState<tags>();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stateView = new useStateView();
  useEffect(() => {
    getTag();
  }, [id]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  async function getTag() {
    const response = await api.get<tags>(`/tag/tags/${id}`);
    setTag(response.data);
  }
  const deletarTag = useCallback(async (id: string) => {
    await api
      .delete(`/tag/excluir/${id}`)
      .then((response) => {
        navigate(`/admin/tags`, {
          state: {
            data: response.data,
            status: response.status,
          },
        });
      })
      .catch((error) => {
        alert(`Tag não foi deletada! Erro: ${error}`);
      });
  }, []);
  const deleteRelacao = useCallback(async (idTags: string, idProd: string) => {
    await api
      .delete(`/tag/tag-produtos/${idTags}/${idProd}`)
      .then((response) => {
        navigate(`/admin/tags/visualizar/${id}`, {
          state: {
            data: response.data,
            status: response.status,
          },
        }), navigate(0);
      })
      .catch((error) => {
        alert(`Produto não foi removido! Erro: ${error}`);
      });
  }, []);

  return (
    <section>
      <Nav_Admin />
      <S.Visualizar>
        {stateView.validacao(location.state?.status, location.state?.data)}
        {stateView.validacao(status.type, status.mensagem)}
        <div className="tag">
          <h1>Tag: {tag?.nome}</h1>
          <div className="buttons">
            <Link to={`/admin/tags/editar/${tag?.id}`}>
              <Button variant="success">Editar</Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => deletarTag(String(tag?.id))}
            >
              Deletar
            </Button>
          </div>
        </div>
        <div className="produtosTag">
          <h1>Produtos relacionados</h1>
          <div className="produtos">
            {tag &&
              tag.produtos.map((item) => {
                if (item == null) {
                  return <h1></h1>;
                } else {
                  return (
                    <>
                      <div className="produto">
                        <p>{item?.nome}</p>
                        <div className="buttons">
                          <Button
                            variant="danger"
                            onClick={() =>
                              deleteRelacao(String(tag.id), String(item?.id))
                            }
                          >
                            Remover
                          </Button>
                          <Link to={`/admin/produtos/visualizar/${item?.id}`}>
                            <Button variant="primary">Visualizar</Button>
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
          </div>
        </div>
      </S.Visualizar>
    </section>
  );
}
export default visualizarTag;
