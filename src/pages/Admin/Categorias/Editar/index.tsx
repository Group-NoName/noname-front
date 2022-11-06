import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import ICategoria from "../../../../interfaces/categoria";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import * as S from "./styles";
import useStateView from "../../../../validators/useStateView";

interface IUpdateCategoria {
  nome: string;
  produtos: Array<{
    id: string[];
  }>;
}

function editar() {
  const [categoria, setCategoria] = useState<ICategoria>();
  const [produtos, getProdutos] = useState<Iproduto[]>([]);
  const [produto, searchProduto] = useState<Iproduto[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const stateView = new useStateView();

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProduto(), getCategoria();
  }, [id]);

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

  async function getCategoria() {
    const response = await api.get<ICategoria>(`/servico/servicos/${id}`);
    setCategoria(response.data);
  }

  async function getProduto() {
    const response = await api.get<Iproduto[]>(`/produto/produtos`);
    getProdutos(response.data);
  }

  useEffect(() => {
    api.get(`/produto/produtos`).then((response) => {
      searchProduto(response.data);
    });
  }, []);

  const atualizarNomeCategoria = useCallback(async (data: IUpdateCategoria) => {
    await api
      .put<IUpdateCategoria>(`/servico/atualizar/${id}`, {
        nome: data.nome,
      })
      .then(function (response) {
        if (response) {
          navigate(`/admin/categorias/visualizar/${id}`, {
            state: {
              data: response.data,
              status: response.status,
            },
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const adicionarCategoriaProduto = useCallback(
    async (data: IUpdateCategoria) => {
      await api
        .put<IUpdateCategoria>(`/servico/inserir-produtos/${id}`, {
          produtos: data.produtos[0].id.map((i) => ({ id: i })),
        })
        .then(function (response) {
          if (response) {
            navigate(`/admin/categorias/visualizar/${id}`, {
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
              mensagem: `Produto já está em alguma Categoria: ${error.response.data}`,
            });
          }
        });
    },
    []
  );

  const onSubmit = useCallback(async (data: IUpdateCategoria) => {
    atualizarNomeCategoria(data);
  }, []);

  const onSubmitProduto = useCallback(async (data: IUpdateCategoria) => {
    adicionarCategoriaProduto(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateCategoria>({
    mode: "onBlur",
  });

  return (
    <>
      <S.Editar>
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            {stateView.validacao(status.type, status.mensagem)}
            <div className="contentMain">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="nome">
                  <label htmlFor="nomeCategoria">Nome da Categoria</label>
                  <input
                    type="text"
                    defaultValue={categoria?.nome}
                    {...register("nome")}
                  />
                </div>
                <Button
                  color={"#ffff"}
                  width={"8"}
                  height={"3"}
                  fontSize={"20"}
                  backgroundColor={"#3a4ad9"}
                  text={"Editar"}
                  type="submit"
                />
              </form>
            </div>
            <div>
              <form className="contentProd" onSubmit={handleSubmit(onSubmitProduto)}>
                <Form.Control
                  aria-label="Text input with dropdown button"
                  onChange={(e) => searchItems(e.target.value)}
                  placeholder="Buscar Produto"
                />
                <div className="produtosSearch">
                  <Form aria-label="Default select">
                    {searchInput.length > 1
                      ? filteredResults.map((item) => {
                          return (
                            <Form.Check
                              key={item.id || item?.nome}
                              label={item?.nome}
                              value={item.id || item?.nome}
                              {...register("produtos.0.id")}
                            />
                          );
                        })
                      : produtos &&
                        produtos.map((produto) => {
                          return (
                            <Form.Check
                              key={produto.id || produto?.nome}
                              label={produto?.nome}
                              value={produto.id || produto?.nome}
                              {...register("produtos.0.id")}
                            />
                          );
                        })}
                  </Form>
                </div>
                  <Button
                    color={"#ffff"}
                    width={"8"}
                    height={"3"}
                    fontSize={"20"}
                    backgroundColor={"#3a4ad9"}
                    text={"Adicionar Produto"}
                    type="submit"
                  />
              </form>
            </div>
          </main>
        </section>
      </S.Editar>
    </>
  );
}
export default editar;
