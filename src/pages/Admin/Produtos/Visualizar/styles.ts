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
.content h3{
    color: rgba(0, 21, 212, 0.75)
}
.description{
    width: 40vw;
    height: 30vh;
}
/* .tags{
    display: flex;
    flex-direction: column;
    justify-content: left;

    .tagscards{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        
        .tag{
        width: 200px;
        display: flex;
        font-size: 25px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid pink;
        border-radius: 10px;
        padding: 5px;

        p{
            margin: auto;
        }
    }
    }
} */
.right-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50%;

    .produtoimg{
        width: 300px;
        height: 150px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        text-align: center;
        border-radius: 20px;
        border: 1px solid pink;
    }

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