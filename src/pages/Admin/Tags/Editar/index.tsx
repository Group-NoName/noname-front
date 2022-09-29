import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/Button';
import ITags from '../../../../interfaces/tags';
import { api } from '../../../../service/api';
import Nav_Admin from '../../../../components/Nav_Admin'
import * as S from './styles'

interface editarTag {
    nome: string
}

function editarTag() {
    const [tag, setTag] = useState<ITags>()
    const { id } = useParams()
    useEffect(() => { getTag() }, [id]);
    async function getTag() {
        const response = await api.get<ITags>(`tag/tags/${id}`)
        setTag(response.data)
    }
    const navigate = useNavigate()
    const editarTag = useCallback(
        async (data: editarTag) => {
            await api.put<editarTag>(`/tag/atualizar/${id}`, {
                nome: data.nome,
            }).then(({ data }) => {
                alert("Tag Editada!")
                navigate(`/admin/tags`)
            }).catch(error => {
                alert(error)
            });
        }, [])

    const onSubmit = useCallback(
        async (data: editarTag) => {
            editarTag(data)

        }, [],
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<editarTag>({
        mode: 'onBlur',
    });
    return (
        <section>
            <Nav_Admin />
            <S.Editar>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="nome">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            defaultValue={tag?.nome}
                            {...register('nome')}
                        />
                    </div>
                    <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Editar'} type="submit" />
                </form>
            </S.Editar >
        </section>
    )
}
export default editarTag