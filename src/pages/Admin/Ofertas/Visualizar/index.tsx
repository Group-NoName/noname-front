import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav_Admin from '../../../../components/Nav_Admin';
import Ioferta from "../../../../interfaces/oferta";
import { api } from "../../../../service/api";
import * as S from './styles'

function Visualizar() {
    const navigate = useNavigate()
    const [oferta, setOfertas] = useState<Ioferta>()
    const { id } = useParams();
    useEffect(() => { getOferta() }, [id]);

    async function getOferta() {
        const response = await api.get<Ioferta>(`/oferta/ofertas/${id}`)
        setOfertas(response.data)
    }

    const deleteOferta = useCallback(
        async (id: string) => {
            await api.delete(`/oferta/excluir/${id}`)
                .then(() => {
                    navigate(-1)
                }).catch(err => {
                    console.log(err);
                })
        }, []
    )

    /*     const removerProduto = useCallback(
            async (id: string, idProd: string) => {
                await api.delete(`/oferta/remover-produto/${id}`, {
                    produtos: [{
                        id: `${idProd}`
                    }]
                })
                    .then(({ data }) => {
                        alert("Produto removido!")
                        navigate(0)
                    }).catch(error => {
                        alert(`Produto não foi removido! Erro: ${error}`)
                    });
            }, []
        ) */
    const removerProduto = useCallback(
        async (id: string, idProduto: string) => {
            await api.put(`/oferta/remover-produto/${id}`, {
                produtos: [{
                    id: `${idProduto}`
                }]
            })
                .then(({ data }) => {
                    alert("Produto removido!")
                    navigate(0)
                }).catch(error => {
                    alert(`Produto não foi removido! Erro: ${error}`)
                });
        }, []
    )

    return (
        <section>
            <Nav_Admin />
            <S.Visu>
                <div className="porcentagem">
                    <h1>Porcentagem: {oferta?.desconto}</h1>
                    <div className="buttons">
                        <Button variant="danger" onClick={() => deleteOferta(String(oferta?.id))}>Deletar</Button>
                    </div>
                </div>
                <div className="produtosPorcent">
                    <h1>Produtos</h1>
                    <div className="produtos">
                        {oferta && oferta.produtos?.map(item => {
                            return (
                                <>
                                    <div className="produto">
                                        <p>{item?.nome}</p>
                                        <div className="buttons">
                                            <Button variant="danger" onClick={() => removerProduto(String(oferta.id), String(item?.id))}>Remover</Button>
                                            <Link to={`/admin/produtos/visualizar/${item?.id}`}><Button variant="primary">Visualizar</Button></Link>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </S.Visu>
        </section>
    )
}
export default Visualizar;