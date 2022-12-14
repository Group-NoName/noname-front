import React from "react";
import Iproduto from "../interfaces/produto";

export default class ValidadorDesconto {
  validar(produto: Iproduto | undefined) {
    if (produto?.desconto == 0) {
      return (
        <h1
          style={{
            fontSize: "3em",
            width: "300px",
            height: "75px",
          }}
        >
          R$ {produto?.preco}
        </h1>
      );
    } else if (!(produto?.desconto == 0)) {
      return (
        <div>
          <p
            style={{
              width: "150px",
              fontSize: "2em",
            }}
          >
            De: R${produto?.preco}
          </p>
          <h1
            style={{
              width: "350px",
              fontWeight: "bold",
              fontSize: "2.5em",
              marginTop: "-0.8em"
            }}
          >
            Por: R${produto?.desconto.toFixed(2)}
          </h1>
        </div>
      );
    }
  }
}
