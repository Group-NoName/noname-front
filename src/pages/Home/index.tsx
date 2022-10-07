import { AxiosError } from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardProds from '../../components/CardProds';
import Nav_ from '../../components/Nav';
import Iproduto from '../../interfaces/produto';
import { api } from '../../service/api';
import * as S from './styles';
import Carousel from 'react-bootstrap/Carousel';
import ICategoria from '../../interfaces/categoria';
import CardPacote from '../../components/CardPacote';
import Ipacote from '../../interfaces/pacote';


function Home() {

  useEffect(() => { getAllCategoria(), getAllPacote() })

  const [categorias, setCategoria] = useState<ICategoria[]>([])
  const [pacotes, setpacote] = useState<Ipacote[]>([])

  async function getAllCategoria() {
    const response = await api.get<ICategoria[]>('/categoria/categorias')
    setCategoria(response.data)
  }

  async function getAllPacote() {
    const response = await api.get<Ipacote[]>('/pacote/pacotes')
    setpacote(response.data)
  }

  const navigate = useNavigate();

  return (
    <>
      <Nav_ />
      <S.Container>
        {categorias && categorias.map(itemCategoria => {
          if (itemCategoria.produtos.length > 0) {
            return (
              <>
                <div className='listCategorias'>

                  <h1>{itemCategoria.nome}</h1>
                  <div className='produtosmap'>
                      {itemCategoria.produtos.map(i => {
                        if (i.desconto == 0)
                        {return (
                          <div className="disposicaoItem">
                            <CardProds imageURL={`${i.images[0].url}`} name={`${i.nome}`} produtoID={`${i.id}`} preco={i.preco} />
                          </div>
                        )}
                        else {
                          return (
                            <div className="disposicaoItem">
                              <CardProds imageURL={`${i.images[0].url}`} name={`${i.nome}`} produtoID={`${i.id}`} preco={String(i.desconto.toFixed(2))} />
                            </div>
                          )
                        }
                      })}
                  </div>
                </div>
              </>
            )
          }
        })}
        {/* DEIXAR OS CARDS DO PACOTE DO LADO DIREITO DAS CATEGORIAS */}
        <div className='listpacotes'>
          {pacotes && pacotes.map(i => {
            return (
              <CardPacote imageURL={`${i.images[0].url}`} name={`${i.nome}`} pacoteID={`${i.id}`} preco={i.preco} />
            )
          })}
        </div>
      </S.Container>
    </>
  );
}

export default Home;