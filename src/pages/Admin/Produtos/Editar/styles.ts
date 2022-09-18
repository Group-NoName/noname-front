import styled from "@emotion/styled";

export const Editar = styled.div`
main{
    display: flex;
    flex-direction: column;
}
.Form{
    margin: 45px auto;
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
    margin: 15px auto;
    display: flex;
    flex-direction: column;
}

`