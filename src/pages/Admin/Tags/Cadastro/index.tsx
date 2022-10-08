import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

interface CadastroTags {
  nome: string;
}
function cadastroTag() {
  const [tag, setTag] = useState<CadastroTags>();

  const navigate = useNavigate();
  const stateView = new useStateView();

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const cadastroTag = useCallback(async (data: CadastroTags) => {
    await api
      .post<CadastroTags>("/tag/cadastro", {
        nome: data.nome,
      })
      .then((response) => {
        navigate("/admin/tags", {
          state: {
            data: response.data,
            status: response.status,
          },
        });
      })
      .catch((error) => {
        setStatus({
          type: "error",
          mensagem: `${error.response.data}`,
        });
      });
  }, []);

  const onSubmit = useCallback(async (data: CadastroTags) => {
    cadastroTag(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroTags>({
    mode: "onBlur",
  });

  return (
    <section>
      <Nav_Admin />
      <S.Cadastro>
        {stateView.validacao(status.type, status.mensagem)}
        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="nome">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                value={tag?.nome}
                required
                placeholder="Tag X"
                {...register("nome")}
              />
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
        </main>
      </S.Cadastro>
    </section>
  );
}
export default cadastroTag;
