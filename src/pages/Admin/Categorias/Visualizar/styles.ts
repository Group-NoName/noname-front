import styled from "@emotion/styled";

export const Visualizar = styled.div`
display: flex;
flex-direction: column;
align-items: center;

    .produtosRelacionados{
        display: flex;
        flex-direction: column;

        h3{
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