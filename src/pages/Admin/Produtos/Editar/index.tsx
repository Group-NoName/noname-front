import { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import SideBarAdm from "../../../../components/SideBarAdm";
import Iproduto from "../../../../interfaces/produto";
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

function editar() {
    const navigate = useNavigate()
    const [produto, setProduto] = useState<Iproduto>()
    const { id } = useParams()

    useEffect(() => { getProduto() }, [id]);

    async function getProduto() {
        const response = await api.get<Iproduto>(`/produto/produtos/${id}`)
        setProduto(response.data)
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
                ],
            }).then(({ data }) => {
                console.log(data);
                alert("Produto Editado!")
                navigate(`/admin/produtos/visualizar/${id}`)
            }).catch(error => {
                console.log(error);
                alert(error)
            });
        }, [])

    const onSubmit = useCallback(
        async (data: CadastroProduto) => {
            editarProduto(data)
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
        <S.Editar>
            <section>
                <main>
                    <SideBarAdm />
                    <AiOutlineArrowLeft className="icon" onClick={() => navigate(-1)} />
                    <div className="Form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="nome">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    placeholder={produto?.nome}
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
                                        required
                                        {...register('preco')}
                                        defaultValue={produto?.preco}
                                    />
                                    <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </section>
        </S.Editar>
    )
}
export default editar;
