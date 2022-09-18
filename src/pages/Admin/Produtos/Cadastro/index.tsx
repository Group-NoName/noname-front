import { useState, useCallback } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
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
                alert("Produto Cadastrado!")
                navigate("/admin/produtos")
            }).catch(error => {
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
        formState: { errors }
    } = useForm<CadastroProduto>({
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
                                    value={produto?.nome}
                                    required
                                    placeholder="Produto X"
                                    {...register('nome')}
                                />
                            </div>
                            <div className="descricao">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    {...register('descricao')}
                                    placeholder="Descrição que o produto irá ter"
                                    required
                                    value={produto?.descricao}
                                />
                            </div>
                            <div className="position">
                                <div className="imgs">
                                    <div className="img1">
                                        <label htmlFor="url">Img1</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="https://exemple.com/image1.jpg"
                                            {...register('images.0.url')}
                                        />
                                    </div>
                                    <div className="img2">
                                        <label htmlFor="url">Img2</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="https://exemple.com/image2.jpg"
                                            {...register('images.1.url')}
                                        />
                                    </div>
                                    <div className="img3">
                                        <label htmlFor="url">Img3</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="https://exemple.com/image3.jpg"
                                            {...register('images.2.url')}
                                        />
                                    </div>
                                </div>
                                <div className="preco">
                                    <label htmlFor="preco">Preço</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        {...register('preco')}
                                        placeholder="R$ 00.00"
                                        value={produto?.preco}
                                    />
                                    <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </S.Cadastro>
        </section>
    )
}
export default cadastro;