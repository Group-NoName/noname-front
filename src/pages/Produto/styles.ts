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

      .imgsLateral{
        text-align: center;
        width: 150px;
        height: 110px;
        border: 1px solid pink;
        border-radius: 20px;
        
        .imgs{
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .tamanho{
            object-fit: cover;
          }
        }
      }
    }
    .imgCentral{ 
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40%;
        .posicao{
          overflow: hidden;
          display: flex;
          justify-content: center;
          width: 80%;
          height: 80%;
          text-align: center;
          border: 1px solid pink;
          border-radius: 20px;
          padding: 14px;
          
          .tamanho{
            object-fit: cover;
          }
        }
    }
    .produtoInformation{
        width: 45%;
        border: 1px solid pink;
        border-radius: 20px;

        .produtoDescricao{
          height: 80%;
          
          .nome{
            width: 100%;
            height: 25%;
            border-bottom: 1px solid pink;
            h1{
              padding: 1vw;
              font-size: 100%;
            }
          }
          .desc{
            width: 100%;
            height: 70%;
            margin: auto;
            border-bottom: 1px solid pink;
            p{
              padding: 1vw;
              font-size: 15px;
            }
          }
        }
        .produtoPrice{
          margin-top: 10px;
          width: 100%;
          height: 20%;
          display: flex;
          padding: 10px;
          justify-content: space-between;          
          
          .price{
            align-items: center;
            justify-content: center;
            h2{
              text-align: center;
              color: #3a4ad9;
            }
          }
          .produtopricebuttom{
            display: flex;
            align-items: center;
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
      border: 1px solid black;
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