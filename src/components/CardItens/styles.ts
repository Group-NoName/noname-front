import { Button, Flex } from "@chakra-ui/react"
import styled from "@emotion/styled"

export const Card = styled(Flex)`
    margin: 0 1.5em 0 1.5em;
    width: ${props => props.width}em;
    height: ${props => props.height}em;
    border: 2px solid #3441B9;
    box-shadow: -3px 5px #3441B9;
    border-radius: 18px;
    flex-direction: row ;
`
export const Image = styled(Flex)`
    width: 100%;
    border-radius: 15px;
    min-height: 100%;
    opacity: 90%;
    background: url(${props => props.backgroundUrl});
    background-position: ${props => props.direction1} ${props => props.direction2};
    background-size: cover;
    background-repeat: no-repeat;
`
export const Content = styled.div``