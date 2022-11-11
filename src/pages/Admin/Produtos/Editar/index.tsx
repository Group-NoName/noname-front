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
  preco: number;
}

function editar() {
  const [produto, setProduto] = useState<Iproduto>();
  const [tags, setTags] = useState<tags[]>([]);
  const [tag, searchTag] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const stateView = new useStateView();

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

  const onSubmit = useCallback(async (data: CadastroProduto) => {
    editarProduto(data);
    console.log(`vini puta ${data.descricao}`);
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
                </div>
              </form>
            </div>
          </main>
        </section>
      </S.Editar>
    </>
  );
}
export default editar;
