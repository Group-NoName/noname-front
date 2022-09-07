import { AxiosError } from 'axios';
import { useCallback, useState, useEffect } from 'react';
import CardIten from '../../components/CardItens';
import Navbar from '../../components/Navbar';
import Iproduto from '../../interfaces/produto';
import { api } from '../../service/api';
import * as S from './styles';

function Produto() {

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
            </div>
          )  
        })}
      </S.Container>
        </>
    )
  }
  
  export default Produto;