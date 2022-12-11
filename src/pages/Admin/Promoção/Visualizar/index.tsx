import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "react-bootstrap";
import Ipromocao from "../../../../interfaces/promocao";
import { api } from "../../../../service/api";
import Nav_Admin from "../../../../components/Nav_Admin";
import useStateView from "../../../../validators/useStateView";
import LocationStateView from "../../../../interfaces/useLocationsState";

function VisualizarPromo() {
  const [promocao, setPromocao] = useState<Ipromocao>();
  const { id } = useParams();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    getPromocao();
  }, [id]);
  const location = useLocation();
  const statesView = new useStateView();

  const stateViewLocation = location.state as LocationStateView;
  async function getPromocao() {
    const response = await api.get<Ipromocao>(`/promocao/promocoes/${id}`);
    setPromocao(response.data);
  }
  const deletePromocao = useCallback(async (id: string) => {
    await api
      .delete(`/promocao/deletar/${id}`)
      .then(function (response) {
        if (response) {
          navigate("/admin/promocao", {
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

  return (
    <>
      <S.Home>
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
                  <h1>{promocao?.nome}</h1>
                </div>
              </div>
              <div className="right-content">
                <div className="buttons">
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      navigate(`/admin/promocao/editar/${promocao?.id}`)
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deletePromocao(String(promocao?.id))}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
              <div className="ofertas">
                <div className="obrigatorias">
                  <h1>Ofertas Obrigatorias</h1>
                  {promocao && promocao?.ofertasObrigatorias?.map(p => {
                    return (
                      <h3 key={p.id}>{p.nome}</h3>
                    )
                  })}
                </div>
                <div className="opcionais">
                  <h1>Ofertas Opcionais</h1>
                  {promocao && promocao?.ofertasOpcionais?.map(p => {
                    return (
                      <h3 key={p.id}>{p.nome}</h3>
                    )
                  })}
                </div>
              </div>
            </div>
          </main>
        </section>
      </S.Home>
    </>
  );
}
export default VisualizarPromo;
