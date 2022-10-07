import styled from "@emotion/styled";

export const Home = styled.div`

main{
    display: flex;
    height: 100%;
}
.Cards{
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around; 
    .conteudo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5em;
        width: 15em;
        border: 1px solid red;
        background-color: gray;
    }
}
    `