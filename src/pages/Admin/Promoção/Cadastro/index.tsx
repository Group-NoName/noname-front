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
import Ipacote from "../../../../interfaces/pacote";
import Ioferta from "../../../../interfaces/oferta";

interface CadastroPromocao {
  nome: string;
  ofertasObrigatorias: Array<{
    id: string[];
  }>;
  ofertasOpcionais: Array<{
    id: string[];
  }>;
}

function CadastroPromo() {
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const cadastroPromocao = useCallback(async (data: CadastroPromocao) => {
    await api
      .post<CadastroPromocao>(`promocao/cadastro`, {
        nome: data.nome,
        ofertasObrigatorias: data.ofertasObrigatorias[0].id.map((i) => ({ id: i})),
        ofertasOpcionais: data.ofertasOpcionais[0].id.map((i) => ({ id: i})),

      })
      .then(function (response) {
        navigate(`/admin/promocao`, {
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
            mensagem: `Oferta - ${error.response.data} - Já estão em alguma oferta.`,
          });
        }
      });
  }, []);

  const onSubmit = useCallback(async (data: CadastroPromocao) => {
    cadastroPromocao(data);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroPromocao>({
    mode: "onBlur",
  });

  const [oferta, searchOferta] = useState<Ioferta[]>([]);
  const [ofertas, setOferta] = useState<Ioferta[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<Ioferta[]>([]);

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    const filteredData = oferta?.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    getOferta();
  });

  useEffect(() => {
    api.get(`/oferta/ofertas`).then((response) => {
      searchOferta(response.data);
    });
  }, []);

  async function getOferta() {
    const response = await api.get<Ioferta[]>(`/oferta/ofertas`);
    setOferta(response.data);
  }

  return (
    <>
      <S.Cadastro>
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            <div className="contentMain">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="nome">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    placeholder="Ex.: Promoção dia das mães"
                    {...register("nome")}
                  />
                </div>
                <div className="porcentagem">
                  <label htmlFor="nomeCategoria">Ofertas</label>
                  <Form.Control
                    aria-label="Text input with dropdown button"
                    onChange={(e) => searchItems(e.target.value)}
                    placeholder="Buscar Ofertas"
                  />
                  <div className="produtosSearch">
                    <Form className="checkform" aria-label="Default select">
                      {searchInput.length > 1
                        ? filteredResults.map((item) => {
                          return (
                            <Form.Check
                              className="check"
                              required
                              key={item.id || item?.nome}
                              label={item?.nome}
                              value={item.id || item?.nome}
                              {...register("ofertasObrigatorias.0.id")}
                            />
                          );
                        })
                        : oferta &&
                        oferta.map((oferta) => {
                          return (
                            <Form.Check
                              className="check"
                              required
                              key={oferta.id || oferta?.nome}
                              label={oferta?.nome}
                              value={oferta.id || oferta?.nome}
                              {...register("ofertasObrigatorias.0.id")}
                            />
                          );
                        })}
                    </Form>
                    {/* ------------------------------------------ */}
                    <Form className="checkform" aria-label="Default select">
                      {searchInput.length > 1
                        ? filteredResults.map((item) => {
                          return (
                            <Form.Check
                              className="check"
                              required
                              key={item.id || item?.nome}
                              label={item?.nome}
                              value={item.id || item?.nome}
                              {...register("ofertasOpcionais.0.id")}
                            />
                          );
                        })
                        : oferta &&
                        oferta.map((oferta) => {
                          return (
                            <Form.Check
                              className="check"
                              required
                              key={oferta.id || oferta?.nome}
                              label={oferta?.nome}
                              value={oferta.id || oferta?.nome}
                              {...register("ofertasOpcionais.0.id")}
                            />
                          );
                        })}
                    </Form>
                  </div>
                </div>
                <div className="preco">
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
              </form>
            </div>
          </main>
        </section>
      </S.Cadastro>
    </>
  );
}

export default CadastroPromo;
