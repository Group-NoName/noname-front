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

.icon{
    font-size: 4vw;
    margin: 1vw 0 0 2vw;
    display: flex;
}

.contentMain form{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .nome{
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 15px;

        input{
            width: 45vw;
        }
    }
    .produtosSearch{
        flex-wrap: nowrap;
        overflow-y: scroll;
        height: 40vh ;
        width: 45vw ;

    }
    Button{
        margin-top: 15px;
    }
}

.contentProd{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 45vw;
    gap: 5px;
}

    .produtosSearch::-webkit-scrollbar {
        height:  8px;
    }
    .produtosSearch::-webkit-scrollbar-track {/* Background */
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }
    .produtosSearch::-webkit-scrollbar-thumb  { 
        border-radius: 10px;
        background-color: #0d6efd ;
        width: 5px ;
    }
    .produtosSearch::-webkit-scrollbar-thumb:hover{
        background-color:  #0b5ed7;
    }
`