import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Nav_Admin from "../../../../components/Nav_Admin";
import Ioferta from "../../../../interfaces/oferta";
import Ipacote from "../../../../interfaces/pacote";
import LocationStateView from "../../../../interfaces/useLocationsState";
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
  const stateViewLocation = location.state as LocationStateView;

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

  const [pacote, searchPacote] = useState([]);
  const [pacotes, setPacote] = useState<Ipacote[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Ipacote[]>([]);

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = pacotes?.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    getPacote();
  });

  useEffect(() => {
    api.get(`/pacote/pacotes`).then((response) => {
      searchPacote(response.data);
    });
  }, []);

  async function getPacote() {
    const response = await api.get<Ipacote[]>(`/pacote/pacotes`);
    setPacote(response.data);
  }

  const limparTodosPacotes = useCallback(async (id: String) => {
    await api
      .put(`/oferta/retirar-todos-pacotes/${id}`)
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
  const removerPacote = useCallback(async (id: string, idPacote: string) => {
    await api
      .put(`/oferta/remover-pacote/${id}`, {
        produtos: [
          {
            id: `${idPacote}`,
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

  interface AdicionarPacote {
    pacotes: Array<{
      id: string[];
    }>;
  }

  const cadastrarNovoPacote = useCallback(async (data: AdicionarPacote) => {
    await api
      .put<AdicionarPacote>(`/oferta/adicionar-pacote/${id}`, {
        pacotes: data.pacotes[0].id.map((i) => ({ id: i })),
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

  const onSubmit = useCallback(async (data: AdicionarPacote) => {
    cadastrarNovoPacote(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdicionarPacote>({
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
            {stateView.validacao(
              stateViewLocation?.status,
              stateViewLocation?.data
            )}
            {stateView.validacao(status.type, status.mensagem)}
            <div className="preco">
              <AiOutlineArrowLeft
                className="icon"
                onClick={() => navigate(-1)}
              />
              <div className="left-content">
                <div className="content">
                  <h1>Oferta: {oferta?.nome}</h1>
                  <h1>Preço: {oferta?.preco}</h1>
                  <div className="buttons">
                    <Button
                      variant="danger"
                      onClick={() => deleteOferta(String(oferta?.id))}
                    >
                      Deletar
                    </Button>
                    {/* <Button
                      variant="danger"
                      onClick={() => limparTodosPacotes(String(oferta?.id))}
                    >
                      Remover todos os Produtos
                    </Button> */}
                  </div>
                </div>
              </div>
              <div className="pacotes">
                <h1>{oferta?.pacote?.nome}</h1>
              </div>
            </div>
            {/* <div className="pacotesPreco">
              <h1>Pacotes</h1>
              <div className="pacotes">
                <h1>{oferta?.pacotes?.nome}</h1>
              </div>
              <h1>Adicionar Pacote</h1>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <>Adicionar pacotes</>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Form.Control
                      aria-label="Text input with dropdown button"
                      onChange={(e) => searchItems(e.target.value)}
                      placeholder="Nome do pacote..."
                    />
                    {searchInput.length > 1
                      ? filteredResults.map((item) => {
                          return (
                            <Dropdown.ItemText key={item.id || item?.nome}>
                              <Form.Check
                                key={item.id || item?.nome}
                                label={item?.nome}
                                value={item.id || item?.nome}
                                {...register("pacotes.0.id")}
                              />
                            </Dropdown.ItemText>
                          );
                        })
                      : pacotes &&
                        pacotes.map((pac) => {
                          return (
                            <Dropdown.ItemText key={pac.id || pac.nome}>
                              <Form.Check
                                key={pac.id || pac.nome}
                                label={pac.nome}
                                value={pac.id || pac.nome}
                                {...register("pacotes.0.id")}
                              />
                            </Dropdown.ItemText>
                          );
                        })}
                  </Dropdown.Menu>
                </Dropdown>
                <br></br>
                <Button type="submit" variant="primary">
                  Editar
                </Button>
              </form>
            </div> */}
          </main>
        </section>
      </S.Visu>
    </>
  );
}
export default Visualizar;
