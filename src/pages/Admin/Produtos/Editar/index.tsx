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
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import useStateView from "../../../../validators/useStateView";

interface CadastroProduto {
  nome: string;
  descricao: string;
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
        descricao: data.descricao
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
                    defaultValue={produto?.nome}
                    required
                    {...register("nome")}
                  />
                  <label htmlFor="descricao">Descrição</label>
                  <textarea
                    rows={3}
                    defaultValue={produto?.descricao}
                    {...register("descricao")}
                  />
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
        </section>
      </S.Editar>
    </>
  );
}
export default editar;
