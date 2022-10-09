import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';


export const Container = styled(Flex)`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    background-color: #f5f5f5;

    header{
        top: 0;
        z-index: 1000;
        width: 100vw;
        position: fixed;
    }
    main{
        margin-top: 3.45em;
        display: flex;

    }
    .categorias{
        display: flex;
        flex-direction: column;
        width: 75vw;
        .listCategorias{
            width: 70vw;
            height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 1em auto;
            box-shadow: 0 0 10px black;
            border-radius: 20px;
            h1{
                margin: 2px auto;
            }
            .produtosmap{
                display: flex ;
                justify-content: center;
                overflow-x: scroll;
                width: 100%;
                gap: 1vw;
    
                .disposicaoItem{
                    width: 100%;
                }
            }
            
    
        }
    }

    .listpacotes{
        position: fixed;
        right: 10px;
        margin-top: 30px;
        float: right;
        width: 25vw;
        height: 80%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        align-items: center;
        border: 1px solid;
        box-shadow: 0 0 10px black;
        border-radius: 20px;

        .pacote{
            margin-top: 30px;
            border: 1px solid grey;
            border-radius: 5px;
        }
    }

    .listpacotes::-webkit-scrollbar,
    .produtosmap::-webkit-scrollbar {
        height:  8px;
    }

    .listpacotes::-webkit-scrollbar-track,
    .produtosmap::-webkit-scrollbar-track {/* Background */
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
        
    }

    .listpacotes::-webkit-scrollbar-thumb,
    .produtosmap::-webkit-scrollbar-thumb  { 
        border-radius: 10px;
        background-color: #0d6efd ;
        width: 5px ;
    }

    .listpacotes::-webkit-scrollbar-thumb:hover,
    .produtosmap::-webkit-scrollbar-thumb:hover{
        background-color:  #0b5ed7;
    }
    
`;

