import { useCallback, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Nav_Admin from '../../../../components/Nav_Admin'
import ICategoria from '../../../../interfaces/categoria'
import { api } from "../../../../service/api"
import * as S from './styles'
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap"

function Home() {
    const [categorias, setCategorias] = useState<ICategoria[]>([])
    useEffect(() => { getAllCategorias() })
    async function getAllCategorias() {
        const response = await api.get<ICategoria[]>('/categoria/categorias')
        setCategorias(response.data)
    }

    const deletarCategoria = useCallback(
        async (id: string) => {
            await api.delete(`/categoria/categorias/${id}`)
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
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias && categorias.map(i => {
                                    return (
                                        <tr key={i.id}>
                                            <td>{i.nome}</td>
                                            <td className="tdbuttons">
                                                <Button variant="outline-primary" onClick={() => navigate(`/admin/categorias/editar/${i.id}`)}>Editar</Button>{' '}
                                                <Button variant="outline-success" onClick={() => navigate(`/admin/categorias/visualizar/${i.id}`)}>Visualizar</Button>
                                                <Button variant="outline-danger" onClick={() => deletarCategoria(i.id)}>Deletar</Button>{' '}
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