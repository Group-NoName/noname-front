import * as S from './styles';
import { useCallback, useEffect, useState } from 'react';
import Nav_Admin from "../../../../components/Nav_Admin"
import { api } from "../../../../service/api"
import { Button, Form, Table } from 'react-bootstrap';
import Ipacote from '../../../../interfaces/pacote'
import { useNavigate } from 'react-router-dom'

function home() {
    const [pacotes, setPacotes] = useState<Ipacote[]>([])
    const [pacote, searchPacote] = useState<Ipacote[]>([])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState<Ipacote[]>([]);
    const navigate = useNavigate()

    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        const filteredData = pacote?.filter((item) => {
            return Object.values(item.nome).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }

    const deletePacote = useCallback(
        async (id: string) => {
            await api.delete(`/pacote/excluir/${id}`)
                .then(() => {
                    alert("Pacote Deletado")
                }).catch(err => {
                    alert(`Pacote não foi deletado! Erro:${err}`)
                })
        }, []
    )

    useEffect(() => {
        api.get(`/pacote/pacotes`)
            .then((response) => {
                searchPacote(response.data);
            })
    }, [])

    useEffect(() => { getPacotes() })
    async function getPacotes() {
        const response = await api.get<Ipacote[]>('/pacote/pacotes')
        setPacotes(response.data)
    }
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
                                    <th>Preço</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Form.Control aria-label="Text input with dropdown button"
                                    onChange={(e) => searchItems(e.target.value)}
                                    placeholder="Buscar pacote" />
                                {searchInput.length > 1 ? (
                                    filteredResults.map((pacotes) => {
                                        return (
                                            <tr>
                                                <td>{pacotes.nome}</td>
                                                <td>{pacotes.preco}</td>
                                                <td className="tdbuttons">
                                                    <div className="buttons">
                                                        <Button variant="outline-primary" onClick={() => navigate(`/admin/pacotes/editar/${pacotes.id}`)}>Editar</Button>{' '}
                                                        <Button variant="outline-success" onClick={() => navigate(`/admin/pacotes/visualizar/${pacotes.id}`)}>Visualizar</Button>
                                                        <Button variant="outline-danger" onClick={() => deletePacote(pacotes.id)}>Deletar</Button>{' '}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : pacotes && pacotes.map((pacotes) => {
                                    return (
                                        <tr>
                                            <td>{pacotes.nome}</td>
                                            <td>{pacotes.preco}</td>
                                            <td className="tdbuttons">
                                                <div className="buttons">
                                                    <Button variant="outline-primary" onClick={() => navigate(`/admin/pacotes/editar/${pacotes.id}`)}>Editar</Button>{' '}
                                                    <Button variant="outline-success" onClick={() => navigate(`/admin/pacotes/visualizar/${pacotes.id}`)}>Visualizar</Button>
                                                    <Button variant="outline-danger" onClick={() => deletePacote(pacotes.id)}>Deletar</Button>{' '}
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
export default home;