import styled from "@emotion/styled";

export const Visu = styled.div`

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

    .preco{
        margin: auto;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-self: center;
        gap: 10px;
    }

    .left-content{
        display: flex;
        align-self: center;
    }

    .icon{
        font-size: 4vw;
        margin: 1vw 0 0 2vw;
        
    }

    Button{
        margin: 4px 1px;
    }

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

        .form{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`