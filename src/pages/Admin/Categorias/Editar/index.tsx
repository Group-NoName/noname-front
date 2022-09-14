import { Select } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/Button';
import SideBarAdm from '../../../../components/SideBarAdm';
import ICategoria from '../../../../interfaces/categoria';
import Iproduto from '../../../../interfaces/produto';
import { api } from '../../../../service/api';
import * as S from './styles'

interface IUpdateCategoria {
    produtoid: string
    nomeCategoria: string
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

    const editarCategoria = useCallback(
        async (data: IUpdateCategoria) => {
            await api.put<IUpdateCategoria>(`/categoria/categorias-produtos/${id}`, {
                nome: data.nomeCategoria,
                produtos: [{ id: data.produtoid }]
            }).then(({ data }) => {
                console.log(data);
                alert("Produto Editado!")
                navigate(`/admin/categorias`)
            }).catch(error => {
                console.log(error);
                alert(error)
            });
        }, [])

    const onSubmit = useCallback(
        async (data: IUpdateCategoria) => {
            editarCategoria(data)
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
        <S.Editar>
            <main>
                <SideBarAdm />
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
                        <Select
                            {...register('produtoid')}                        >
                            {produtos && produtos.map((produto) => {
                                return (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </option>
                                )
                            })}
                        </Select>
                        <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                    </form>
                </div>
            </main>

        </S.Editar>
    )
}
export default editar;