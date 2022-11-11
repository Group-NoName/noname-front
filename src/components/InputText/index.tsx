import { ForwardRefRenderFunction } from "react";

import * as S from './styles'
interface IInput {
    fontSize: number;
    width: string | number;
    height: number | string;
    placeHolder: string;
    reapeatSetting?: string;
    direction?: string;
    type: "textarea";
}

export const Inputtext: ForwardRefRenderFunction<HTMLTextAreaElement, IInput> = (
    { fontSize, height, width, placeHolder, type }
) => {
    return (
        <>
            <S.CustomInput
                fontSize={fontSize}
                width={width}
                height={height}
                placeHolder={placeHolder}
                type={type}
                >
            </S.CustomInput>
        </>
    )
}