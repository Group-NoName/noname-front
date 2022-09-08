import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 89vh;
  margin-top: 0.5em;

  .produtoContent{
    margin: auto; 
    width: 90vw;
    height: 55vh;
    display: flex;
    .imgLateral{ 
        width: 15%;
        .tamanho{
          width: 8vw;
          border: 0.5px solid pink;
          border-radius: 8px;
        }
        .imgsLateral{
          text-align: center;
        }
    }
    .imgCentral{ 
        width: 40%;
        .posicao{
          text-align: center;
        }
        .tamanho{
          width: 25vw;
        }
    }
    .produtoInformation{
        width: 45%;

        .produtoDescricao{
          height: 80%;
          h1{
            padding: 1vw;
          }
          p{
            padding: 1vw;
          }
        }
        .produtoPrice{
          height: 20%;
          display: flex;
          
          h2{
            font-size: 3vw;
            text-align: center;
            color: #3a4ad9;
            
          }
          .price{
            width: 50%;
            height: 100%;
          }
          .produtopricebuttom{
            width: 50%;
            height: 100%;
            text-align: center;
          }
        }
    }
  }

  .produtosLists{
    margin: auto;
    width: 90vw;
    height: 40vh;

    .produtosAdicionais{
      height: 50%;
      border: 1px solid;
    }

    .produtosRelacionados{
      height: 50%;

      .posicao{
        display: flex;
        width: 100vw; 

        a{
          display: flex;
          flex-direction: row;
        }
      }
    }
  }

  `
;