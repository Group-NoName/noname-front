import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav_Admin from "../../../../components/Nav_Admin";
import ICategoria from "../../../../interfaces/categoria";
import { api } from "../../../../service/api";
import * as S from "./styles";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import useStateView from "../../../../validators/useStateView";
import LocationStateView from "../../../../interfaces/useLocationsState";

function Home() {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [categoria, searchCategoria] = useState<ICategoria[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<ICategoria[]>([]);
  const location = useLocation();
  const stateView = new useStateView();
  const stateViewLocation = location.state as LocationStateView;
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    getAllCategorias();
  });

  const deletarCategoria = useCallback(async (id: string) => {
    await api
      .delete(`/categoria/excluir/${id}`)
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

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = categoria?.filter((item) => {
      return Object.values(item.nome)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  async function getAllCategorias() {
    const response = await api.get<ICategoria[]>("/categoria/categorias");
    setCategorias(response.data);
  }

  useEffect(() => {
    api.get(`/categoria/categorias`).then((response) => {
      searchCategoria(response.data);
    });
  }, []);

  return (
    <section>
      <S.Home>
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            {stateView.validacao(status?.type, status?.mensagem)}
            {stateView.validacao(
              stateViewLocation?.status,
              stateViewLocation?.data
            )}
            <div className="Form">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <Form.Control
                    aria-label="Text input with dropdown button"
                    onChange={(e) => searchItems(e.target.value)}
                    placeholder="Buscar Categoria"
                  />
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
                                      `/admin/categorias/editar/${item.id}`
                                    )
                                  }
                                >
                                  Editar
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/categorias/visualizar/${item.id}`
                                    )
                                  }
                                >
                                  Visualizar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deletarCategoria(item.id)}
                                >
                                  Deletar
                                </Button>{" "}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : categorias &&
                      categorias.map((i) => {
                        return (
                          <tr key={i.id}>
                            <td>{i.nome}</td>
                            <td className="tdbuttons">
                              <div className="buttons">
                                <Button
                                  variant="outline-primary"
                                  onClick={() =>
                                    navigate(`/admin/categorias/editar/${i.id}`)
                                  }
                                >
                                  Editar
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/categorias/visualizar/${i.id}`
                                    )
                                  }
                                >
                                  Visualizar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deletarCategoria(i.id)}
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
    </section>
  );
}
export default Home;
