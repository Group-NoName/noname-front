import styled from "@emotion/styled";

export const Cadastro = styled.div`
section{
      header{
          z-index: 100;
          width: 100vw;
          top: 0;
          position: fixed;
      }
      main{
          margin-top: 4em;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
      }
  }

  .contentMain{
      .nome{
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
          input{
              width: 45vw;
          }
        }
  }

  .contentMain form{
      margin-top: 60px;
      display: flex;
      flex-direction: column;

      .preco{
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      gap: 12px;

      .porcentagem{
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 15px;

          input{
              width: 450px;
          }
      }
      .produtosSearch{
          flex-wrap: nowrap;
          overflow-y: scroll;
          height: 40vh ;
          width: 50vw ;

      }
      Button{
          margin-top: 15px;
      }
  }
  .estiloProdutos{
    margin: 1em 0;
    display: flex;
    .obrigatorios{
        h1{
            text-align: center;
        }
        width: 50%;
        border-right: 3px dashed black;
    }
    .opcionais {
        h1{
            text-align: center;
        }
        margin-left: 1em;
        width: 50%;
    }
  }


  .produtosSearch::-webkit-scrollbar {
      height:  8px;
  }
  .produtosSearch::-webkit-scrollbar-track {/* Background */
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
  }
  .produtosSearch::-webkit-scrollbar-thumb  { 
      border-radius: 10px;
      background-color: #0d6efd ;
      width: 5px ;
  }
  .produtosSearch::-webkit-scrollbar-thumb:hover{
      background-color:  #0b5ed7;
  }
}
`