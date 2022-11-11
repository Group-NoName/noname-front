import { useState, useCallback, useEffect, KeyboardEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { useFieldArray, useForm, Control } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Nav_Admin from "../../../../components/Nav_Admin";
import ICategoria from "../../../../interfaces/categoria";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

type CadastroProduto = {
  produtos: {
    nome: string;
  }[];
};

function cadastroProduto() {
  const [categoria, setCategoria] = useState<ICategoria>();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const stateView = new useStateView();

  const { id } = useParams();
  const cadastroProduto = useCallback(async (data: CadastroProduto) => {
    await api
      .post<CadastroProduto>(`/produto/cadastro-servico/${id}`, data.produtos)
      .then(function (response) {
        if (response) {
          setStatus({
            type: "sucesso",
            mensagem: `${response.data}`,
          }),
            navigate("/admin/categorias", {
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

  const onSubmit = useCallback(async (data: CadastroProduto) => {
    cadastroProduto(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CadastroProduto>({
    mode: "onBlur",
    defaultValues: {
      produtos: [{ nome: "" }],
    },
  });

  useEffect(() => {
    getCategorias();
  }, [id]);

  async function getCategorias() {
    const response = await api.get<ICategoria>(`/servico/servicos/${id}`);
    setCategoria(response.data);
  }

  const { fields, append, remove } = useFieldArray({
    name: "produtos",
    control,
    rules: {
      required: "Por favor, adicionar 1 ou vários produtos",
    },
  });

  const duplicarTab = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Tab") {
      [
        ...fields,
        append({
          nome: "",
        }),
      ];
    }
  };

  function filedCont(index: number) {
    if (index <= 9) {
      return (
        <button
          className="append"
          type="button"
          onKeyDown={(event) => duplicarTab(event)}
          onClick={() => {
            append({
              nome: "",
            });
          }}
        >
          Novo
        </button>
      );
    } else {
      return <h1>Quantidade maxima de produtos para cadastrar</h1>;
    }
  }

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
                  <h1>Serviço: {categoria?.nome}</h1>
                  {fields.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <label htmlFor="nome">Nome</label>
                        <input
                          type="text"
                          required
                          placeholder="Produto X"
                          {...register(`produtos.${index}.nome`)}
                        />
                        <button
                          className="delete"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Remover
                        </button>
                      </div>
                    );
                  })}
                  <div className="controller-btn">
                    {filedCont(fields.length)}
                    <Button variant="primary" type="submit">
                      Cadastrar
                    </Button>
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
export default cadastroProduto;
