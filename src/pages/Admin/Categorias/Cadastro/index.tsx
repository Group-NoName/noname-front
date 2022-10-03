import { useState, useCallback } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import { api } from "../../../../service/api";
import * as S from './styles'

interface CadastroCategoria {
    nome: string
}

function cadastro() {
    const navigate = useNavigate()
    const [categorias, setCategoria] = useState<CadastroCategoria>()

    const cadastroCategoria = useCallback(
        async (data: CadastroCategoria) => {
            await api.post<CadastroCategoria>('/categoria/cadastro', {
                nome: data.nome,
            }).then(({ data }) => {
                console.log(data);
                alert("Categoria Cadastrada!")
                navigate("/admin/categorias")
            }).catch(error => {
                console.log(error);
                alert(error)
            });
        }, [])

    const onSubmit = useCallback(
        async (data: CadastroCategoria) => {
            cadastroCategoria(data)
        }, [],
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CadastroCategoria>({
        mode: 'onBlur',
    });

    return (
        <section>
            <Nav_Admin/>
            <S.Cadastro>
                <main>
                    <div className="Form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="nome">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    value={categorias?.nome}
                                    required
                                    placeholder="Categoria X"
                                    {...register('nome')}
                                />
                            </div>
                            <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                        </form>
                    </div>
                </main>
            </S.Cadastro>
        </section>
    )
}
export default cadastro;