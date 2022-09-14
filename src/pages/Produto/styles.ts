import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 89vh;
  margin-top: 0.5em;

  .produtoContent{
    width: 90vw;
    height: 55vh;
    display: flex;
    
    .imgLateral{ 
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
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
        display: flex;
        align-items: center;
        justify-content: center;
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
        border: 1px solid ;
        border-radius: 20px;

        .produtoDescricao{
          height: 80%;
          
          h1{
            padding: 1vw;
            border-bottom: 1px solid;
          }
          p{
            padding: 1vw;
          }
        }
        .produtoPrice{
          display: flex;
          padding: 10px;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid;
          
          .price{
              
            h2{
              display: flex;
              font-size: 3vw;
              text-align: center;
              color: #3a4ad9;
            }
          }
          .produtopricebuttom{
            display: flex;
            text-align: center;
          }
        }
    }
  }

  .produtosLists{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    width: 90vw;
    overflow: hidden;
    
    .produtosAdicionais{
      border: 1px solid;
      
    }

    h2{
      margin: auto;
    }

    .produtosRelacionados{
      display: flex;
      
      .posicao{
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
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