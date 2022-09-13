import { AxiosError } from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardIten from '../../components/CardItens';
import Nav_ from '../../components/Nav';
import Iproduto from '../../interfaces/produto';
import { api } from '../../service/api';
import * as S from './styles';

function Home() {

  const [produtos, setProduto] = useState<Iproduto[]>([])
  useEffect(() => { getAllProdutos() })
  async function getAllProdutos() {
    const response = await api.get<Iproduto[]>('/produto/produtos')
    setProduto(response.data)
  }

  const navigate = useNavigate();

  function viewProduto(id: string) {
    navigate(`produto/${id}`)
  }

  return (
    <>
      <Nav_/>
      <S.Container>

        {produtos && produtos.map(i => {
          return (
            <div>
              <a onClick={() => viewProduto(i.id)}>
                <CardIten imageURL={`${i.images[0].url}`} name={`${i.nome}`} produtoID={`${i.id}`} preco={i.preco} descricao={`Descrição: ${i.descricao}`} width={20} height={90}/>
              </a>
            </div>
          )
        })}
      </S.Container>
    </>
  );
}

export default Home;