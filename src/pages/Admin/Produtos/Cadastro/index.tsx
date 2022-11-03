import { useState, useCallback, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Nav_Admin from "../../../../components/Nav_Admin";
import ICategoria from "../../../../interfaces/categoria";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";
import * as S from "./styles";

interface CadastroProduto {
  idServico: string,
  produto: Array<{
    nome: string[]
  }>;
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
      .post(`/produto/cadastro/${data.idServico}`, {
        nome: data.produto[0].nome
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
    api.get(`/servico/servicos`).then((response) => {
      searchCategoria(response.data);
    });
  }, []);


  const onSubmit = useCallback(async (data: CadastroProduto) => {
    console.log(data.idServico),
      console.log(data.produto[0].nome),
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
                {searchInput.length > 1
                  ? filteredResults.map((categoria) => {
                    return (
                      <Form.Check
                        type="radio"
                        key={categoria.id}
                        label={categoria?.nome}
                        value={categoria.id}
                        {...register('idServico')}
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
                        {...register('idServico')}
                      />
                    );
                  })
                }
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  value={produto?.produto[0].nome.map((i) => ({ nome: i }))}
                  required
                  {...register('produto.0.nome')}
                  placeholder="Produto X"
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </main>
        </section>
      </S.Cadastro>
    </>
  );
}
export default cadastro;
