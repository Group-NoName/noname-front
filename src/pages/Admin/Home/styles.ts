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
        height: 100%;
        margin-top: 4em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
}

.Cards{
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-around; 

    .link{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5em;
        width: 15em;
        border: 1px solid;
        border-radius: 20px;
        background-color: #0F6EFD;
        text-decoration: none;
        
        p{  
            text-align: center;
            margin: auto;
            color: white;
            text-decoration: none;
        }
    }

    .link:hover{
        background-color: white;
        transition: 0.5s ease-in-out;

        p{
            color: #0F6EFD;
            transition: 0.5s ease-in-out;
        }
    }
}
    `