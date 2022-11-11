import { AiOutlineArrowLeft } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import * as S from "./styles";
import { useState, useCallback, useEffect } from "react";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Ipacote from "../../../../interfaces/pacote";
import { AxiosError } from "axios";
import useStateView from "../../../../validators/useStateView";

interface AtualizarPacote {
  nome: string;
  descricao: string;
  preco: number;
  images: [{ url: string }];
  produtos: Array<{
    id: string[];
  }>;
}

function editar() {
  const [pacote, getPacote] = useState<Ipacote>();
  const [produto, searchProduto] = useState([]);
  const [produtos, setProduto] = useState<Iproduto[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);
  const stateView = new useStateView();

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const atualizarDadosPacote = useCallback(async (data: AtualizarPacote) => {
    await api
      .put<AtualizarPacote>(`/pacote/atualizar/${id}`, {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        images: [{ url: data.images[0].url }],
      })
      .then(function (response) {
        navigate(`/admin/pacotes/visualizar/${id}`, {
          state: {
            data: response.data,
            status: response.status,
          },
        });
      })
      .catch((error: AxiosError) => {
        setStatus({
          type: "error",
          mensagem: `Coloque informações válidas`,
        });
      });
  }, []);

  const atualizarProdutosPacote = useCallback(async (data: AtualizarPacote) => {
    await api
      .put<AtualizarPacote>(`/pacote/inserir-produto/${id}`, {
        produtos: data.produtos[0].id.map((i) => ({ id: i })),
      })
      .then(function (response) {
        navigate(`/admin/pacotes/visualizar/${id}`, {
          state: {
            data: response.data,
            status: response.status,
          },
        });
      })
      .catch(function (error: AxiosError) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `Os seguintes produtos já pertecem a esse pacote:  [${error.response.data}]`,
          });
        }
      });
  }, []);

  useEffect(() => {
    getPacotes(), getProduto();
  });

  async function getPacotes() {
    const response = await api.get<Ipacote>(`/pacote/pacote/${id}`);
    getPacote(response.data);
  }

  async function getProduto() {
    const response = await api.get<Iproduto[]>(`/produto/produtos`);
    setProduto(response.data);
  }

  useEffect(() => {
    api.get(`/produto/produtos`).then((response) => {
      searchProduto(response.data);
    });
  }, []);

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = produto?.filter((item) => {
      return Object.values(item)
        .join()
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  const onSubmit = useCallback(async (data: AtualizarPacote) => {
    atualizarDadosPacote(data);
  }, []);
  const onSubmitProduto = useCallback(async (data: AtualizarPacote) => {
    atualizarProdutosPacote(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AtualizarPacote>({
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
            <AiOutlineArrowLeft className="icon" onClick={() => navigate(-1)} />
            <div className="Form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="nome">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    defaultValue={pacote?.nome}
                    required
                    {...register("nome")}
                  />
                </div>
                <div className="position">
                  <div className="imgs">
                    <div className="preco">
                      <Button
                        color={"#ffff"}
                        width={"8"}
                        height={"3"}
                        fontSize={"20"}
                        backgroundColor={"#3a4ad9"}
                        text={"Editar"}
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div>
                <form
                  className="addprodutos"
                  onSubmit={handleSubmit(onSubmitProduto)}
                >
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
            </div>
          </main>
        </section>
      </S.Editar>
    </>
  );
}
export default editar;
