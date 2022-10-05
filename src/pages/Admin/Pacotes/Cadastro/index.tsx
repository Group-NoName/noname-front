import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'
import Button from '../../../../components/Button';
import Nav_Admin from '../../../../components/Nav_Admin';
import * as S from './styles';
import { useState, useCallback, useEffect } from "react";
import Iproduto from "../../../../interfaces/produto";
import { api } from "../../../../service/api";
import { useForm } from 'react-hook-form';


interface CadastroPacote {
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

function cadastro() {
    const [pacote, setPacote] = useState<CadastroPacote>()
    const [produto, searchProduto] = useState([])
    const [produtos, setProduto] = useState<Iproduto[]>([])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState<Iproduto[]>([]);

    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        const filteredData = produto?.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }

    const cadastroPacotes = useCallback(
        async (data: CadastroPacote) => {
            await api.post<CadastroPacote>(`/pacote/cadastro`, {
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

    useEffect(() => { getProduto() });

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

    const onSubmit = useCallback(
        async (data: CadastroPacote) => {
            cadastroPacotes(data);
        }, []
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroPacote>({
        mode: 'onBlur',
    });

    return (
        <section>
            <Nav_Admin />
            <S.Cadastro>
                <main>
                    <div className="Form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="nome">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    placeholder="Pacote X"
                                    {...register('nome')}
                                />
                            </div>
                            <div className="descricao">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    {...register('descricao')}
                                    placeholder="Descrição que o pacote irá ter"
                                />
                            </div>
                            <div className="position">
                                <div className="imgs">
                                    <div className="img1">
                                        <label htmlFor="url">Img1</label>
                                        <input
                                            {...register('images.0.url')}
                                            type="text"
                                            placeholder="https://exemple.com/image1.jpg"
                                        />
                                    </div>
                                    <div className="img2">
                                        <label htmlFor="url">Img2</label>
                                        <input
                                            {...register('images.1.url')}
                                            type="text"
                                            placeholder="https://exemple.com/image2.jpg"
                                        />
                                    </div>
                                    <div className="img3">
                                        <label htmlFor="url">Img3</label>
                                        <input
                                            {...register('images.2.url')}
                                            type="text"
                                            placeholder="https://exemple.com/image3.jpg"
                                        />
                                    </div>
                                </div>
                                <div className="produtos">
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
                                </div>
                            </div>
                            <div className='preço'>
                                <label htmlFor="preco">Preço</label>
                                <input
                                    {...register('preco')}
                                    type="number"
                                    placeholder="R$ 00.00"
                                />
                                <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                            </div>
                        </form>
                    </div>
                </main>
            </S.Cadastro>
        </section>
    )
}
export default cadastro;