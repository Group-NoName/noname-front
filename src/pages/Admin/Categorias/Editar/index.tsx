import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from '../../../../components/Button';
import Nav_Admin from '../../../../components/Nav_Admin';
import ICategoria from '../../../../interfaces/categoria';
import Iproduto from '../../../../interfaces/produto';
import { api } from '../../../../service/api';
import * as S from './styles'

interface IUpdateCategoria {
    nomeCategoria: string,
    produtoId: Array<{
        id: string[]
    }>
}

function editar() {

    const [categoria, setCategoria] = useState<ICategoria>()
    const [produtos, getProdutos] = useState<Iproduto[]>([])
    const [produto, searchProduto] = useState<Iproduto[]>([])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);

    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => { getProduto(), getCategoria() }, [id]);

    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        const filteredData = produto?.filter((item) => {
            return Object.values(item.nome).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }

    async function getCategoria() {
        const response = await api.get<ICategoria>(`/categoria/categorias/${id}`)
        setCategoria(response.data)
    }

    async function getProduto() {
        const response = await api.get<Iproduto[]>(`/produto/produtos`)
        getProdutos(response.data)
    }

    useEffect(() => {
        api.get(`/produto/produtos`)
            .then((response) => {
                searchProduto(response.data);
            })
    }, [])

    const atualizarNomeCategoria = useCallback(
        async (data: IUpdateCategoria) => {
            await api.put<IUpdateCategoria>(`/categoria/atualizar/${id}`, {
                nome: data.nomeCategoria,
            }).then(({ data }) => {
                alert("Categoria Editada!")
                navigate(`/admin/categorias/visualizar/${id}`)
            }).catch(error => {
                alert(error)
            });
        }, []
    )

    const onSubmit = useCallback(
        async (data: IUpdateCategoria) => {
            atualizarNomeCategoria(data)
        }, []
    )

    const adicionarCategoriaProduto = useCallback(
        async (data: IUpdateCategoria) => {
            await api.put<IUpdateCategoria>(`/categoria/categorias-produtos/${id}`, {
                produtos: `${data.produtoId[0].id.forEach(i => ({ id: i }))}`
            }).then(({ data }) => {
                alert("Produtos adicionados!")
                navigate(`/admin/categorias/visualizar/${id}`)
            }).catch(error => {
                alert(error)
            });
        }, [])

    const onSubmitProduto = useCallback(
        async (data: IUpdateCategoria) => {
            adicionarCategoriaProduto(data)
        }, [],
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IUpdateCategoria>({
        mode: 'onBlur',
    });

    return (
        <section style={{ overflowY: 'hidden', height: "100vh" }}>
            <Nav_Admin />
            <S.Editar>
                <main>
                    <div className="contentMain">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="nome">
                                <label htmlFor="nomeCategoria">Nome da Categoria</label>
                                <input
                                    type="text"
                                    defaultValue={categoria?.nome}
                                    {...register('nomeCategoria')}
                                />
                            </div>
                            <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Editar'} type="submit" />
                        </form>
                    </div>
                    <div className="contentProd">
                        <form onSubmit={handleSubmit(onSubmitProduto)}>
                            <Form.Control aria-label="Text input with dropdown button"
                                onChange={(e) => searchItems(e.target.value)}
                                placeholder="Buscar Produto" />
                            <div className="produtosSearch">
                                <Form aria-label="Default select">
                                    {searchInput.length > 1 ? (
                                        filteredResults.map((item) => {
                                            if (categoria?.produtos) {
                                                return (
                                                    <Form.Check
                                                        key={item.id}
                                                        label={item?.nome}
                                                        value={item.id}
                                                        type="switch"
                                                        {...register('produtoId.0.id')} />
                                                )
                                            }
                                        })
                                    ) : produtos && produtos.map((produto) => {
                                        return (
                                            <Form.Check
                                                key={produto.id}
                                                label={produto?.nome}
                                                value={produto.id}
                                                type="switch"
                                                {...register('produtoId.0.id')} />
                                        )
                                    })}
                                </Form>
                            </div>
                            <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Adicionar Produto'} type="submit" />
                        </form>
                    </div>
                </main>
            </S.Editar>
        </section>
    )
}
export default editar;