import { AxiosError } from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardProds from '../../components/CardProds';
import Nav_ from '../../components/Nav';
import Iproduto from '../../interfaces/produto';
import { api } from '../../service/api';
import * as S from './styles';

function Produtos() {

    const [produtos, setProduto] = useState<Iproduto[]>([])

    useEffect(() => { getAllProdutos() })

    async function getAllProdutos() {
        const response = await api.get<Iproduto[]>('/produto/produtos')
        setProduto(response.data)
    }

    const navigate = useNavigate();

    return (
        <>
            <S.Container>
                <section>
                    <header>
                        <Nav_ />
                    </header>
                    <main>
                        <div className="produtos">
                            <h1>Produtos</h1>
                            <div className="produtosmap">
                                {produtos && produtos.map(i => {
                                    if (i.desconto == 0) {
                                        return (
                                            <CardProds imageURL={`${i.images[0].url}`} name={`${i.nome}`} produtoID={`${i.id}`} preco={i.preco} />
                                        )
                                    }
                                    else {
                                        return (
                                            <CardProds imageURL={`${i.images[0].url}`} name={`${i.nome}`} produtoID={`${i.id}`} preco={String(i.desconto.toFixed(2))} />
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </main>
                </section>
            </S.Container>
        </>
    )
}

export default Produtos;