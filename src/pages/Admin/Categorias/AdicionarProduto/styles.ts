import styled from "@emotion/styled";

export const Cadastro = styled.div`

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
        justify-content: center;
        align-items: center;
    }
}

.Form{
    margin: 45px auto;
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
    .categoria{      
        width: 25vw;
        height: 30vh;
        .cate{
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

`