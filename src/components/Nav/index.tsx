import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import * as S from "./styles";
import Logo from "../../assets/icons/logo";

function Nav_() {
  return (
    <S.NavBar>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Link to={"/"}>
            <Navbar.Brand>
              <Logo />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link className="link" to={"/"}>
                <Navbar.Brand>Home</Navbar.Brand>
              </Link>
              <Link className="link" to={"/produtos"}>
                <Navbar.Brand>Produtos</Navbar.Brand>
              </Link>
              <Link className="link" to={"/pacotes"}>
                <Navbar.Brand>Pacotes</Navbar.Brand>
              </Link>
            </Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </S.NavBar>
  );
}

export default Nav_;
