import { Input } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const CustomInput = styled(Input)`
  width: ${props => props.width}%;
  height: ${props => props.height}%;
  font-size: ${props => props.fontSize}px ;
  border-radius: ${props => props.borderRadius}px ;
  border: none;
  padding-left: 25px;
  `