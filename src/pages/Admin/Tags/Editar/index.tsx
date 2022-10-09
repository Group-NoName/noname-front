import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import ITags from "../../../../interfaces/tags";
import { api } from "../../../../service/api";
import Nav_Admin from "../../../../components/Nav_Admin";
import * as S from "./styles";
import useStateView from "../../../../validators/useStateView";

interface editarTag {
  nome: string;
}

function editarTag() {
  const [tag, setTag] = useState<ITags>();

  const { id } = useParams();
  useEffect(() => {
    getTag();
  }, [id]);
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const stateView = new useStateView();
  async function getTag() {
    const response = await api.get<ITags>(`tag/tags/${id}`);
    setTag(response.data);
  }

  const editarTag = useCallback(async (data: editarTag) => {
    await api
      .put<editarTag>(`/tag/atualizar/${id}`, {
        nome: data.nome,
      })
      .then((response) => {
        navigate(`/admin/tags/visualizar/${id}`, {
          state: {
            data: response.data,
            status: response.status,
          },
        });
      })
      .catch((error) => {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `${error.response.data}`,
          });
        }
      });
  }, []);

  const onSubmit = useCallback(async (data: editarTag) => {
    editarTag(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editarTag>({
    mode: "onBlur",
  });

  return (
    <> 
      <S.Editar>
        {stateView.validacao(status.type, status.mensagem)}
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="nome">
                <label htmlFor="nome">Nome :</label>
                <input type="text" defaultValue={tag?.nome} {...register("nome")} />
              </div>
              <Button
                color={"#ffff"}
                width={"8"}
                height={"3"}
                fontSize={"20"}
                backgroundColor={"#3a4ad9"}
                text={"Editar"}
                type="submit"
              />
            </form>
          </main>
        </section>
      </S.Editar>
    </>
  );
}
export default editarTag;
