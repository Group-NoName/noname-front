import { Input, Textarea } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const CustomInput = styled(Textarea)`
  width: ${props => props.width}em;
  height: ${props => props.height}em;
  font-size: ${props => props.fontSize}px ;
  border: none;
  border-radius: 8px;
  padding: 1em 0em 0em 1em;
  
  `