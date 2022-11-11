import tags from "./tags"

interface Iproduto {
    id: string,
    nome: string,
    descricao: string
    /*     desconto: number,
        
        preco: number,
        images: image[],
        tags: tags[]   */
}
interface image {
    url: string
}

export default Iproduto