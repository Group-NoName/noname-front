import { useState, useCallback, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import ICategoria from "../../../../interfaces/categoria";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

interface CadastroProduto {
  nome: string;
  descricao: string;
  preco: number;
  images: [{ url: string }, { url: string }, { url: string }];
}

function cadastro() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState<CadastroProduto>();
  const [filteredResults, setFilteredResults] = useState<ICategoria[]>([]);
  const [categoria, searchCategoria] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const stateView = new useStateView();
  const cadastroProduto = useCallback(async (data: CadastroProduto) => {
    await api
      .post<CadastroProduto>("/produto/cadastro", {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        images: [
          { url: data.images[0].url },
          { url: data.images[1].url },
          { url: data.images[2].url },
        ],
      })
      .then(function (response) {
        if (response) {
          setStatus({
            type: "sucesso",
            mensagem: `${response.data}`,
          }),
            navigate("/admin/produtos", {
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

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = categoria?.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    api.get(`/categoria/categorias`).then((response) => {
      searchCategoria(response.data);
    });
  }, []);


  const onSubmit = useCallback(async (data: CadastroProduto) => {
    cadastroProduto(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroProduto>({
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
                    value={produto?.nome}
                    required
                    placeholder="Produto X"
                    {...register("nome")}
                  />
                </div>
                {/* <div className="descricao">
                  <label htmlFor="descricao">Descrição</label>
                  <textarea
                    {...register("descricao")}
                    placeholder="Descrição que o produto irá ter"
                    required
                    value={produto?.descricao}
                  />
                </div> */}
                 <div className="position">
                  {/*<div className="imgs">
                    <div className="img1">
                      <label htmlFor="url">Img1</label>
                      <input
                        type="text"
                        required
                        placeholder="https://exemple.com/image1.jpg"
                        {...register("images.0.url")}
                      />
                    </div>
                    <div className="img2">
                      <label htmlFor="url">Img2</label>
                      <input
                        type="text"
                        required
                        placeholder="https://exemple.com/image2.jpg"
                        {...register("images.1.url")}
                      />
                    </div>
                    <div className="img3">
                      <label htmlFor="url">Img3</label>
                      <input
                        type="text"
                        required
                        placeholder="https://exemple.com/image3.jpg"
                        {...register("images.2.url")}
                      />
                    </div>
                  </div> */}
                  <div className="categoria">
                    <div className="cate">
                      <Form.Control
                        className="search"
                        aria-label="Text input with dropdown button"
                        onChange={(e) => searchItems(e.target.value)}
                        placeholder="Nome da categoria..."
                      />
                      <Form aria-label="Default select">
                        {searchInput.length > 1
                              ? filteredResults.map((categoria) => {
                                  return (
                                      <Form.Check
                                        key={categoria.id}
                                        label={categoria?.nome}
                                        value={categoria.id}
                                      />
                                  );
                                })
                              : categoria &&
                                categoria.map((cat) => {
                                  return (
                                      <Form.Check
                                        key={cat.id}
                                        label={cat?.nome}
                                        value={cat.id}
                                      />
                                  );
                                })
                        }
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
                      value={produto?.preco}
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
                </div>
              </form>
            </div>
          </main>
        </section>
      </S.Cadastro>
    </>
  );
}
export default cadastro;
