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
        <S.Home>
            <section>
                <main>
                    <SideBarAdm />
                    <div className="Form">
                        <Table variant='simple' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>Nome:</Th>
                                    <Th isNumeric>Preço:</Th>
                                    <Th>Ações:</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {produtos && produtos.map(i => {
                                    return (
                                        <Tr key={i.id}>
                                            <Td>{i.nome}</Td>
                                            <Td>{i.preco}</Td>
                                            <Td>
                                                <a onClick={() => navigate(`/admin/produtos/editar/${i.id}`)}> Editar </a>
                                                |<a onClick={() => navigate(`/admin/produtos/visualizar/${i.id}`)}>Visualizar</a>
                                                | <a onClick={() => deleteProduto(i.id)}> Excluir</a>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </div>
                </main>
            </section>
        </S.Home>
    )
}
export default Home;