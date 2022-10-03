import styled from "@emotion/styled";

export const Cadastro = styled.div`
main{
    display: flex;
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
    .produtos{
        display: flex;
        flex-direction: column;
        margin: 20px auto;
        gap: 12px;
        input{
            width: 15vw;
        }
    }
}

`
