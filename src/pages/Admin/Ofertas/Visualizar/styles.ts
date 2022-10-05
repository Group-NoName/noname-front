import styled from "@emotion/styled";

export const Visu = styled.div`
display: flex;
flex-direction: column;
align-items: center;

    .porcentagem{
        display: flex;
        flex-direction: column;
        .buttons{
            margin: auto;
            display: flex;
            gap: 5px;
        }
    }
    .produtosPorcent{
        display: flex;
        flex-direction: column;

        h1{
            margin: auto;
        }

        .produtos{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .produto{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 10px;

                .buttons{
                    display: flex;
                    gap: 5px;
                }
            }
        }
    }
`