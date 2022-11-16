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
        align-items: center;
        justify-content: center;
    }
}

.Form{
    margin: 45px auto;
}

.Form form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .nome{
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;

        input{
            width: 45vw;
        }
    }

    Button{
        margin-top: 15px;
    }
}

.produtosSearch{
    margin-top: 15px;
    display: flex;
    width: 45vw;
    height: 300px;
    overflow-y: scroll;
    border: 1px solid;
    border-radius: 15px;
    

    .checkform{
        display: flex;
        flex-direction: column;
        text-align: left;
        justify-content: left;
        align-items: left;

        .check{
            display: flex;
            left: 0;
            float: left;
        }
    }
}

`