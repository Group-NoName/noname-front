import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react'
import { useEffect, useState } from "react"
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
                                </Tr>
                            </Thead>
                            <Tbody>
                                {produtos && produtos.map(i => {
                                    return (
                                        <Tr key={i.id}>
                                            <Td>{i.nome}</Td>
                                            <Td>{i.preco}</Td>                                            
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