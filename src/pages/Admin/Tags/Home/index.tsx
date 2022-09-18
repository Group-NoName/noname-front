import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../service/api';
import tags from "../../../../interfaces/tags"
import * as S from './styles'
import Nav_Admin from '../../../../components/Nav_Admin';
import { Button, Table } from 'react-bootstrap';


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
                                {tags && tags.map(i => {
                                    return (
                                        <tr key={i.id}>
                                            <td>{i.nome}</td>
                                            <td className="tdbuttons">
                                                <div className="buttons">
                                                    <Button variant="outline-primary" onClick={() => navigate(`/admin/tags/editar/${i.id}`)}>Editar</Button>{' '}
                                                    <Button variant="outline-success" onClick={() => navigate(`/admin/tags/visualizar/${i.id}`)}>Visualizar</Button>
                                                    <Button variant="outline-danger" onClick={() => deleteTags(i.id)}>Deletar</Button>{' '}
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
export default homeTag