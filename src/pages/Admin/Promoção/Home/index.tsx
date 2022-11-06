import { useCallback, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Nav_Admin from "../../../../components/Nav_Admin";
import Ipromocao from "../../../../interfaces/promocao";
import LocationStateView from "../../../../interfaces/useLocationsState";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

function HomePromocao() {
  const [promocoes, setPromocao] = useState<Ipromocao[]>([]);
  const [promocao, searchPromocao] = useState<Ipromocao[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Ipromocao[]>([]);

  const location = useLocation();
  const statesView = new useStateView();
  const stateViewLocation = location.state as LocationStateView;

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    getAllPromocoes();
  });

  const deletePromocao = useCallback(async (id: string) => {
    await api
      .delete(`/promocao/deletar/${id}`)
      .then(function (response) {
        if (response) {
          setStatus({
            type: "sucesso",
            mensagem: `${response.data}`,
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

  async function getAllPromocoes() {
    const response = await api.get<Ipromocao[]>("/promocao/promocoes");
    setPromocao(response.data);
  }

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = promocao?.filter((item) => {
      return Object.values(item.nome)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    api.get(`/promocao/promocoes`).then((response) => {
      searchPromocao(response.data);
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
            <div className="Form">
              <Form.Control
                aria-label="Text input with dropdown button"
                onChange={(e) => searchItems(e.target.value)}
                placeholder="Buscar Promoção"
              />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {searchInput.length > 1
                    ? filteredResults.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.nome}</td>
                            
                            <td className="tdbuttons">
                              <div className="buttons">
                                <Button
                                  variant="outline-primary"
                                  onClick={() =>
                                    navigate(
                                      `/admin/promocoes/editar/${item.id}`
                                    )
                                  }
                                >
                                  Editar
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/promocoes/visualizar/${item.id}`
                                    )
                                  }
                                >
                                  Visualizar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deletePromocao(item.id)}
                                >
                                  Deletar
                                </Button>{" "}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : promocoes &&
                      promocoes.map((i) => {
                        return (
                          <tr key={i.id}>
                            <td>{i.nome}</td>
                            <td className="tdbuttons">
                              <div className="buttons">
                                <Button
                                  variant="outline-primary"
                                  onClick={() =>
                                    navigate(`/admin/promocao/editar/${i.id}`)
                                  }
                                >
                                  Editar
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/promocao/visualizar/${i.id}`
                                    )
                                  }
                                >
                                  Visualizar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deletePromocao(i.id)}
                                >
                                  Deletar
                                </Button>{" "}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
            </div>
          </main>
        </section>
      </S.Home>
    </>
  );
}
export default HomePromocao;
