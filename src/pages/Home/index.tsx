import { AxiosError } from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  function viewProduto(id:string){
    navigate(`produto/${id}`)
}
  
    return (
      <>
      <Navbar/>
      <S.Container>
        
        {produtos.map(i => {
          return(
            <div>
              <a href="">
                <CardIten onClick={() => viewProduto(i.id) } imageURL={`${i.imageURL}`} name={`${i.nome}`} produtoID={`${i.id}`} preco={i.preco} descricao={i.descricao} 
              /></a>         
            </div>
          )  
        })}
      </S.Container>  
      </>
    );
  }
  
  export default Home;