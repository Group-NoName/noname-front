import Iproduto from './produto'
interface ICategoria{
    id: string,
    nome: string,
    produtos: Iproduto[]
}
export default ICategoria