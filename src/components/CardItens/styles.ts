import {  Flex } from "@chakra-ui/react"
import styled from "@emotion/styled"


export const Card = styled(Flex)`
    border: 2px solid blue;
    border-radius: 18px; 
    margin: 0 1vw;
    width: ${props => props.width}vw;
    height: ${props => props.height}vh;
`


export const Image = styled(Flex)`
    .image{
        width: 15em;        
        border-radius: 19px;
    }
`
export const Content = styled(Flex)`
width: 18vw;
height: 18vh;
    .btn{
        text-align: center;
    }
    h1{
        width: 18vw;
    }
`