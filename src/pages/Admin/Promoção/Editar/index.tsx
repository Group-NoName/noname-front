import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import { api } from "../../../../service/api";
import { AiOutlineArrowLeft } from "react-icons/ai";
import * as S from "./styles";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import useStateView from "../../../../validators/useStateView";
import Ipromocao from "../../../../interfaces/promocao";
import Ioferta from "../../../../interfaces/oferta";

interface CadastroPromocao {
  nome: string;
  ofertas: Array<{
    id: string[];
  }>;
}

function EditarPromo() {
  const [promocao, setPromocao] = useState<Ipromocao>();
  const [ofertas, setOfertas] = useState<Ioferta[]>([]);
  const [oferta, searchOferta] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Ioferta[]>([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const stateView = new useStateView();
  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = oferta?.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    getPromocao(), getOfertas();
  }, [id]);

  async function getPromocao() {
    const response = await api.get<Ipromocao>(`/promocao/promocoes/${id}`);
    setPromocao(response.data);
  }

  async function getOfertas() {
    const response = await api.get<Ioferta[]>("/oferta/ofertas");
    setOfertas(response.data);
  }

  useEffect(() => {
    api.get(`/oferta/ofertas`).then((response) => {
      searchOferta(response.data);
    });
  }, []);

  const editarPromocao = useCallback(async (data: CadastroPromocao) => {
    await api
      .put<CadastroPromocao>(`/promocao/atualizar/${id}`, {
        nome: data.nome
      })
      .then(function (response) {
        if (response) {
          setStatus({
            type: "sucesso",
            mensagem: `${response.data}`,
          }),
            navigate(`/admin/promocoes/visualizar/${id}`);
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

  const adicionarOferta = useCallback(async (data: CadastroPromocao) => {
    await api
      .put<CadastroPromocao>(`/promocao/adicionar-oferta/${id}`, {
        ofertas: data.ofertas[0].id.map((i) => ({ id: i })),
      })
      .then(function (response) {
        if (response) {
          setStatus({
            type: "sucesso",
            mensagem: `${response.data}`,
          }),
            navigate(`/admin/promocoes/visualizar/${id}`);
        }
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `Essa promoção já possue a Oferta: ${error.response.data}`,
          });
        }
      });
  }, []);

  const onSubmit = useCallback(async (data: CadastroPromocao) => {
    editarPromocao(data);
  }, []);
  const onSubmitOfertas = useCallback(async (data: CadastroPromocao) => {
    adicionarOferta(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroPromocao>({
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
            <div className="Form">
            <AiOutlineArrowLeft className="icon" onClick={() => navigate(-1)} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="nome">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    defaultValue={promocao?.nome}
                    required
                    {...register("nome")}
                  />
                </div>
              </form>
            </div>
            <form className="formOfertas" onSubmit={handleSubmit(onSubmitOfertas)}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-components">
                  <>Adicionar Ofertas</>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Form.Control
                    aria-label="Text input with dropdown button"
                    onChange={(e) => searchItems(e.target.value)}
                    placeholder="Nome da oferta..."
                  />
                  {searchInput.length > 1
                    ? filteredResults.map((item) => {
                        return (
                          <Dropdown.ItemText key={item.id}>
                            <Form.Check
                              key={item.id}
                              label={item?.nome}
                              value={item.id}
                              {...register("ofertas.0.id")}
                            />
                          </Dropdown.ItemText>
                        );
                      })
                    : ofertas &&
                      ofertas.map((ofertas) => {
                        return (
                          <Dropdown.ItemText key={ofertas.id}>
                            <Form.Check
                              key={ofertas.id}
                              label={ofertas?.nome}
                              value={ofertas.id}
                              {...register("ofertas.0.id")}
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
                text={"Adicionar tags"}
                type="submit"
              />
            </form>
          </main>
        </section>
      </S.Editar>
    </>
  );
}
export default EditarPromo;
