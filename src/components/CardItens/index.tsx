import { DOMAttributes } from "react";
import * as S from "./styles"
interface ICard extends DOMAttributes<HTMLButtonElement> {
    width: number | string;
    height: number | string;
    backgroundUrl: string;
    direction1: string;
    direction2: string;
    name: string;
}
function CardIten({ name, width, height, backgroundUrl, direction1, direction2 }: ICard) {
    return (
        <>
            <S.Card width={width} height={height} >
                <S.Image backgroundUrl={backgroundUrl} direction1={direction1} direction2={direction2}>
                    <S.Content>
                       {/*  <h1>
                            {name}
                        </h1>
                        <h2>Pacote: NetFlex</h2>
                        <h2>Preço: NetFlex</h2>
                        <h2>Telas: 5 Telas</h2>
                        <h2>Nota: 4.6</h2>
                        <a>Veja Mais</a> */}
                    </S.Content>
                </S.Image>
            </S.Card>
        </>
    )
}
export default CardIten;