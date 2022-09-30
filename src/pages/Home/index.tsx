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


function Home() {

  useEffect(() => { getAllCategoria() })

  const [categorias, setCategoria] = useState<ICategoria[]>([])

  async function getAllCategoria() {
    const response = await api.get<ICategoria[]>('/categoria/categorias')
    setCategoria(response.data)
  }

  const navigate = useNavigate();

  function viewProduto(id: string) {
    navigate(`produto/${id}`)
  }

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
                        return (
                          <div className="disposicaoItem">
                            <CardProds imageURL={`${i.images[0].url}`} name={`${i.nome}`} produtoID={`${i.id}`} preco={i.preco} />
                          </div>
                        )
                      })}
                  </div>
                </div>
              </>
            )
          }
        })}
      </S.Container>
    </>
  );
}

export default Home;