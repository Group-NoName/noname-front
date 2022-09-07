import { AxiosError } from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardIten from '../../components/CardItens';
import Navbar from '../../components/Navbar';
import Iproduto from '../../interfaces/produto';
import { api } from '../../service/api';
import * as S from './styles';

function Produto() {

  const { id } = useParams();

  const [produto, setProduto] = useState<Iproduto>()

  useEffect(() => { getProduto() }, [id]);

  async function getProduto() {
    const response = await api.get<Iproduto>(`/produto/produtos/${id}`)
    setProduto(response.data)
  }

  return (
    <>
      <Navbar />
      <S.Container>
        {produto?.id}
      </S.Container>
    </>
  )
}

export default Produto;