import * as S from "./styles";
import { useCallback, useEffect, useState } from "react";
import Nav_Admin from "../../../../components/Nav_Admin";
import { api } from "../../../../service/api";
import { Button, Form, Table } from "react-bootstrap";
import Ipacote from "../../../../interfaces/pacote";
import { useLocation, useNavigate } from "react-router-dom";
import { type } from "jquery";
import useStateView from "../../../../validators/useStateView";

function home() {
  const [pacotes, setPacotes] = useState<Ipacote[]>([]);
  const [pacote, searchPacote] = useState<Ipacote[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Ipacote[]>([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const location = useLocation();
  const statusView = new useStateView();

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = pacote?.filter((item) => {
      return Object.values(item.nome)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  async function getAllPacotes() {
    const response = await api.get<Ipacote[]>(`/pacote/pacotes`);
    setPacotes(response.data);
  }

  const deletePacote = useCallback(async (id: string) => {
    await api
      .delete(`/pacote/excluir/${id}`)
      .then(function (response) {
        navigate(`/admin/pacotes`, {
          state: {
            data: response.data,
            status: response.status,
          },
        }),
          navigate(0);
      })
      .catch((err) => {
        setStatus({
          type: "error",
          mensagem: err.response.data,
        });
      });
  }, []);

  useEffect(() => {
    getAllPacotes(),
      api.get(`/pacote/pacotes`).then((response) => {
        searchPacote(response.data);
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
            <div className="Form">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <Form.Control
                    aria-label="Text input with dropdown button"
                    onChange={(e) => searchItems(e.target.value)}
                    placeholder="Buscar pacote"
                  />
                  {searchInput.length > 1
                    ? filteredResults.map((pacotes) => {
                        return (
                          <tr>
                            <td>{pacotes?.nome}</td>
                            <td>{pacotes?.preco}</td>
                            <td className="tdbuttons">
                              <div className="buttons">
                                <Button
                                  variant="outline-primary"
                                  onClick={() =>
                                    navigate(
                                      `/admin/pacotes/editar/${pacotes.id}`
                                    )
                                  }
                                >
                                  Editar
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/pacotes/visualizar/${pacotes.id}`
                                    )
                                  }
                                >
                                  Visualizar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deletePacote(pacotes.id)}
                                >
                                  Deletar
                                </Button>{" "}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : pacotes &&
                      pacotes?.map((pacotes) => {
                        return (
                          <tr>
                            <td>{pacotes?.nome}</td>
                            <td>{pacotes?.preco}</td>
                            <td className="tdbuttons">
                              <div className="buttons">
                                <Button
                                  variant="outline-primary"
                                  onClick={() =>
                                    navigate(
                                      `/admin/pacotes/editar/${pacotes.id}`
                                    )
                                  }
                                >
                                  Editar
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/pacotes/visualizar/${pacotes.id}`
                                    )
                                  }
                                >
                                  Visualizar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deletePacote(pacotes.id)}
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
export default home;
