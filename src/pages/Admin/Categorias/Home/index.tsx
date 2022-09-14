import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import SideBarAdm from "../../../../components/SideBarAdm"
import ICategoria from '../../../../interfaces/categoria'
import { api } from "../../../../service/api"
import * as S from './styles'

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
        <S.Home>
            <main>
                <SideBarAdm />
                <div className="Form">
                        <Table variant='simple' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>Nome:</Th>
                                    <Th>Ações:</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {categorias && categorias.map(i => {
                                    return (
                                        <Tr key={i.id}>
                                            <Td>{i.nome}</Td>
                                            <Td>
                                                <a onClick={() => navigate(`/admin/categorias/editar/${i.id}`)}> Editar </a>
                                                |<a onClick={() => navigate(`/admin/categorias/visualizar/${i.id}`)}>Visualizar</a>
                                                | <a onClick={() => deletarCategoria(i.id)}> Excluir</a>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </div>
            </main>
        </S.Home>
    )
}
export default Home;