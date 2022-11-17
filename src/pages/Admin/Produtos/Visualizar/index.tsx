// Tela do admin que vai pegar os produtos especificos
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import * as S from "./styles";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Nav_Admin from "../../../../components/Nav_Admin";
import { Button } from "react-bootstrap";
import useStateView from "../../../../validators/useStateView";
import PrecoValidador from "../../../../validators/precoValidador";
import LocationStateView from "../../../../interfaces/useLocationsState";

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
  const statesView = new useStateView();

  const stateViewLocation = location.state as LocationStateView;
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
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            {statesView.validacao(
              stateViewLocation?.status,
              stateViewLocation?.data
            )}
            {statesView.validacao(status.type, status.mensagem)}
            <div className="mainContent">
              <AiOutlineArrowLeft
                className="icon"
                onClick={() => navigate(-1)}
              />
              <div className="left-content">
                <div className="content">
                  <h1>{produto?.nome}</h1>
                  {/* <h2>{produto?.descricao}</h2> */}
                </div>
              </div>
              <div className="right-content">
                <div className="buttons">
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
            </div>
          </main>
        </section>
      </S.Home>
    </>
  );
}
export default Visualizar;
