interface Iproduto {
    id : string,
    nome: string,
    descricao: string,
    preco: number,
    images: image[]  
}
interface image {
    url: string
}

export default Iproduto