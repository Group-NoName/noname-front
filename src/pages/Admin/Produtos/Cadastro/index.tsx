import { Button } from "@chakra-ui/button";
import { useState, useCallback } from "react";
import { useForm } from 'react-hook-form';
import { api } from "../../../../service/api";

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
            }).catch(error => {
                console.log(error);
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        value={produto?.nome}
                        {...register('nome')}
                    />
                </div>
                <div className="field">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        {...register('descricao')}
                        value={produto?.descricao}
                    />
                </div>
                <div className="field">
                    <label htmlFor="preco">Preço</label>
                    <input
                        type="number"
                        {...register('preco')}
                        value={produto?.preco}
                    />
                </div>
                <div>
                    <label htmlFor="url">Img1</label>
                    <input
                        type="text"
                        {...register('images.0.url')}
                    />
                </div>
                <div>
                    <label htmlFor="url">Img2</label>
                    <input
                        type="text"
                        {...register('images.1.url')}
                    />
                </div>
                <div>
                    <label htmlFor="url">Img3</label>
                    <input
                        type="text"
                        {...register('images.2.url')}
                    />
                </div>
                <Button type="submit">Cadastrar</Button>
            </form>
        </div>
    )
}
export default cadastro;