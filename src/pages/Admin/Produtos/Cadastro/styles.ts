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
    width: 45vw;
    display: flex;
    flex-direction: column;
    input{
        width: 100%;
    }
    textarea{
        width: 100%;
    }
    button{
        width: 100px;
        height: 40px;
        margin-top: 10px;
        border: 0px;
    }
    .append{
        background-color: green;
        color: white;
        border-radius: 5px;
    }
    .delete{
        background-color: red;
        color: white;
        border-radius: 5px;
    }
    .controller-btn{
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
}
.position{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
}
`