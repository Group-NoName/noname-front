import NavBar from "./components/Navbar/index"
import CardIten from "./components/CardItens/index"
import Button from "./components/Button"
import { Input } from "./components/Input"
import { Inputtext } from "./components/InputText"
import React from "react"
function App() {
  return (
    <>
      { /* <NavBar /> */ }
      <Button color={"#FFFF"} width={5} height={2} fontSize={25} backgroundColor={"#3441B9"} text={"Publicar"}/>
      <Inputtext fontSize={10} width={"12"} height={"5"} placeHolder={"Olá"} type={"textarea"}/>
      <CardIten name={"Naruto"} width={20} height={35} backgroundUrl={"https://images.hdqwalls.com/download/viktor-league-of-legends-8k-gh-3840x2400.jpg"} direction1={"top"} direction2={"center"} />
      <CardIten name={"Dragon Ball Z"} width={20} height={35} backgroundUrl={"https://imguol.com/p/pp/ler-mais/bg-top.jpg"} direction1={"center"} direction2={"center"} />
    </>
  )
}

export default App
