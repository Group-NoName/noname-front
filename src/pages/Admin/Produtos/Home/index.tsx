import { useCallback, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Nav_Admin from "../../../../components/Nav_Admin";
import Iproduto from "../../../../interfaces/produto";
import LocationStateView from "../../../../interfaces/useLocationsState";
import { api } from "../../../../service/api";
import PrecoValidador from "../../../../validators/precoValidador";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

function Home() {
  const [produtos, setProduto] = useState<Iproduto[]>([]);
  const [produto, searchProduto] = useState<Iproduto[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);

  const location = useLocation();
  const statesView = new useStateView();
  const stateViewLocation = location.state as LocationStateView;

  const validadePrice = new PrecoValidador();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    getAllProdutos();
  });

  const deleteProduto = useCallback(async (id: string) => {
    await api
      .delete(`/produto/excluir/${id}`)
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

  async function getAllProdutos() {
    const response = await api.get<Iproduto[]>("/produto/produtos");
    setProduto(response.data);
  }

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = produto?.filter((item) => {
      return Object.values(item.nome)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    api.get(`/produto/produtos`).then((response) => {
      searchProduto(response.data);
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
                placeholder="Buscar Produto"
              />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Desconto</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {searchInput.length > 1
                    ? filteredResults.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.preco}</td>
                            <td>
                              {item.desconto === 0 ? (
                                <p style={{ color: "green " }}>Sem desconto</p>
                              ) : (
                                <p style={{ color: "red", fontWeight: "bold" }}>
                                  R${item.desconto}
                                </p>
                              )}
                            </td>
                            <td className="tdbuttons">
                              <div className="buttons">
                                <Button
                                  variant="outline-primary"
                                  onClick={() =>
                                    navigate(
                                      `/admin/produtos/editar/${item.id}`
                                    )
                                  }
                                >
                                  Editar
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/produtos/visualizar/${item.id}`
                                    )
                                  }
                                >
                                  Visualizar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deleteProduto(item.id)}
                                >
                                  Deletar
                                </Button>{" "}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : produtos &&
                      produtos.map((i) => {
                        return (
                          <tr key={i.id}>
                            <td>{i.nome}</td>
                            <td>R${i.preco}</td>
                            <td>{validadePrice.validar(i)}</td>
                            <td className="tdbuttons">
                              <div className="buttons">
                                <Button
                                  variant="outline-primary"
                                  onClick={() =>
                                    navigate(`/admin/produtos/editar/${i.id}`)
                                  }
                                >
                                  Editar
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/produtos/visualizar/${i.id}`
                                    )
                                  }
                                >
                                  Visualizar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deleteProduto(i.id)}
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
export default Home;
