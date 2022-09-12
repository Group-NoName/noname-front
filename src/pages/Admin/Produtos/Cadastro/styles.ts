import styled from "@emotion/styled";

export const Cadastro = styled.div`
main{
    display: flex;
}
.nome{
    width: 50vw;
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    input{
        width: 100%;
    }
}
.descricao{
    width: 50vw;
    height: 30vh;
    display: flex;
    flex-direction: column;
    border: 1px solid blue;
    textarea{
        height: 100%;
    }
}
.position{
    width: 25vw;
    height: 30vh;
    display: flex;
    flex-direction: row;
}

`