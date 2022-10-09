import produto from "./produto"

interface Ipacote{
    id : string,
    nome: string,
    descricao: string,
    preco: number,
    images: image[],
    produtos: produto[],
}

interface image {
  url: string
}

export default Ipacote