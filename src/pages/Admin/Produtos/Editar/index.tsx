import { Checkbox, Stack } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import Iproduto from "../../../../interfaces/produto";
import tags from "../../../../interfaces/tags";
import { api } from "../../../../service/api";
import { AiOutlineArrowLeft } from "react-icons/ai";
import * as S from "./styles";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { ButtonGroup, InputGroup, ToggleButton } from "react-bootstrap";
import useStateView from "../../../../validators/useStateView";

interface CadastroProduto {
  nome: string;
  descricao: string;
  preco: number;
  images: [{ url: string }, { url: string }, { url: string }];
  tags: Array<{
    id: string[];
  }>;
}

function editar() {
  const [produto, setProduto] = useState<Iproduto>();
  const [tags, setTags] = useState<tags[]>([]);
  const [tag, searchTag] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<tags[]>([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const stateView = new useStateView();
  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = tag?.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    getProduto(), getTags();
  }, [id]);

  async function getProduto() {
    const response = await api.get<Iproduto>(`/produto/produtos/${id}`);
    setProduto(response.data);
  }

  async function getTags() {
    const response = await api.get<tags[]>("/tag/tags");
    setTags(response.data);
  }

  useEffect(() => {
    api.get(`/tag/tags`).then((response) => {
      searchTag(response.data);
    });
  }, []);

  const editarProduto = useCallback(async (data: CadastroProduto) => {
    await api
      .put<CadastroProduto>(`/produto/atualizar/${id}`, {
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
            navigate(`/admin/produtos/visualizar/${id}`);
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

  const adicionarTag = useCallback(async (data: CadastroProduto) => {
    await api
      .put<CadastroProduto>(`/produto/adicionar-tag/${id}`, {
        tags: data.tags[0].id.map((i) => ({ id: i })),
      })
      .then(function (response) {
        if (response) {
          setStatus({
            type: "sucesso",
            mensagem: `${response.data}`,
          }),
            navigate(`/admin/produtos/visualizar/${id}`);
        }
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `Esse produto já possue a Tag: ${error.response.data}`,
          });
        }
      });
  }, []);

  const onSubmit = useCallback(async (data: CadastroProduto) => {
    editarProduto(data);
    console.log(`vini puta ${data.descricao}`);
  }, []);
  const onSubmitTags = useCallback(async (data: CadastroProduto) => {
    adicionarTag(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroProduto>({
    mode: "onBlur",
  });

  return (
    <section>
      <Nav_Admin />
      {stateView.validacao(status.type, status.mensagem)}

      <S.Editar>
        <main>
          <AiOutlineArrowLeft className="icon" onClick={() => navigate(-1)} />
          <div className="Form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="nome">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  defaultValue={produto?.nome}
                  required
                  {...register("nome")}
                />
              </div>
              <div className="descricao">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  {...register("descricao")}
                  required
                  defaultValue={produto?.descricao}
                />
              </div>
              <div className="position">
                <div className="imgs">
                  <div className="img1">
                    <label htmlFor="url">Img1</label>
                    <input
                      type="text"
                      required
                      defaultValue={produto?.images[0].url}
                      {...register("images.0.url")}
                    />
                    {/*                                         <img src={produto?.images[0].url} alt="" /> */}
                  </div>
                  <div className="img2">
                    <label htmlFor="url">Img2</label>
                    <input
                      type="text"
                      required
                      defaultValue={produto?.images[1].url}
                      {...register("images.1.url")}
                    />
                    {/* <img src={produto?.images[1].url} alt="" /> */}
                  </div>
                  <div className="img3">
                    <label htmlFor="url">Img3</label>
                    <input
                      type="text"
                      required
                      defaultValue={produto?.images[2].url}
                      {...register("images.2.url")}
                    />
                    {/* <img src={produto?.images[2].url} alt="" /> */}
                  </div>
                </div>
                <div className="preco">
                  <label htmlFor="preco">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    {...register("preco")}
                    defaultValue={produto?.preco}
                  />
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
            </form>
          </div>
          <form className="formTags" onSubmit={handleSubmit(onSubmitTags)}>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-custom-components">
                <>Adicionar Tags</>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Form.Control
                  aria-label="Text input with dropdown button"
                  onChange={(e) => searchItems(e.target.value)}
                  placeholder="Nome da tag..."
                />
                {searchInput.length > 1
                  ? filteredResults.map((item) => {
                      return (
                        <Dropdown.ItemText key={item.id}>
                          <Form.Check
                            key={item.id}
                            label={item?.nome}
                            value={item.id}
                            {...register("tags.0.id")}
                          />
                        </Dropdown.ItemText>
                      );
                    })
                  : tags &&
                    tags.map((tags) => {
                      return (
                        <Dropdown.ItemText key={tags.id}>
                          <Form.Check
                            key={tags.id}
                            label={tags?.nome}
                            value={tags.id}
                            {...register("tags.0.id")}
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
      </S.Editar>
    </section>
  );
}
export default editar;
