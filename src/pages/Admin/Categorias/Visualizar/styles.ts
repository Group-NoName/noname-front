import styled from "@emotion/styled";

export const Visualizar = styled.div`

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
        flex-direction: column;
        align-items: center;
    }
}
    .categoria{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .bottons{
            display: flex;
            gap: 10px;
        }
    }
    .produtosRelacionados{
        margin-top: 20px;
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