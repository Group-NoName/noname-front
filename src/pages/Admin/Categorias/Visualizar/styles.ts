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
            justify-content: center;
        }
    }
    .icon{
        font-size: 4vw;
        margin: 1vw 0 0 2vw;
        
    }
    .left-content{
        display: flex;
        align-self: center;
    }
    .categoria{
        width: 80%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: center;

        .bottons{
            justify-content: center;
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