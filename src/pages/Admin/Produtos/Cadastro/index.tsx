import { useState, useCallback } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import SideBarAdm from "../../../../components/SideBarAdm";
import { api } from "../../../../service/api";
import * as S from './styles'

interface CadastroProduto {
    nome: string,
    descricao: string,
    preco: number,
    images: [
        { url: string },
        { url: string },
        { url: string },
    ]
}

function cadastro() {
    const navigate = useNavigate()
    const [produto, setProduto] = useState<CadastroProduto>()

    const cadastroProduto = useCallback(
        async (data: CadastroProduto) => {
            await api.post<CadastroProduto>('/produto/cadastro', {
                nome: data.nome,
                descricao: data.descricao,
                preco: data.preco,
                images: [
                    { url: data.images[0].url },
                    { url: data.images[1].url },
                    { url: data.images[2].url }
                ],
            }).then(({ data }) => {
                console.log(data);
                alert("Produto Cadastrado!")
                navigate("/admin/produtos")
            }).catch(error => {
                console.log(error);
                alert(error)
            });
        }, [])

    const onSubmit = useCallback(
        async (data: CadastroProduto) => {
            cadastroProduto(data)
        }, [],
    );

    const {
        register,
        handleSubmit,
    } = useForm<CadastroProduto>({
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
                                    value={produto?.nome}
                                    {...register('nome')}
                                />
                            </div>
                            <div className="descricao">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    {...register('descricao')}
                                    value={produto?.descricao}
                                />
                            </div>
                            <div className="position">
                                <div className="imgs">
                                    <div className="img1">
                                        <label htmlFor="url">Img1</label>
                                        <input
                                            type="text"
                                            {...register('images.0.url')}
                                        />
                                    </div>
                                    <div className="img2">
                                        <label htmlFor="url">Img2</label>
                                        <input
                                            type="text"
                                            {...register('images.1.url')}
                                        />
                                    </div>
                                    <div className="img3">
                                        <label htmlFor="url">Img3</label>
                                        <input
                                            type="text"
                                            {...register('images.2.url')}
                                        />
                                    </div>
                                </div>
                                <div className="preco">
                                    <label htmlFor="preco">Preço</label>
                                    <input
                                        type="number"
                                        {...register('preco')}
                                        value={produto?.preco}
                                    />
                                    <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </section>
        </S.Cadastro>
    )
}
export default cadastro;