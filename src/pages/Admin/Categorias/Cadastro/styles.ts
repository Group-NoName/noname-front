import styled from "@emotion/styled";

export const Cadastro = styled.div`
display: flex;
align-items: center;
justify-content: center;

.Form form{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .nome{
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 15px;

        input{
            width: 350px;
        }
    }

    Button{
        margin-top: 15px;
    }
}

`