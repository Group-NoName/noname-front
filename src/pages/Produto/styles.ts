import styled from '@emotion/styled';

export const Container = styled.div`
  border: 1px solid red;
  min-height: 89vh;

  .produtoContent{
    border: 1px solid;
    display: flex;
    .imgLateral{
        border: 1px solid red;
        width: 30%;
    }
    .imgCentral{
        border: 1px solid blue;
        width: 30%;
    }
    .produtoInformation{
        border: 1px solid green;
        width: 30%;
    }
  }

  `
;