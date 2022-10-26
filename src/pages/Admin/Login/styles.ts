import styled from "@emotion/styled";

export const Login = styled.div`

section{
    header{
        z-index: 100;
        width: 100vw;
        top: 0;
        position: fixed;
    }

    main{
        height: 100vh;
        align-content: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        h1{
            font-size: 2rem;
            font-weight: bold;
        }
        input{
            height: 2rem;
            width: 20rem;
            border-radius: 5px;
        }
        label{
            margin-top: 1rem;
           font-size: 1.1rem;
        }
        Button{
            margin-top: 20px;
        }
    }
}
`