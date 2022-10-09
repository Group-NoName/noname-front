import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Nav_Admin from "../../../../components/Nav_Admin";
import Ioferta from "../../../../interfaces/oferta";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

function Visualizar() {
  const navigate = useNavigate();
  const [oferta, setOfertas] = useState<Ioferta>();
  const { id } = useParams();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  useEffect(() => {
    getOferta();
  }, [id]);

  const location = useLocation();
  const stateView = new useStateView();

  async function getOferta() {
    const response = await api.get<Ioferta>(`/oferta/ofertas/${id}`);
    setOfertas(response.data);
  }

  const deleteOferta = useCallback(async (id: string) => {
    await api
      .delete(`/oferta/excluir/${id}`)
      .then(function (response) {
        if (response) {
          navigate(`/admin/ofertas`, {
            state: {
              data: response.data,
              status: response.status,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [produto, searchProduto] = useState([]);
  const [produtos, setProduto] = useState<Iproduto[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = produto?.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    getProduto();
  });

  useEffect(() => {
    api.get(`/produto/produtos`).then((response) => {
      searchProduto(response.data);
    });
  }, []);

  async function getProduto() {
    const response = await api.get<Iproduto[]>(`/produto/produtos`);
    setProduto(response.data);
  }

  const limparTodosProdutos = useCallback(async (id: String) => {
    await api
      .put(`/oferta/retirar-todos-produtos/${id}`)
      .then(function (response) {
        if (response) {
          navigate(`/admin/ofertas/visualizar/${id}`, {
            state: {
              data: response.data,
              status: response.status,
            },
          }),
            navigate(0);
        }
      })
      .catch(function (error: AxiosError) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `${error.response.data}`,
          }),
            navigate(`/admin/ofertas/visualizar/${id}`);
        }
      });
  }, []);
  const removerProduto = useCallback(async (id: string, idProduto: string) => {
    await api
      .put(`/oferta/remover-produto/${id}`, {
        produtos: [
          {
            id: `${idProduto}`,
          },
        ],
      })
      .then(function (response) {
        navigate(`/admin/ofertas/visualizar/${id}`, {
          state: {
            data: response.data,
            status: response.status,
          },
        });
        navigate(0);
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `${error.response.data}`,
          }),
            navigate(`/admin/ofertas/visualizar/${id}`);
        }
      });
  }, []);

  interface AdicionarProduto {
    produtos: Array<{
      id: string[];
    }>;
  }

  const cadastrarNovoProduto = useCallback(async (data: AdicionarProduto) => {
    await api
      .put<AdicionarProduto>(`/oferta/adicionar-produto/${id}`, {
        produtos: data.produtos[0].id.map((i) => ({ id: i })),
      })
      .then(function (response) {
        navigate(`/admin/ofertas/visualizar/${id}`, {
          state: {
            data: response.data,
            status: response.status,
          },
        });
        navigate(0);
      })
      .catch(function (error: AxiosError) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `${error.response.data}`,
          }),
            console.log(error.response.data);
        }
      });
  }, []);

  const onSubmit = useCallback(async (data: AdicionarProduto) => {
    cadastrarNovoProduto(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdicionarProduto>({
    mode: "onBlur",
  });

  return (
    <>
      <S.Visu>
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
          {stateView.validacao(location.state?.status, location.state?.data)}
          {stateView.validacao(status.type, status.mensagem)}
            <div className="porcentagem">
              <h1>Porcentagem: {oferta?.desconto}</h1>
              <div className="buttons">
                <Button
                  variant="danger"
                  onClick={() => deleteOferta(String(oferta?.id))}
                >
                  Deletar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => limparTodosProdutos(String(oferta?.id))}
                >
                  Remover todos os Produtos
                </Button>
              </div>
            </div>
            <div className="produtosPorcent">
              <h1>Produtos</h1>
              <div className="produtos">
                {oferta &&
                  oferta.produtos?.map((item) => {
                    return (
                      <>
                        <div className="produto">
                          <p>{item?.nome}</p>
                          <div className="buttons">
                            <Button
                              variant="danger"
                              onClick={() =>
                                removerProduto(String(oferta.id), String(item?.id))
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
                  })}
              </div>
              <h1>Adicionar Produto</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <>Adicionar produtos</>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Form.Control
                      aria-label="Text input with dropdown button"
                      onChange={(e) => searchItems(e.target.value)}
                      placeholder="Nome do produto..."
                    />
                    {searchInput.length > 1
                      ? filteredResults.map((item) => {
                          return (
                            <Dropdown.ItemText key={item.id || item?.nome}>
                              <Form.Check
                                key={item.id || item?.nome}
                                label={item?.nome}
                                value={item.id || item?.nome}
                                {...register("produtos.0.id")}
                              />
                            </Dropdown.ItemText>
                          );
                        })
                      : produtos &&
                        produtos.map((prod) => {
                          return (
                            <Dropdown.ItemText key={prod.id || prod.nome}>
                              <Form.Check
                                key={prod.id || prod.nome}
                                label={prod.nome}
                                value={prod.id || prod.nome}
                                {...register("produtos.0.id")}
                              />
                            </Dropdown.ItemText>
                          );
                        })}
                  </Dropdown.Menu>
                </Dropdown>
                <br></br>
                <Button type="submit" variant="primary">Editar</Button>
              </form>
            </div>
          </main>
        </section>

      </S.Visu>
    </>
  );
}
export default Visualizar;
