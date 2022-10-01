import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../service/api';
import tags from "../../../../interfaces/tags"
import * as S from './styles'
import Nav_Admin from '../../../../components/Nav_Admin';
import { Button, Form, Table } from 'react-bootstrap';


function homeTag() {

    const [tags, setTags] = useState<tags[]>([])
    const [tag, searchTag] = useState<tags[]>([])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState<tags[]>([]);

    const navigate = useNavigate();
    useEffect(() => { getTags() });

    const deleteTags = useCallback(
        async (id: string) => {
            await api.delete(`/tag/excluir/${id}`)
                .then(() => {
                    alert("Tag deletada!")
                }).catch(err => {
                    alert(`Tag não foi deletada! Erro: ${err}`)
                })
        }, []
    )

    async function getTags() {
        const response = await api.get<tags[]>('/tag/tags')
        setTags(response.data)
    }

    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        const filteredData = tag?.filter((item) => {
            return Object.values(item.nome).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }

    useEffect(() => {
        api.get(`/tag/tags`)
            .then((response) => {
                searchTag(response.data);
            })
    }, [])

    return (
        <section>
            <Nav_Admin />
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
                                <Form.Control aria-label="Text input with dropdown button"
                                    onChange={(e) => searchItems(e.target.value)}
                                    placeholder="Buscar Tag" />
                                {searchInput.length > 1 ? (
                                    filteredResults.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.nome}</td>
                                                <td className="tdbuttons">
                                                    <div className="buttons">
                                                        <Button variant="outline-primary" onClick={() => navigate(`/admin/tags/editar/${item.id}`)}>Editar</Button>{' '}
                                                        <Button variant="outline-success" onClick={() => navigate(`/admin/tags/visualizar/${item.id}`)}>Visualizar</Button>
                                                        <Button variant="outline-danger" onClick={() => deleteTags(item.id)}>Deletar</Button>{' '}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : tags && tags.map(i => {
                                    return (
                                        <tr key={i.id}>
                                            <td>{i.nome}</td>
                                            <td className="tdbuttons">
                                                <div className="buttons">
                                                    <Button variant="outline-primary"
                                                        onClick={() => navigate(`/admin/tags/editar/${i.id}`)}
                                                    >
                                                        Editar
                                                    </Button>{' '}
                                                    <Button variant="outline-success"
                                                        onClick={() => navigate(`/admin/tags/visualizar/${i.id}`)}
                                                    >
                                                        Visualizar
                                                    </Button>
                                                    <Button variant="outline-danger"
                                                        onClick={() => deleteTags(i.id)}
                                                    >
                                                        Deletar
                                                    </Button>{' '}
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