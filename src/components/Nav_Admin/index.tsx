import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/logo';
import * as S from './styles';

function Nav_Admin() {
  return (
    <S.Nav_Admin>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Link  to={'/admin'}>
                    <Navbar.Brand>
                        <Logo />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown className='navdrops' title="Produtos" id="collasible-nav-dropdown">
                            
                            <NavDropdown.Item>
                                <Link className='link' to={'/admin/produtos'}>
                                    <Navbar.Brand className='texto'>Visualizar</Navbar.Brand>
                                </Link>
                            </NavDropdown.Item>
                            
                            <NavDropdown.Item>
                                <Link className='link' to={'/admin/produtos/cadastro'}>
                                    <Navbar.Brand className='texto'>Adicionar</Navbar.Brand>
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown className='navdrops' title="Categorias" id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <Link className='link' to={'/admin/categorias'}>
                                    <Navbar.Brand className='texto'>Visualizar</Navbar.Brand>    
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link className='link' to={'/admin/categorias/cadastro'}>
                                    <Navbar.Brand className='texto'>Adicionar</Navbar.Brand>
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown className='navdrops' title="Tags" id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <Link className='link' to={'/admin/tags'}>
                                    <Navbar.Brand className='texto'>Visualizar</Navbar.Brand>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link className='link' to={'/admin/tags/cadastro'}>
                                    <Navbar.Brand className='texto'>Adicionar</Navbar.Brand>
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </S.Nav_Admin>
  );
}

export default Nav_Admin;