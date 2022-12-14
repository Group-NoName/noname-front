import styled from '@emotion/styled';

export const Container = styled.div`
  
  section{
    header{
      z-index: 100;
      width: 100vw;
      top: 0;
      position: fixed;
    }

    main{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100vw;
      overflow-x: hidden;
      min-height: 89vh;
      margin-top: 4em;

    }
  }

  .pacoteContent{
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
        overflow: hidden;
        
        .imgs{
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
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

          
          .tamanho{
            object-fit: cover;
          }
        }
    }
    .pacoteInformation{
        width: 45%;
        border: 1px solid pink;
        border-radius: 20px;

        .pacoteDescricao{
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
              padding: 3px;
              font-size: 17px;
            }
            h3{
              font-size: 15px;
            }
            a{
              padding: 1vw;
              font-size: 15px;
            }

            .itens{
              padding: 3px;
              height: 120px;
              border: 1px solid pink;
              overflow-y: scroll;
              display: flex;
              flex-direction: column;
              
              .link{
                display: flex;
                height: 25px;
                align-items: center;

                text-decoration: none;
              }
            }
          }
        }
        .pacotePrice{
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
          .pacotepricebuttom{
            display: flex;
            align-items: center;
          }
        }
    }
  }

  .pacotesLists{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    overflow: hidden;
    
    .produtosSemelhantes{
      width: 90vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .cards{
        margin: 25px auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 15px;

        .card{
          
          h1{
            font-size: 25px;
            text-align: center;
          }
        }
      }
    }

    h2{
      margin: auto;
    }

    .produtosRelacionados{
      display: flex;
      flex-direction: column;
      width: 90vw;
      margin-top: 30px;
      
      .posicao{
        margin: 25px auto;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%; 

        a{
          display: flex;
          flex-direction: row;
        }
      }
    }
  }

  @media(max-width: 765px){

    .produtoContent{
      width: 100vw;
      height: 100%;
      flex-direction: column;
      
    .imgLateral{
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .imgCentral{ 
      width: 100%;
      height: 350px;
    }
    .produtoInformation{
      margin: auto;
      width: 90%;
    }
  }
  }
`