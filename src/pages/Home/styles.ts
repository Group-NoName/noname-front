import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Container = styled(Flex)`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: #f5f5f5;

  header {
    top: 0;
    z-index: 1000;
    width: 100vw;
    position: fixed;
  }
  main {
    margin-top: 3.5em;
    display: flex;
  }
  .categorias {
    display: flex;
    flex-direction: column;
    width: 75vw;
    .listCategorias {
      width: 90%;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 1em auto;
      background-color: #ffff;
      box-shadow: 10px 10px 5px #aaaaaa;
      h1 {
        margin: 2px auto;
      }
      .produtosmap {
        display: flex;
        overflow-x: scroll;
        width: 65vw;
        height: 55vh;
        gap: 1vw;
        margin: 2em;
      }

      .disposicaoItem {
        width: 100%;
      }
    }
  }

  .listpacotes {
    position: fixed;
    right: 10px;
    margin-top: 30px;
    float: right;
    width: 25vw;
    height: 80%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    align-items: center;
    border: 1px solid;
    box-shadow: 0 0 10px black;
    border-radius: 20px;

    .pacote {
      margin-top: 30px;
      border: 1px solid grey;
      border-radius: 5px;
    }
  }

  .listpacotes::-webkit-scrollbar,
  .produtosmap::-webkit-scrollbar {
    height: 8px;
  }

  .listpacotes::-webkit-scrollbar-track,
  .produtosmap::-webkit-scrollbar-track {
    /* Background */
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  .listpacotes::-webkit-scrollbar-thumb,
  .produtosmap::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #0d6efd;
    width: 5px;
  }

  .listpacotes::-webkit-scrollbar-thumb:hover,
  .produtosmap::-webkit-scrollbar-thumb:hover {
    background-color: #0b5ed7;
  }
`;
