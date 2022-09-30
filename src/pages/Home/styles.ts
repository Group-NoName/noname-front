import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled(Flex)`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    .listCategorias{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 1em auto;
        box-shadow: 10px 10px 5px #aaaaaa;
        h1{
            margin: auto;
        }
        .produtosmap{
            display: flex ;
            overflow-x: scroll;
            width: 80vw;
            gap: 1vw;
            margin: 2em;

            .disposicaoItem{
            margin-bottom: 1em ;
            }
        }
        

    }

    .produtosmap::-webkit-scrollbar {
        height:  8px;
    }
    .produtosmap::-webkit-scrollbar-track {/* Background */
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }
    .produtosmap::-webkit-scrollbar-thumb  { 
        border-radius: 10px;
        background-color: #0d6efd ;
        width: 5px ;
    }
    .produtosmap::-webkit-scrollbar-thumb:hover{
        background-color:  #0b5ed7;
    }

    
`;
