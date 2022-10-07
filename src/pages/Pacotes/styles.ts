import styled from "@emotion/styled";

export const Container = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;

    .pacotes{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        margin: auto;

        h1{
            margin: auto;
        }

        .pacotesmap{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            width: 100vw;
            gap: 15px;
        }
    }
`