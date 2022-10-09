import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import CardPacote from '../../components/CardPacote';
import Nav_ from '../../components/Nav';
import Ipacote from '../../interfaces/pacote';
import { api } from '../../service/api';
import * as S from './styles';

function Pacote() {
  const { id } = useParams();
  const [pacote, getPacote] = useState<Ipacote>();
  const placeholder = "https://almcharities.com/wp-content/uploads/2019/05/placeholder-circle.png";
  useEffect(() => { getPacotes() }, [id]);
  async function getPacotes() {
    const response = await api.get<Ipacote>(`/pacote/pacote/${id}`)
    getPacote(response.data)
  }

  return (
    <>
      
      <S.Container>
        <section>
          <header>
            <Nav_ />
          </header>
          <main>
            <div className='pacoteContent'>
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
                <h2>Pacotes Semelhantes</h2>
                <div className="cards">
                  <div className="card">
                    <CardPacote name={'Teste'} imageURL={`${placeholder}`} preco={''} pacoteID={`${id}`}/>
                  </div>
                </div>
              </div>
              <div className='produtosRelacionados'>
                <h2>Pacotes Relacionados</h2>
                <div className='posicao'>
                  <div>
                  <CardPacote name={'Teste'} imageURL={`${placeholder}`} preco={''} pacoteID={`${id}`}/>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        
      </S.Container>
    </>
  )
}
export default Pacote;