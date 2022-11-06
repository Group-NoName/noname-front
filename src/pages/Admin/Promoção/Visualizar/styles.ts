import styled from "@emotion/styled";

export const Home = styled.div`

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

.mainContent{
    margin: auto;
    width: 80%;
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.left-content{
    margin: 8% 0;
}
.icon{
    font-size: 4vw;
    margin: 1vw 0 0 2vw;
    
}
.right-content{
    margin: 8% 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50%;

    .buttons{
        display: flex;
        gap: 5px;
    }
}
Button{
    width: 150px;
    margin-top: 5px;
    border: 1px solid;
}
`