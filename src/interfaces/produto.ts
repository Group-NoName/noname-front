interface Iproduto {
    id : string,
    nome: string,
    descricao: string,
    preco: number,
    image: image[]  
}
interface image {
    name: string
}

export default Iproduto