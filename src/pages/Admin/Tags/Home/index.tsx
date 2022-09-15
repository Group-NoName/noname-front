import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../service/api';
import SideBarAdm from '../../../../components/SideBarAdm'
import tags from "../../../../interfaces/tags"
import * as S from './styles'


function homeTag() {
    const [tags, setTags] = useState<tags[]>([])
    const navigate = useNavigate();
    useEffect(() => { getTags() });
    async function getTags() {
        const response = await api.get<tags[]>('/tags/tags')
        setTags(response.data)
    }
    const deleteTags = useCallback(
        async (id: string) => {
            await api.delete(`/tags/excluir/${id}`)
                .then(() => {
                }).catch(err => {
                    console.log(err);
                })
        }, []
    )
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
                            {tags && tags.map(i => {
                                return (
                                    <Tr key={i.id}>
                                        <Td>{i.nome}</Td>
                                        <Td>
                                            <a onClick={() => navigate(`/admin/tags/editar/${i.id}`)}> Editar </a>
                                            |<a onClick={() => navigate(`/admin/tags/visualizar/${i.id}`)}>Visualizar</a>
                                            | <a onClick={() => deleteTags(i.id)}> Excluir</a>
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
export default homeTag