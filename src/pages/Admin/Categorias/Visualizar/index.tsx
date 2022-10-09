import * as S from "./styles";
import { useState, useEffect, useCallback } from "react";
import Nav_Admin from "../../../../components/Nav_Admin";
import Iproduto from "../../../../interfaces/produto";
import Categoria from "../../../../interfaces/categoria";
import { api } from "../../../../service/api";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import useStateView from "../../../../validators/useStateView";

function visualizar() {
  const [categoria, setCategoria] = useState<Categoria>();
  const [categoriasProdutos, setCategoriaProdutos] = useState<Iproduto[]>([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stateView = new useStateView();

  useEffect(() => {
    getCategorias(), getCategoriasProdutos();
  }, [id]);

  async function getCategorias() {
    const response = await api.get<Categoria>(`/categoria/categorias/${id}`);
    setCategoria(response.data);
  }

  async function getCategoriasProdutos() {
    const response = await api.get<Iproduto[]>(
      `categoria/categorias/${id}/produtos`
    );
    setCategoriaProdutos(response.data);
  }

  const deletarRelacao = useCallback(async (idCat: string, idProd: string) => {
    await api
      .delete(`categoria/categorias-produtos/${idCat}/${idProd}`)
      .then(function (response) {
        if (response) {
          navigate(`/admin/categorias/visualizar/${id}`, {
            state: {
              data: response.data,
              status: response.status,
            },
          }),
            navigate(0);
        }
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `${error.response.data}`,
          }),
            navigate(0);
        }
      });
  }, []);

  const deletarCategoria = useCallback(async (id: string) => {
    await api
      .delete(`/categoria/excluir/${id}`)
      .then(function (response) {
        if (response) {
          navigate(`/admin/categorias`, {
            state: {
              data: response.data,
              status: response.status,
            },
          }),
            navigate(0);
        }
      })
      .catch(function (error) {
        if (error.response) {
          setStatus({
            type: "error",
            mensagem: `${error.response.data}`,
          }),
            navigate(0);
        }
      });
  }, []);

  return (
    <>
      <S.Visualizar>
        {stateView.validacao(status.type, status.type)}
        {stateView.validacao(location.state?.status, location.state?.data)}
        <section>
          <header>
            <Nav_Admin />
          </header>
          <main>
            <div className="categoria">
              <h1>Categoria: {categoria?.nome}</h1>
              <div className="bottons">
                <Link to={`/admin/categorias/editar/${categoria?.id}`}>
                  <Button variant="success">Editar</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => deletarCategoria(String(categoria?.id))}
                >
                  Deletar
                </Button>
              </div>
            </div>
            <div className="produtosRelacionados">
              <h3>Produtos</h3>
              <div className="produtos">
                {categoriasProdutos.map((item) => {
                  if (item == null) {
                    return <h1></h1>;
                  } else {
                    return (
                      <>
                        <div className="produto">
                          <p>{item?.nome}</p>
                          <div className="buttons">
                            <Button
                              variant="danger"
                              onClick={() =>
                                deletarRelacao(
                                  String(categoria?.id),
                                  String(item?.id)
                                )
                              }
                            >
                              Deletar
                            </Button>
                            <Link to={`/admin/produtos/visualizar/${item?.id}`}>
                              <Button variant="primary">Visualizar</Button>
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </main>
        </section>
        
      </S.Visualizar>
    </>
  );
}
export default visualizar;
