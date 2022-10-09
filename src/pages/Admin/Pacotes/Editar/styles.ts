import styled from "@emotion/styled";

export const Editar = styled.div`
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

    .Form{
        margin: auto;
    }
    .icon{
        font-size: 4vw;
        margin: 1vw 0 0 2vw;
    }
    .nome{
        width: 50vw;
        display: flex;
        flex-direction: column;
        input{
            width: 100%;
        }
    }
    .descricao{
        width: 50vw;
        height: 30vh;
        display: flex;
        flex-direction: column;
        textarea{
            height: 100%;
            resize: none;
        }
    }
    .position{
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        .imgs{      
            width: 25vw;
            height: 30vh;
            .img1,
            .img2,
            .img3{
                display: flex;
                flex-direction: column;
            }
        }
        .preco{
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            gap: 12px;
            input{
                width: 15vw;
            }
        }
    }

    img{
        width: 5vw;
    }

    .formTags{
        width: 50vw;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 15px;
        
        .tags{
            display: flex;
            flex-direction: column;
        }
    }
`