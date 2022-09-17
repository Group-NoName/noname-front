import { Select } from '@chakra-ui/react';
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
    const [produtos, getProdutos] = useState<Iproduto[]>([])
    const [categoria, setCategoria] = useState<ICategoria>()
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => { getProduto(), getCategoria() }, [id]);

    async function getCategoria() {
        const response = await api.get<ICategoria>(`/categoria/categorias/${id}`)
        setCategoria(response.data)
    }

    async function getProduto() {
        const response = await api.get<Iproduto[]>(`/produto/produtos`)
        getProdutos(response.data)
    }

    const atualizar = useCallback(
        async (data: IUpdateCategoria) => {
            await api.put<IUpdateCategoria>(`/categoria/atualizar/${id}`, {
                nome: data.nomeCategoria
            }).then(({ data }) => {
                console.log(data);
                navigate(`/admin/categorias`)
            }).catch(error => {
                console.log(error);
                alert(error)
            });
        }, []
    )
    const editarCategoria = useCallback(
        async (data: IUpdateCategoria) => {
            await api.put<IUpdateCategoria>(`/categoria/categorias-produtos/${id}`, {
                produtos: data.produtoId[0].id.map(i => ({ id: i }))
            }).then(({ data }) => {
                console.log(data);
                navigate(`/admin/categorias`)
            }).catch(error => {
                console.log(error);
                alert(error)
            });
        }, [])

    const onSubmit = useCallback(
        async (data: IUpdateCategoria) => {
            editarCategoria(data)
            atualizar(data)
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
        <section>
            <Nav_Admin />
            <S.Editar>
                <main>
                    <div className="contentMain">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="nome">
                                <label htmlFor="nomeCategoria">Nome</label>
                                <input
                                    type="text"
                                    defaultValue={categoria?.nome}
                                    {...register('nomeCategoria')}
                                />
                            </div>
                            <Form aria-label="Default select example">
                                {produtos && produtos.map((produto) => {
                                    return (
                                        <Form.Check
                                            key={produto.id}
                                            label={produto?.nome}
                                            value={produto.id}
                                            {...register('produtoId.0.id')} />
                                    )
                                })}
                            </Form>
                            <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Editar'} type="submit" />
                        </form>
                    </div>
                </main>
            </S.Editar>
        </section>
    )
}
export default editar;