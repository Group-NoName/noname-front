import React from "react";
import { useState, useEffect } from "react";

export default class useStateView {
  validacao(tipo: string | number, mensagem: string) {
    if (tipo === "error") {
      return (
        <p id="timer" style={{ color: "red" }}>
          {mensagem}
        </p>
      );
    } else if (tipo === "sucesso") {
      return (
        <p id="timer" style={{ color: "blue" }}>
          {mensagem}
        </p>
      );
    } else if (tipo >= 0) {
      return (
        <p id="timer" style={{ color: "blue" }}>
          {mensagem}
        </p>
      );
    }
  }
}
