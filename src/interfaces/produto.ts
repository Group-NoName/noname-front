import tags from "./tags"

interface Iproduto {
    id: string,
    nome: string,
    /*     desconto: number,
        descricao: string,
        preco: number,
        images: image[],
        tags: tags[]   */
}
interface image {
    url: string
}

export default Iproduto