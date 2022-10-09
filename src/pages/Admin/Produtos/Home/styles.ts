import { Flex } from "@chakra-ui/react";
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
    }
}

.Form{
    margin: 45px auto;
    width: 50vw;
    display: flex;
    
    Table{
        margin: 0 auto auto;
        width: 100%;
        .tdbuttons{
            .buttons{
                display: flex;
                gap: 5px;
            }
        }
    }
}

`
