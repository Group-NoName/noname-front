import { Input } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const CustomInput = styled(Input)`
  width: ${props => props.width}vw;
  height: ${props => props.height}vw;
  font-size: ${props => props.fontSize}vw;
  border-radius: ${props => props.borderRadius}px ;
  border: none;
  padding-left: 25px;
  `