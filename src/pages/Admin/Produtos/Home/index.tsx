import { useCallback, useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import Nav_Admin from "../../../../components/Nav_Admin"
import Iproduto from "../../../../interfaces/produto"
import { api } from "../../../../service/api"
import * as S from './styles'

function Home() {
    const [produtos, setProduto] = useState<Iproduto[]>([])
    useEffect(() => { getAllProdutos() })
    async function getAllProdutos() {
        const response = await api.get<Iproduto[]>('/produto/produtos')
        setProduto(response.data)
    }

    const deleteProduto = useCallback(
        async (id: string) => {
            await api.delete(`/produto/excluir/${id}`)
                .then(() => {
                }).catch(err => {
                    console.log(err);
                })
        }, []
    )
    const navigate = useNavigate()

    return (
        <section>
            <Nav_Admin/>
            <S.Home>
                <main>
                    <div className="Form">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos && produtos.map(i => {
                                    return (
                                        <tr key={i.id}>
                                            <td>{i.nome}</td>
                                            <td>{i.preco}</td>
                                            <td className="tdbuttons">
                                                <div className="buttons">
                                                    <Button variant="outline-primary" onClick={() => navigate(`/admin/produtos/editar/${i.id}`)}>Editar</Button>{' '}
                                                    <Button variant="outline-success" onClick={() => navigate(`/admin/produtos/visualizar/${i.id}`)}>Visualizar</Button>
                                                    <Button variant="outline-danger" onClick={() => deleteProduto(i.id)}>Deletar</Button>{' '}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </main>
            </S.Home> 
        </section>
    )
}
export default Home;