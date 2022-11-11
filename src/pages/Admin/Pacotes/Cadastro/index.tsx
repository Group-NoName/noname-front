import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import * as S from "./styles";
import { useState, useCallback, useEffect } from "react";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useStateView from "../../../../validators/useStateView";

interface CadastroPacote {
  nome: string;
  produtos: Array<{
    id: string[];
  }>;
}

function cadastro() {
  const [pacote, setPacote] = useState<CadastroPacote>();
  const [produto, searchProduto] = useState([]);
  const [produtos, setProduto] = useState<Iproduto[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const stateView = new useStateView();
  const navigate = useNavigate();
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

  const cadastroPacotes = useCallback(async (data: CadastroPacote) => {
    await api
      .post<CadastroPacote>(`/pacote/cadastro`, {
        nome: data.nome,
        produtos: data.produtos[0].id.map((i) => ({ id: i })),
      })
      .then(function (response) {
        if (response) {
          navigate("/admin/pacotes", {
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

  const onSubmit = useCallback(async (data: CadastroPacote) => {
    cadastroPacotes(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroPacote>({
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
                    placeholder="Pacote X"
                    {...register("nome")}
                  />
                </div>
                {/* <div className="descricao">
                  <label htmlFor="descricao">Descrição</label>
                  <textarea
                    {...register("descricao")}
                    placeholder="Descrição que o pacote irá ter"
                  />
                </div> <div className="position">
                  <div className="imgs">
                    <div className="img1">
                      <label htmlFor="url">Img1</label>
                      <input
                        {...register("images.0.url")}
                        type="text"
                        placeholder="https://exemple.com/image1.jpg"
                      />
                    </div> 
                     <div className="preço">
                      <label htmlFor="preco">Preço</label>
                      <input
                        {...register("preco")}
                        type="number"
                        placeholder="R$ 00.00"
                      />
                    </div>
                  </div> 
               </div> */}
                
                <div className="produtos">
                    <Form.Control
                      className="search"
                      aria-label="Text input with dropdown button"
                      onChange={(e) => searchItems(e.target.value)}
                      placeholder="Nome do produto..."
                    />
                    <Form aria-label="Default select">
                      {searchInput.length > 1
                            ? filteredResults.map((item) => {
                                return (
                                    <Form.Check
                                      key={item.id}
                                      label={item?.nome}
                                      value={item.id}
                                      {...register("produtos.0.id")}
                                    />
                                );
                              })
                            : produtos &&
                              produtos.map((prod) => {
                                return (
                                    <Form.Check
                                      key={prod.id}
                                      label={prod?.nome}
                                      value={prod.id}
                                      {...register("produtos.0.id")}
                                    />
                                );
                              })
                      }
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
