import { DOMAttributes } from "react";
import * as S from "./styles"
import { useNavigate } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons'
import Button from "../Button";

interface ICard extends DOMAttributes<HTMLButtonElement> {
    name: string;
    imageURL: string;
    produtoID: string;
    preco: number;
    descricao: string;
}
function CardIten({ name, imageURL, produtoID, preco, descricao}: ICard) {

    const navigate = useNavigate();

    return (
        <>
            <S.Card >
                <S.Image>
                    <img src={imageURL} alt="" className="image"/>  
                </S.Image>
                <S.Content>
                        <h1>
                            {name}
                        </h1>
                        <h2>
                            R${preco}
                        </h2><br/>
                        <span>
                            Descrição:
                            <p>{descricao}</p>
                        </span><br/>
                        <div className="btn">
                            <Button color={"#ffff"} width={"5"} height={"2"} fontSize={"18"} backgroundColor={"#ff0000"} text={"Veja mais"}>
                                Veja mais
                            </Button> 
                        </div>
                        
                    </S.Content>
            </S.Card>
        </>
    )
}
export default CardIten;