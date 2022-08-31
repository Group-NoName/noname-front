import { ForwardRefRenderFunction } from "react";

import * as S from './styles'
interface IIpunt {
    fontSize: number;
    width: string | number;
    height: number | string;
    placeHolder: string;
    borderRadius: number;
    URLicon?: string;
    reapeatSetting?: string;
    direction?: string;
}

export const Input: ForwardRefRenderFunction<HTMLInputElement, IIpunt> = (
    { fontSize, height, width, placeHolder, borderRadius }
) => {
    return (
        <>
            <S.CustomInput
                fontSize={fontSize}
                width={width}
                height={height}
                placeHolder={placeHolder}
                borderRadius={borderRadius}>
            </S.CustomInput>
        </>
    )
}