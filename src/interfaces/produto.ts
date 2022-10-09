import tags from "./tags"

interface Iproduto {
    id : string,
    desconto: number,
    nome: string,
    descricao: string,
    preco: number,
    images: image[],
    tags: tags[]  
}
interface image {
    url: string
}

export default Iproduto