import produto from "./produto"

interface Ipacote{
    id : string,
    nome: string,
    produtos: produto[],
}

export default Ipacote