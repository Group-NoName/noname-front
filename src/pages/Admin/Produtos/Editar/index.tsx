import { Checkbox, Stack } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import Nav_Admin from "../../../../components/Nav_Admin";
import Iproduto from "../../../../interfaces/produto";
import tags from "../../../../interfaces/tags"
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
    ],
    tags: Array<{
        id: string[]
    }>

}

function editar() {
    const navigate = useNavigate()
    const [produto, setProduto] = useState<Iproduto>()
    const [tags, setTags] = useState<tags[]>([])
    const { id } = useParams()

    useEffect(() => { getProduto(), getTags() }, [id]);

    async function getProduto() {
        const response = await api.get<Iproduto>(`/produto/produtos/${id}`)
        setProduto(response.data)
    }

    async function getTags() {
        const response = await api.get<tags[]>('/tags/tags')
        setTags(response.data)
    }

    const editarProduto = useCallback(
        async (data: CadastroProduto) => {
            await api.put<CadastroProduto>(`/produto/atualizar/${id}`, {
                nome: data.nome,
                descricao: data.descricao,
                preco: data.preco,
                images: [
                    { url: data.images[0].url },
                    { url: data.images[1].url },
                    { url: data.images[2].url }
                ]
            }).then(({ data }) => {
                alert("Produto Editado!")
                navigate(`/admin/produtos/visualizar/${id}`)
            }).catch(error => {
                alert(error)
            });
        }, [])

    const adicionarTag = useCallback(
        async (data: CadastroProduto) => {
            await api.put<CadastroProduto>(`/produto/adicionar-tag/${id}`, {
                tags: data.tags[0].id.map(i => ({ id: i }))
            }).then(({ data }) => {
                navigate(`/admin/produtos/visualizar/${id}`)
                alert("Tag adicionada")
            }).catch(error => {
                alert(error)
            });
        }, []
    )

    const onSubmit = useCallback(
        async (data: CadastroProduto) => {
            editarProduto(data);
        }, []
    );
    const onSubmitTags = useCallback(
        async (data: CadastroProduto) => {
            adicionarTag(data);
        }, []
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
            <Nav_Admin />
            <S.Editar>
                <main>
                    <AiOutlineArrowLeft className="icon" onClick={() => navigate(-1)} />
                    <div className="Form">
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="nome">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    defaultValue={produto?.nome}
                                    required
                                    {...register('nome')}
                                />
                            </div>
                            <div className="descricao">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    {...register('descricao')}
                                    required
                                    defaultValue={produto?.descricao}
                                />
                            </div>
                            <div className="position">
                                <div className="imgs">
                                    <div className="img1">
                                        <label htmlFor="url">Img1</label>
                                        <input
                                            type="text"
                                            required
                                            defaultValue={produto?.images[0].url}
                                            {...register('images.0.url')}
                                        />
                                        <img src={produto?.images[0].url} alt="" />
                                    </div>
                                    <div className="img2">
                                        <label htmlFor="url">Img2</label>
                                        <input
                                            type="text"
                                            required
                                            defaultValue={produto?.images[1].url}
                                            {...register('images.1.url')}
                                        />
                                        <img src={produto?.images[1].url} alt="" />
                                    </div>
                                    <div className="img3">
                                        <label htmlFor="url">Img3</label>
                                        <input
                                            type="text"
                                            required
                                            defaultValue={produto?.images[2].url}
                                            {...register('images.2.url')}
                                        />
                                        <img src={produto?.images[2].url} alt="" />
                                    </div>
                                </div>
                                <div className="preco">
                                    <label htmlFor="preco">Preço</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        {...register('preco')}
                                        defaultValue={produto?.preco}
                                    />
                                    <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Editar'} type="submit" />
                                </div>
                            </div>
                        </form>
                    </div>           
                    <form className='formTags' onSubmit={handleSubmit(onSubmitTags)}>
                        {tags && tags.map(tags => {
                            return (
                                <label key={tags.id}>
                                    <input type="checkbox" value={tags.id} id={tags.id} {...register('tags.0.id')} />
                                    {tags.nome}
                                </label>
                            )
                        })}
                        <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Adicionar tags'} type="submit" />
                    </form>
                </main>
            </S.Editar >
        </section >
    )
}
export default editar;
