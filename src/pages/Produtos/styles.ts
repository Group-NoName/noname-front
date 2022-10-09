import styled from "@emotion/styled";

export const Container = styled.div`
    
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
            flex-direction: row;
        }
    }

    .produtos{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        margin: auto;

        h1{
            margin: auto;
        }

        .produtosmap{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            width: 100vw;
            gap: 15px;
        }
    }
`