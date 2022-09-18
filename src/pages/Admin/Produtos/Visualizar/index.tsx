// Tela do admin que vai pegar os produtos especificos
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import * as S from './styles'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Nav_Admin from "../../../../components/Nav_Admin";
import { Button } from "react-bootstrap";

function Visualizar() {
    const [produto, setProduto] = useState<Iproduto>()
    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => { getProduto() }, [id]);

    async function getProduto() {
        const response = await api.get<Iproduto>(`/produto/produtos/${id}`)
        setProduto(response.data)
    }
    const deleteProduto = useCallback(
        async (id: string) => {
            await api.delete(`/produto/excluir/${id}`)
                .then(() => {
                    navigate(-1)
                }).catch(err => {
                    console.log(err);
                })
        }, []
    )

    const deleteRelacao = useCallback(
        async (idTags: string, idProd: string) => {
            await api.delete(`/tags/tag-produtos/${idTags}/${idProd}`)
                .then(({ data }) => {
                    alert("Tag removida!")
                    navigate(0)
                }).catch(error => {
                    alert(`Tag não foi removida! Erro: ${error}`)
                });
        }, []
    )

    return (
        <section>
            <Nav_Admin />
            <S.Home>
                <main>
                    <div className="mainContent">
                        <AiOutlineArrowLeft className="icon" onClick={() => navigate(-1)} />
                        <div className="left-content">
                            <div className="content">
                                <h1>{produto?.nome}</h1>
                                <h3>R$ {produto?.preco}</h3>
                                <div className="description">
                                    <p>{produto?.descricao}</p>
                                </div>
                                <div className="tags">
                                    <h2>Tags</h2>
                                    <div className="tagscards">
                                        {produto && produto?.tags.map(item => {
                                            if (item == null) {
                                                return (
                                                    <h1></h1>
                                                )
                                            } else {
                                                return (
                                                    <>
                                                        <div className="tag" key={item.id}>
                                                            <p>{item?.nome}</p>
                                                            <Button variant="danger" onClick={() => deleteRelacao(String(item.id), String(produto.id))}>Remover</Button>
                                                            <Link to={`/admin/produtos/visualizar/${item?.id}`}><Button variant="primary">Visualizar</Button></Link>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <img src={`${produto?.images[0].url}`} alt="" />
                            <Button variant="outline-primary" onClick={() => navigate(`/admin/produtos/editar/${produto?.id}`)}>Editar</Button>
                            <Button variant="outline-danger" onClick={() => deleteProduto(String(produto?.id))}>Deletar</Button>
                        </div>
                    </div>
                </main>
            </S.Home>
        </section >
    )
}
export default Visualizar;