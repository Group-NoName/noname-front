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

interface CadastroOferta {
  nome: string;
  preco: number;
  pacotes: string;
}
function Cadastro() {
  const [ofertas, setOferta] = useState<CadastroOferta>();
  const navigate = useNavigate();
  const stateView = new useStateView();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const cadastroOferta = useCallback(async (data: CadastroOferta) => {
    await api
      .post<CadastroOferta>(`/oferta/cadastro`, {
        nome: data.nome,
        preco: data.preco,
        pacotes: {
          id: data.pacotes
        }
      })
      .then(function (response) {
        navigate(`/admin/ofertas`, {
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
            mensagem: `Pacote - ${error.response.data} - Já estão em alguma oferta.`,
          });
        }
      });
  }, []);

  const onSubmit = useCallback(async (data: CadastroOferta) => {
    cadastroOferta(data), 
    console.log(data.pacotes);
    
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroOferta>({
    mode: "onBlur",
  });

  /* const [produto, searchProduto] = useState([]); */
  const [pacote, searchPacote] = useState([]);
  /* const [produtos, setProduto] = useState<Iproduto[]>([]); */
  const [pacotes, setPacote] = useState<Ipacote[]>([]);
  const [searchInput, setSearchInput] = useState("");
  /* const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]); */
  const [filteredResults, setFilteredResults] = useState<Ipacote[]>([]);

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = pacote?.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  /* useEffect(() => {
    getProduto();
  }); */
  useEffect(() => {
    getPacote();
  });

  /* useEffect(() => {
    api.get(`/produto/produtos`).then((response) => {
      searchProduto(response.data);
    });
  }, []); */

  useEffect(() => {
    api.get(`/pacote/pacotes`).then((response) => {
      searchPacote(response.data);
    });
  }, []);

  /* async function getProduto() {
    const response = await api.get<Iproduto[]>(`/produto/produtos`);
    setProduto(response.data);
  } */
  async function getPacote() {
    const response = await api.get<Ipacote[]>(`/pacote/pacotes`);
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
              <div className="nome">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    placeholder="Oferta X"
                    {...register("nome")}
                  />
                </div>
                <div className="porcentagem">
                  <label htmlFor="nomeCategoria">Pacotes</label>
                  <Form.Control
                  aria-label="Text input with dropdown button"
                  onChange={(e) => searchItems(e.target.value)}
                  placeholder="Buscar Pacotes"
                />
                <div className="produtosSearch">
                  <Form className='checkform' aria-label="Default select">
                    {searchInput.length > 1
                      ? filteredResults.map((item) => {
                          return (
                            <Form.Check
                              className="check"
                              required
                              type="radio"
                              key={item.id }
                              label={item?.nome}
                              value={item.id }
                              {...register("pacotes")}
                            />
                          );
                        })
                      : pacotes &&
                        pacotes.map((pacote) => {
                          return (
                            <Form.Check
                              className="check"
                              required
                              type="radio"
                              key={pacote.id }
                              label={pacote?.nome}
                              value={pacote.id }
                              {...register("pacotes")}
                            />
                          );
                        })}
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

export default Cadastro;
