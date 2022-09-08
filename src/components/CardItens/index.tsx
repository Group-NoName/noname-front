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
    descricao?: string;
    width: number;
    height: number;
}
function CardIten({ name, imageURL, produtoID, preco, descricao, width, height}: ICard) {

    const navigate = useNavigate();

    return (
        <>
            <S.Card width={width} height={height}>
                <S.Image>
                    <img src={imageURL} alt="" className="image"/>  
                </S.Image>
                <S.Content>
                        <h2>
                            {name}
                        </h2>
                        <h3>
                            R${preco}
                        </h3><br/>
                        <span>
                            <p>{descricao}</p>
                        </span><br/>
                        <div className="btn">
                            <Button color={"#ffff"} width={"5"} height={"2"} fontSize={"18"} backgroundColor={"#ff0000"} text={"Veja mais"}>
                            </Button> 
                        </div>
                        
                    </S.Content>
            </S.Card>
        </>
    )
}
export default CardIten;