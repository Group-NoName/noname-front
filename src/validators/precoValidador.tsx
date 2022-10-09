import React from "react";
import Iproduto from "../interfaces/produto";

export default class PrecoValidador {
  validar(produto: Iproduto | undefined) {
    if (produto?.desconto === 0 || produto?.desconto === null) {
      return <p style={{ color: "gree", fontWeight: "bold" }}>Sem Desconto</p>;
    } else if (!(produto?.desconto == 0)) {
      return (
        <p style={{ color: "red", fontWeight: "bold" }}>
          R${produto?.desconto.toFixed(2)}
        </p>
      );
    }
  }
}
