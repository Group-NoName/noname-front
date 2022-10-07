import React from "react";
import Iproduto from "../interfaces/produto";

export default class ValidadorDesconto {
    validar(produto: Iproduto | undefined) {
        if (produto?.desconto == 0) {
            return (
                <h1>R$ {produto?.preco}</h1>
            )
        } else if (!(produto?.desconto == 0)) {
            return (
                <>
                    <p>De: R${produto?.preco}</p>
                    <h1>Por: R${produto?.desconto.toFixed(2)}</h1>
                </>
            )
        }
    }
};