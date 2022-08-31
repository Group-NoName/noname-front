import NavBar from "./components/Navbar/index"
import CardIten from "./components/CardItens/index"
function App() {
  return (
    <>
      {/* <NavBar /> */}
      <CardIten name={"Naruto"} width={20} height={35} backgroundUrl={"https://images.hdqwalls.com/download/viktor-league-of-legends-8k-gh-3840x2400.jpg"} direction1={"top"} direction2={"center"} />
      <CardIten name={"Dragon Ball Z"} width={20} height={35} backgroundUrl={"https://imguol.com/p/pp/ler-mais/bg-top.jpg"} direction1={"center"} direction2={"center"} />
    </>
  )
}

export default App
