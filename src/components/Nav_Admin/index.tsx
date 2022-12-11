import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/logo";
import * as S from "./styles";

function Nav_Admin() {
  return (
    <S.Nav_Admin>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Link to={"/admin"}>
            <Navbar.Brand>
              <Logo />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                className="navdrops"
                title="Produtos"
                id="collasible-nav-dropdown"
              >
                <Link className="link" to={"/admin/produtos"}>
                  <Navbar.Brand className="texto">Visualizar</Navbar.Brand>
                </Link>
                <br></br>
                <Link className="link" to={"/admin/produtos/cadastro"}>
                  <Navbar.Brand className="texto">Cadastrar</Navbar.Brand>
                </Link>
              </NavDropdown>

              <NavDropdown
                className="navdrops"
                title="Serviços"
                id="collasible-nav-dropdown"
              >
                <Link className="link" to={"/admin/categorias"}>
                  <Navbar.Brand className="texto">Visualizar</Navbar.Brand>
                </Link>
                <br></br>
                <Link className="link" to={"/admin/categorias/cadastro"}>
                  <Navbar.Brand className="texto">Cadastrar</Navbar.Brand>
                </Link>
              </NavDropdown>

              {/* <NavDropdown
                className="navdrops"
                title="Tags"
                id="collasible-nav-dropdown"
              >
                <Link className="link" to={"/admin/tags"}>
                  <Navbar.Brand className="texto">Visualizar</Navbar.Brand>
                </Link>
                <br></br>
                <Link className="link" to={"/admin/tags/cadastro"}>
                  <Navbar.Brand className="texto">Cadastrar</Navbar.Brand>
                </Link>
              </NavDropdown> */}

              <NavDropdown
                className="navdrops"
                title="Pacotes"
                id="collasible-nav-dropdown"
              >
                <Link className="link" to={"/admin/pacotes"}>
                  <Navbar.Brand className="texto">Visualizar</Navbar.Brand>
                </Link>
                <br></br>
                <Link className="link" to={"/admin/pacotes/cadastro"}>
                  <Navbar.Brand className="texto">Cadastrar</Navbar.Brand>
                </Link>
              </NavDropdown>

              <NavDropdown
                className="navdrops"
                title="Ofertas"
                id="collasible-nav-dropdown"
              >
                <Link className="link" to={"/admin/ofertas"}>
                  <Navbar.Brand className="texto">Visualizar</Navbar.Brand>
                </Link>
                <br></br>
                <Link className="link" to={"/admin/ofertas/cadastro"}>
                  <Navbar.Brand className="texto">Criar ofertas</Navbar.Brand>
                </Link>
              </NavDropdown>

              <NavDropdown
                className="navdrops"
                title="Promoção"
                id="collasible-nav-dropdown"
              >
                <Link className="link" to={"/admin/promocao"}>
                  <Navbar.Brand className="texto">Visualizar</Navbar.Brand>
                </Link>
                <br></br>
                <Link className="link" to={"/admin/promocao/cadastro"}>
                  <Navbar.Brand className="texto">
                    Cadastrar Promoção
                  </Navbar.Brand>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </S.Nav_Admin>
  );
}

export default Nav_Admin;
