import { useCallback, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav_Admin from "../../../../components/Nav_Admin";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import * as S from "./styles";

function Home() {
  const [produtos, setProduto] = useState<Iproduto[]>([]);
  const [produto, searchProduto] = useState<Iproduto[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);
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
          }),
            navigate("/admin/produtos");
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
    <section>
      <Nav_Admin />
      {status.type === "error" ? (
        <p style={{ color: "red" }}>{status.mensagem}</p>
      ) : (
        ""
      )}
      {status.type === "sucesso" ? (
        <p style={{ color: "blue" }}>{status.mensagem}</p>
      ) : (
        ""
      )}

      <S.Home>
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
                  placeholder="Buscar Produto"
                />
                {searchInput.length > 1
                  ? filteredResults.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.nome}</td>
                          <td>{item.preco}</td>
                          <td className="tdbuttons">
                            <div className="buttons">
                              <Button
                                variant="outline-primary"
                                onClick={() =>
                                  navigate(`/admin/produtos/editar/${item.id}`)
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
                          <td>{i.preco}</td>
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
                                  navigate(`/admin/produtos/visualizar/${i.id}`)
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
      </S.Home>
    </section>
  );
}
export default Home;
