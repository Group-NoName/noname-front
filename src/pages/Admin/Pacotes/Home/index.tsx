import * as S from './styles';
import { useCallback, useEffect, useState } from 'react';
import Nav_Admin from "../../../../components/Nav_Admin"
import { api } from "../../../../service/api"
import { Button, Form, Table } from 'react-bootstrap';
import Ipacote from '../../../../interfaces/pacote'

function home() {
    const [pacotes, setPacotes] = useState<Ipacote[]>([])
    const [pacote, searchPacote] = useState<Ipacote[]>([])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState<Ipacote[]>([]);


    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        const filteredData = pacote?.filter((item) => {
            return Object.values(item.nome).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }

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
                                                        <Button variant="outline-primary">Editar</Button>{' '}
                                                        <Button variant="outline-success">Visualizar</Button>
                                                        <Button variant="outline-danger">Deletar</Button>{' '}
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
                                                    <Button variant="outline-primary">Editar</Button>{' '}
                                                    <Button variant="outline-success">Visualizar</Button>
                                                    <Button variant="outline-danger">Deletar</Button>{' '}
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