import { AxiosError } from 'axios';
import { useCallback, useState, useEffect } from 'react';
import CardIten from '../../components/CardItens';
import Navbar from '../../components/Navbar';
import Iproduto from '../../interfaces/produto';
import { api } from '../../service/api';
import * as S from './styles';

function Home() {

  const [produtos, setProduto] = useState<Iproduto[]>([])
  useEffect (() => {getAllProdutos()})
  async function getAllProdutos() {
    const response = await api.get<Iproduto[]> ('/produto/produtos')
    setProduto(response.data)
  }
  
    return (
      <>
      <Navbar/>
      <S.Container>
        
        {produtos.map(i => {
          return(
            <div>
              <CardIten imageURL={`${i.imageURL}`} name={`${i.nome}`} produtoID={`${i.id}`} preco={i.preco} descricao={i.descricao} />
            </div>
          )  
        })}
      </S.Container>  
      </>
    );
  }
  
  export default Home;