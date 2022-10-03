import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import CardProds from '../../components/CardProds';
import Nav_ from '../../components/Nav';
import Ipacote from '../../interfaces/pacote';
import { api } from '../../service/api';
import * as S from './styles';

function Pacote() {
  const { id } = useParams();
  const [pacote, getPacote] = useState<Ipacote>();
  useEffect(() => { getPacotes() }, [id]);
  async function getPacotes() {
    const response = await api.get<Ipacote>(`/pacote/pacote/${id}`)
    getPacote(response.data)
  }
  return (
    <>
      <Nav_ />
      <S.Container>
        <div className='pacoteContent'>
          <div className='imgLateral'>
            {pacote?.images.map((i) => {
              return (
                <>
                  <div className="imgsLateral">
                    <div className="imgs">
                      <img className='tamanho' src={`${i.url}`} alt="" />
                    </div>
                  </div>
                </>)
            })}
          </div>
          <div className='imgCentral'>
            <div className="posicao">
              <img className='tamanho' src={pacote?.images[0].url} alt="" />
            </div>
          </div>
          <div className='pacoteInformation'>
            <div className='pacoteDescricao'>
              <div className="nome">
                <h1>{pacote?.nome}</h1>
              </div>
              <div className="desc">
                <p>{pacote?.descricao}</p>
                <h3>Itens inclusos</h3>
                {pacote?.produtos.map(itens => {
                  return (
                    <a href="">{itens.nome}<br /></a>
                  )
                })}
              </div>
              <div className='pacotePrice'>
                <div className='price'>
                  <h2>R$ {pacote?.preco}</h2>
                </div>
                <div className='pacotepricebuttom'>
                  <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Comprar'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pacotesLists'>
          <div className='produtosSemelhantes'>
            <h2>Produtos Semelhantes</h2>
            <div className="cards">
              <div className="card">
                <CardProds name={''} imageURL={''} produtoID={''} preco={0} />
              </div>
            </div>
          </div>
          <div className='produtosRelacionados'>
            <h2>Produtos Relacionados</h2>
            <div className='posicao'>
              <div>
                <CardProds name={''} imageURL={''} produtoID={''} preco={0} />
              </div>
            </div>
          </div>
        </div>
      </S.Container>
    </>
  )
}
export default Pacote;