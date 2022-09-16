import * as S from './styles'
import { useState, useEffect, useCallback } from 'react';
import Nav_Admin from '../../../../components/Nav_Admin';
import Iproduto from '../../../../interfaces/produto';
import Categoria from '../../../../interfaces/categoria'
import { api } from '../../../../service/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function visualizar() {
    const [categoria, setCategoria] = useState<Categoria>()
    const [categoriasProdutos, setCategoriaProdutos] = useState<Categoria[]>([])
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => { getCategorias(), getCategoriasProdutos() }, [id]);
    async function getCategorias() {
        const response = await api.get<Categoria>(`/categoria/categorias/${id}`)
        setCategoria(response.data)
    }
    /*categoria/categorias-produtos/idCat/idProd */
    async function getCategoriasProdutos() {
        const response = await api.get<Categoria[]>(`categoria/categorias/${id}/produtos`)
        setCategoriaProdutos(response.data)
    }
    const deletarRelacao = useCallback(
        async (idCat: string, idProd: string) => {
            await api.delete(`categoria/categorias-produtos/${idCat}/${idProd}`)
            navigate(0)
        }, []
    )

    return (
        <main>
            <Nav_Admin />
            <S.Visualizar>
                <h1>{categoria?.nome}</h1>
                <h1>{categoria?.id}</h1>
                <h3>Produtos relacionados</h3>
                {categoriasProdutos && categoriasProdutos.map(item => {
                    return (
                        <>
                            <p>{item.nome}</p>
                            <Button onClick={() => deletarRelacao(String(categoria?.id), String(item.id))}>Deletar</Button>
                            <Link to={`/admin/produtos/visualizar/${item.id}`}>Visualizar</Link>
                        </>
                    )
                })}
            </S.Visualizar>
        </main>
    )
}
export default visualizar;