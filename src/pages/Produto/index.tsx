import { AxiosError } from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
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

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <S.Container>
        <h1>teste</h1>
              <div className='produtoContent'>
                <div className='imgLateral'>
                  {produto?.image.map(i => {
                    return(<></>)})}
                    <h1>teste</h1>
                </div>
                <div className='imgCentral'>
                  {produto?.image[0].name}
                </div>
                <div className='produtoInformation'>
                  <div className='produtoDescricao'>
                    {produto?.descricao}
                  </div>
                  <div className='produtoPrice'>
                    <div className='price'></div>
                    <div className='produtopricebuttom'>
                      <Button color={''} width={''} height={''} fontSize={''} backgroundColor={''} text={''}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='produtosLists'>
                <div className='produtosAdicionais'>
                </div>
                <div className='produtosRelacionados'>
                </div>
              </div>
      </S.Container>
    </>
  )
}

export default Produto;