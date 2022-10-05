import { AiOutlineArrowLeft } from 'react-icons/ai';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'
import Button from '../../../../components/Button';
import Nav_Admin from '../../../../components/Nav_Admin';
import * as S from './styles';
import { useState, useCallback, useEffect } from "react";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Ipacote from '../../../../interfaces/pacote';

interface AtualizarPacote {
    nome: string,
    descricao: string,
    preco: number,
    images: [
        { url: string },
        { url: string },
        { url: string },
    ]
    produtos: Array<{
        id: string[]
    }>
}

function editar() {
    const navigate = useNavigate()
    const [pacote, setPacote] = useState<AtualizarPacote>()
    const [pacoteget, getPacote] = useState<Ipacote>()
    const [produto, searchProduto] = useState([])
    const [produtos, setProduto] = useState<Iproduto[]>([])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);

    const { id } = useParams()
    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        const filteredData = produto?.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }

    const cadastroPacotes = useCallback(
        async (data: AtualizarPacote) => {
            await api.put<AtualizarPacote>(`/pacote/atualizar/${id}`, {
                nome: data.nome,
                descricao: data.descricao,
                preco: data.preco,
                images: [
                    { url: data.images[0].url },
                    { url: data.images[1].url },
                    { url: data.images[2].url }
                ],
                produtos: data.produtos[0].id.map(i => ({ id: i }))
            }).then(({ data }) => {
                alert("pacote cadastrado")
            }).catch(error => {
                alert(error)
            });
        }, [])

    useEffect(() => { getProduto(), getPacotes() });

    useEffect(() => {
        api.get(`/produto/produtos`)
            .then((response) => {
                searchProduto(response.data);
            })
    }, [])

    async function getProduto() {
        const response = await api.get<Iproduto[]>(`/produto/produtos`)
        setProduto(response.data)
    }

    async function getPacotes() {
        const response = await api.get<Ipacote>(`/pacote/pacote/${id}`)
        getPacote(response.data)
    }

    const onSubmit = useCallback(
        async (data: AtualizarPacote) => {
            cadastroPacotes(data);
        }, []
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AtualizarPacote>({
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
                                    defaultValue={pacoteget?.nome}
                                    required
                                    {...register('nome')}
                                />
                            </div>
                            <div className="descricao">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    {...register('descricao')}
                                    required
                                    defaultValue={pacoteget?.descricao}
                                />
                            </div>
                            <div className="position">
                                <div className="imgs">
                                    <div className="img1">
                                        <label htmlFor="url">Img1</label>
                                        <input
                                            type="text"
                                            required
                                            defaultValue={pacoteget?.images[0]?.url}
                                            {...register('images.0.url')}
                                        />
                                        {/*                                         <img src={produto?.images[0].url} alt="" /> */}
                                    </div>
                                    <div className="img2">
                                        <label htmlFor="url">Img2</label>
                                        <input
                                            type="text"
                                            required
                                            defaultValue={pacoteget?.images[1]?.url}
                                            {...register('images.1.url')}
                                        />
                                        {/* <img src={produto?.images[1].url} alt="" /> */}
                                    </div>
                                    <div className="img3">
                                        <label htmlFor="url">Img3</label>
                                        <input
                                            type="text"
                                            required
                                            defaultValue={pacoteget?.images[2]?.url}
                                            {...register('images.2.url')}
                                        />
                                        {/* <img src={produto?.images[2].url} alt="" /> */}
                                    </div>
                                </div>
                                <div className="preco">
                                    <label htmlFor="preco">Preço</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        {...register('preco')}
                                        defaultValue={pacoteget?.preco}
                                    />
                                </div>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-custom-components">
                                    <>
                                        Adicionar produtos
                                    </>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Form.Control aria-label="Text input with dropdown button"
                                        onChange={(e) => searchItems(e.target.value)}
                                        placeholder="Nome do produto..." />
                                    {searchInput.length > 1 ? (
                                        filteredResults.map((item) => {
                                            return (
                                                <Dropdown.ItemText key={item.id}>
                                                    <Form.Check
                                                        key={item.id}
                                                        label={item?.nome}
                                                        value={item.id}
                                                        {...register('produtos.0.id')} />
                                                </Dropdown.ItemText>
                                            )
                                        })
                                    ) : produtos && produtos.map(prod => {
                                        return (
                                            <Dropdown.ItemText key={prod.id}>
                                                <Form.Check
                                                    key={prod.id}
                                                    label={prod?.nome}
                                                    value={prod.id}
                                                    {...register('produtos.0.id')} />
                                            </Dropdown.ItemText>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Editar'} type="submit" />
                        </form>
                    </div>
                </main>
            </S.Editar >
        </section >
    )
}
export default editar;