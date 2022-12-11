import oferta from "./oferta"
import Ipacote from "./pacote";

interface Ipromocao{
    id : string,
    nome : string,
    ofertasObrigatorias : [{
        id: string;
        nome: string;
        preco: number;
        pacote: Ipacote[]
    }],
    ofertasOpcionais : [{
        id: string;
        nome: string;
        preco: number;
        pacote: Ipacote[]
    }]
}

export default Ipromocao