import { AxiosError } from "axios";
import { useState, useCallback, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

interface CadastroCategoria {
  nome: string;
  produtos: Array<{
    id: string[];
  }>;
}

function cadastro() {
  const navigate = useNavigate();
  const [categorias, setCategoria] = useState<CadastroCategoria>();

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const stateView = new useStateView();

  const [produtos, getProdutos] = useState<Iproduto[]>([]);
  const [produto, searchProduto] = useState<Iproduto[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);

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

  async function getProduto() {
    const response = await api.get<Iproduto[]>(`/produto/produtos`);
    getProdutos(response.data);
  }

  useEffect(() => {
    getProduto();
    api.get(`/produto/produtos`).then((response) => {
      searchProduto(response.data);
    });
  }, []);

  const cadastroCategoria = useCallback(async (data: CadastroCategoria) => {
    await api
      .post<CadastroCategoria>(`/servico/cadastro`, {
        nome: data.nome,
        produtos: data.produtos[0].id.map((i) => ({ id: i })),
      })
      .then(function (response) {
        if (response) {
          navigate("/admin/categorias", {
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

  const onSubmit = useCallback(async (data: CadastroCategoria) => {
    cadastroCategoria(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroCategoria>({
    mode: "onBlur",
  });

  return (
    <>
      <S.Cadastro>
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            {stateView.validacao(status.type, status.mensagem)}

            <div className="Form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="nome">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    value={categorias?.nome}
                    required
                    placeholder="Serviço X"
                    {...register("nome")}
                  />
                </div>

                <Form.Control
                  aria-label="Text input with dropdown button"
                  onChange={(e) => searchItems(e.target.value)}
                  placeholder="Buscar Produto"
                />
                <div className="produtosSearch">
                  <Form className='checkform' aria-label="Default select">
                    {searchInput.length > 1
                      ? filteredResults.map((item) => {
                          return (
                            <Form.Check
                              className="check"
                              required
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
                              className="check"
                              required
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
                  text={"Cadastrar"}
                  type="submit"
                />
              </form>
            </div>
          </main>
        </section>
      </S.Cadastro>
    </>
  );
}
export default cadastro;
