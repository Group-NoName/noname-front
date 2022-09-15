// Tela do admin que vai pegar os produtos especificos
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarAdm from "../../../../components/SideBarAdm"
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import * as S from './styles'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Button from "../../../../components/Button";

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
                .then(() => {
                    navigate(0)
                }).catch(err => {
                    console.log(err);
                })
        }, []
    )

    return (
        <S.Home>
            <main>
                <SideBarAdm />
                <div className="mainContent">
                    <AiOutlineArrowLeft className="icon" onClick={() => navigate(-1)} />
                    <div className="left-content">
                        <div className="content">
                            <h1>{produto?.nome}</h1>
                            <h3>R$ {produto?.preco}</h3>
                            <div className="description">
                                <p>{produto?.descricao}</p>
                            </div>
                            <div>
                                <h2>Tags</h2>
                                {produto?.tags.map(i => {
                                    return (
                                        <>
                                            <h3>{i.nome}</h3>
                                            <Button color={"black"} width={"5"} height={"2"} fontSize={"20"} backgroundColor={"#fff"} text={"Remover"} onClick={() => deleteRelacao(String(i.id), String(produto.id))} />
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <img src={`${produto?.images[0].url}`} alt="" />
                        <Button color={"black"} width={"5"} height={"2"} fontSize={"20"} backgroundColor={"#fff"} text={"Editar"} onClick={() => navigate(`/admin/produtos/editar/${produto?.id}`)} />
                        <Button color={"#fff"} width={"5"} height={"2"} fontSize={"20"} backgroundColor={"red"} text={"Excluir"} onClick={() => deleteProduto(String(produto?.id))} />
                    </div>
                </div>
            </main>
        </S.Home>
    )
}
export default Visualizar;