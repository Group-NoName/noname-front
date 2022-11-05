import { useState, useCallback, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useFieldArray, useForm, Control } from "react-hook-form";
import { useNavigate } from "react-router-dom";
/* import Button from "../../../../components/Button"; */
import Nav_Admin from "../../../../components/Nav_Admin";
import ICategoria from "../../../../interfaces/categoria";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

type CadastroProduto = {
  idServico: string;
  produtos: {
    nome: string;
  }[];
};

function cadastro() {
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const stateView = new useStateView();
  const cadastroProduto = useCallback(async (data: CadastroProduto) => {
    await api
      .post<CadastroProduto>(
        `/produto/cadastro/${data.idServico}`,
        data.produtos
      )
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

  const { fields, append, remove } = useFieldArray({
    name: "produtos",
    control,
    rules: {
      required: "Por favor, adicionar 1 ou vários produtos",
    },
  });

  const [filteredResults, setFilteredResults] = useState<ICategoria[]>([]);
  const [categoria, searchCategoria] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
    api.get(`/servico/servicos`).then((response) => {
      searchCategoria(response.data);
    });
  }, []);

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
                  {searchInput.length > 1
                    ? filteredResults.map((categoria) => {
                        return (
                          <Form.Check
                            type="radio"
                            key={categoria.id}
                            label={categoria?.nome}
                            value={categoria.id}
                            {...register("idServico")}
                          />
                        );
                      })
                    : categoria &&
                      categoria.map((cat) => {
                        return (
                          <Form.Check
                            type="radio"
                            key={cat.id}
                            label={cat?.nome}
                            value={cat.id}
                            {...register("idServico")}
                          />
                        );
                      })}
                  {fields.map((item, index) => {
                    return (
                      <>
                        <label htmlFor="nome">Nome</label>
                        <input
                          type="text"
                          required
                          placeholder="Produto X"
                          {...register(`produtos.${index}.nome`)}
                        />
                        <button type="button" onClick={() => remove(index)}>
                          Delete
                        </button>
                      </>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      append({
                        nome: "",
                      });
                    }}
                  >
                    Append
                  </button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
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
