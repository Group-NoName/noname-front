import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';
import SideBarAdm from '../../../../components/SideBarAdm'
import { api } from '../../../../service/api';
import * as S from './styles'

interface CadastroTags {
    nome: string
}
function cadastroTag() {
    /* tags/inserir */
    const [tag, setTag] = useState<CadastroTags>()
    const navigate = useNavigate();

    const cadastroTag = useCallback(
        async (data: CadastroTags) => {
            await api.post<CadastroTags>('/tags/inserir', {
                nome: data.nome,
            }).then(({ data }) => {
                console.log(data);
                alert("Tag Cadastrada!")
                navigate("/admin/tags")
            }).catch(error => {
                console.log(error);
                alert(error)
            });
        }, [])

    const onSubmit = useCallback(
        async (data: CadastroTags) => {
            cadastroTag(data)
        }, [],
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CadastroTags>({
        mode: 'onBlur',
    });

    return (
        <S.Cadastro>
            <section>
                <main>
                    <SideBarAdm />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            value={tag?.nome}
                            required
                            placeholder="Tag X"
                            {...register('nome')}
                        />
                        <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                    </form>
                </main>
            </section>
        </S.Cadastro>
    )
}
export default cadastroTag