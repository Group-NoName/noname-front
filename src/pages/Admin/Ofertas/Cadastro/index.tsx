import { Dropdown, Form } from "react-bootstrap";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import useStateView from "../../../../validators/useStateView";

interface CadastroOferta {
  desconto: number;
  produtos: Array<{
    id: string[];
  }>;
}
function Cadastro() {
  const [ofertas, setOferta] = useState<CadastroOferta>();
  const navigate = useNavigate();
  const stateView = new useStateView();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const cadastroOferta = useCallback(async (data: CadastroOferta) => {
    await api
      .post<CadastroOferta>(`oferta/cadastro`, {
        desconto: data.desconto,
        produtos: data.produtos[0].id.map((i) => ({ id: i })),
      })
      .then(function (response) {
        navigate(`/admin/ofertas`, {
          state: {
            data: response.data,
            status: response.status,
          },
        });
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `Produtos - ${error.response.data} - Já estão em alguma oferta.`,
          });
        }
      });
  }, []);

  const onSubmit = useCallback(async (data: CadastroOferta) => {
    cadastroOferta(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroOferta>({
    mode: "onBlur",
  });

  const [produto, searchProduto] = useState([]);
  const [produtos, setProduto] = useState<Iproduto[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);

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

  return (
    <section>
      <Nav_Admin />
      <S.Cadastro>
        <main>
          {stateView.validacao(status.type, status.mensagem)}
          <div className="contentMain">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="porcentagem">
                <label htmlFor="nomeCategoria">Porcentagem</label>
                <input required {...register("desconto")} type="number" />
              </div>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-components">
                  <>Adicionar produtos</>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Form.Control
                    aria-label="Text input with dropdown button"
                    onChange={(e) => searchItems(e.target.value)}
                    placeholder="Nome do produto..."
                  />
                  {searchInput.length > 1
                    ? filteredResults.map((item) => {
                        return (
                          <Dropdown.ItemText key={item.id}>
                            <Form.Check
                              key={item.id}
                              label={item?.nome}
                              value={item.id}
                              {...register("produtos.0.id")}
                            />
                          </Dropdown.ItemText>
                        );
                      })
                    : produtos &&
                      produtos.map((prod) => {
                        return (
                          <Dropdown.ItemText key={prod.id}>
                            <Form.Check
                              key={prod.id}
                              label={prod?.nome}
                              value={prod.id}
                              {...register("produtos.0.id")}
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
                text={"Cadastrar"}
                type="submit"
              />
            </form>
          </div>
        </main>
      </S.Cadastro>
    </section>
  );
}

export default Cadastro;
