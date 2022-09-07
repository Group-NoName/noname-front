import styled from '@emotion/styled';

export const Container = styled.div`
  border: 1px solid red;
  min-height: 89vh;

  .produtoContent{
    margin: auto;
    border: 1px solid;
    width: 90vw;
    height: 55vh;
    display: flex;
    .imgLateral{
        border: 1px solid red;
        width: 15%;
    }
    .imgCentral{
        border: 1px solid blue;
        width: 40%;
    }
    .produtoInformation{
        border: 1px solid green;
        width: 45%;

        .produtoDescricao{
          border: 1px solid red;
          height: 80%
        }

        .produtoPrice{
          border: 1px solid blue;
          height: 20%;
          display: flex; 
          .price{
            width: 50%;
            height: 100%;
            border: 1px solid;
          }
          .produtopricebuttom{
            width: 50%;
            height: 100%;
            border: 1px solid red;
          }
        }
    }
  }

  .produtosLists{
    margin: auto;
    width: 90vw;
    border: 1px solid green;
    height: 40vh;

    .produtosAdicionais{
      height: 50%;
      border: 1px solid;
    }

    .produtosRelacionados{
      height: 50%;
      border: 1px solid;
    }
  }

  `
;