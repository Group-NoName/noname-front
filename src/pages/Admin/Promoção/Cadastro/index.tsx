import { Dropdown, Form } from "react-bootstrap";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import Ipacote from "../../../../interfaces/pacote";
import Ioferta from "../../../../interfaces/oferta";

interface CadastroPromocao {
  nome: string;
  ofertas: Array<{
    id: string[];
  }>;
}

function CadastroPromo() {
  const [promocoes, setPromocao] = useState<CadastroPromocao>();
  const navigate = useNavigate();
  const stateView = new useStateView();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const cadastroPromocao = useCallback(async (data: CadastroPromocao) => {
    await api
      .post<CadastroPromocao>(`promocao/cadastro`, {
        nome: data.nome,
        ofertas: data.ofertas[0].id.map((i) => ({ id: i })),
      })
      .then(function (response) {
        navigate(`/admin/promocoes`, {
          state: {
            data: response.data,
            status: response.status,
          },
        });
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `Oferta - ${error.response.data} - Já estão em alguma oferta.`,
          });
        }
      });
  }, []);

  const onSubmit = useCallback(async (data: CadastroPromocao) => {
    cadastroPromocao(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroPromocao>({
    mode: "onBlur",
  });

  const [oferta, searchPacote] = useState([]);
  const [ofertas, setPacote] = useState<Ioferta[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Ipacote[]>([]);

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
      getOferta();
    });
  
    useEffect(() => {
      api.get(`/oferta/ofertas`).then((response) => {
        searchPacote(response.data);
      });
    }, []);
    
    async function getOferta() {
      const response = await api.get<Ioferta[]>(`/oferta/ofertas`);
      setPacote(response.data);
    }

  return (
    <>
      <S.Cadastro>
        <section>
          <header>
            <Nav_Admin /> 
          </header>
          <main>
            <div className="contentMain">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="porcentagem">
                  <label htmlFor="nomeCategoria">Pacotes</label>
                  <Form.Control
                  aria-label="Text input with dropdown button"
                  onChange={(e) => searchItems(e.target.value)}
                  placeholder="Buscar Pacotes"
                />
                <div className="produtosSearch">
                  <Form className='checkform' aria-label="Default select">
                    {/* {searchInput.length > 1
                      ? filteredResults.map((item) => {
                          return (
                            <Form.Check
                              className="check"
                              required
                              key={item.id || item?.nome}
                              label={item?.nome}
                              value={item.id || item?.nome}
                              {...register("pacotes.0.id")}
                            />
                          );
                        })
                      : pacotes &&
                        pacotes.map((pacote) => {
                          return (
                            <Form.Check
                              className="check"
                              required
                              key={pacote.id || pacote?.nome}
                              label={pacote?.nome}
                              value={pacote.id || pacote?.nome}
                              {...register("pacotes.0.id")}
                            />
                          );
                        })} */}
                  </Form>
                </div>

                </div>

                <div className="preco">
                    <label htmlFor="preco">Preço</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      {...register("preco")}
                      placeholder="R$ 00.00"
                      value={ofertas?.preco}
                    />
                    <Button
                      color={"#ffff"}
                      width={"8"}
                      height={"3"}
                      fontSize={"20"}
                      backgroundColor={"#3a4ad9"}
                      text={"Cadastrar"}
                      type="submit"
                    />
                  </div>
              </form>
            </div>
          </main>
        </section>
      </S.Cadastro>
    </>
  );
}

export default CadastroPromo;