import { useCallback, useEffect, useState } from "react"
import { Button, Form, Table } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import Nav_Admin from "../../../../components/Nav_Admin"
import Ioferta from "../../../../interfaces/oferta"
import { api } from "../../../../service/api"
import * as S from './styles'

function Home() {
    const [ofetas, setOferta] = useState<Ioferta[]>([])
    const [oferta, searchOferta] = useState<Ioferta[]>([])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState<Ioferta[]>([]);
    const navigate = useNavigate()

    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        const filteredData = oferta?.filter((item) => {
            return Object.values(String(item.desconto)).join('').includes(searchInput)
        })
        setFilteredResults(filteredData)
    }

    const deleteOferta = useCallback(
        async (id: string) => {
            await api.delete(`/oferta/excluir/${id}`)
                .then(() => {
                    alert("Oferta Deletada")
                    navigate(0)
                }).catch(err => {
                    alert(`Oferta não foi deletado! Erro:${err}`)
                })
        }, []
    )

    useEffect(() => {
        api.get(`/oferta/ofertas`)
            .then((response) => {
                searchOferta(response.data);
            })
    }, [])

    useEffect(() => { getOfertas() })
    async function getOfertas() {
        const response = await api.get<Ioferta[]>('/oferta/ofertas')
        setOferta(response.data)
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
                                    <th>Porcentagem</th>
                                    <th>Quantidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Form.Control aria-label="Text input with dropdown button"
                                    onChange={(e) => searchItems(e.target.value)}
                                    placeholder="Buscar oferta" />
                                {searchInput.length > 1 ? (
                                    filteredResults.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item?.desconto}</td>
                                                <td>{item?.produtos.length}</td>
                                                <td className="tdbuttons">
                                                    <div className="buttons">
                                                        <Button variant="outline-success" onClick={() => navigate(`/admin/ofertas/visualizar/${item.id}`)}>Visualizar</Button>
                                                        <Button variant="outline-danger" onClick={() => deleteOferta(item.id)}>Deletar</Button>{' '}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })) : oferta && oferta.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item?.desconto}</td>
                                                <td>{item?.produtos.length}</td>
                                                <td className="tdbuttons">
                                                    <div className="buttons">
                                                        <Button variant="outline-success" onClick={() => navigate(`/admin/ofertas/visualizar/${item.id}`)}>Visualizar</Button>
                                                        <Button variant="outline-danger" onClick={() => deleteOferta(item.id)}>Deletar</Button>{' '}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                {/* <tr>
                                            <td></td>
                                            <td></td>
                                            <td className="tdbuttons">
                                                <div className="buttons">
                                                    <Button variant="outline-primary">Editar</Button>{' '}
                                                    <Button variant="outline-success">Visualizar</Button>
                                                    <Button variant="outline-danger">Deletar</Button>{' '}
                                                </div>
                                            </td>
                                        </tr> */}
                            </tbody>
                        </Table>
                    </div>
                </main>
            </S.Home>
        </section>
    )
}

export default Home;