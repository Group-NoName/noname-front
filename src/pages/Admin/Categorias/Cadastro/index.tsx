import { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import SideBarAdm from "../../../../components/SideBarAdm";
import ICategoria from "../../../../interfaces/categoria";
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
            await api.post<CadastroCategoria>('/categoria/categorias', {
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
        <S.Cadastro>
            <section>
                <main>
                    <SideBarAdm />
                    <div className="Form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="nome">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    value={categorias?.nome}
                                    required
                                    placeholder="Produto X"
                                    {...register('nome')}
                                />
                            </div>
                            <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                        </form>
                    </div>
                </main>
            </section>
        </S.Cadastro>
    )
}
export default cadastro;