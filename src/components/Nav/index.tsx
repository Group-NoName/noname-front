import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import * as S from './styles'
import Carrinho from '../../assets/icons/carrinho';
import Favoritos from '../../assets/icons/favoritos';
import Logo from '../../assets/icons/logo';
import Perfil from '../../assets/icons/perfil';
import ICategoria from '../../interfaces/categoria';
import { useState } from 'react';
import { api } from '../../service/api';


function Nav_() {

    return (
        <S.NavBar>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <Link  to={'/'}>
                        <Navbar.Brand>
                            <Logo />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            
                            
                                <Link className='link' to={'/'}>
                                    <Navbar.Brand>Home</Navbar.Brand>
                                </Link>
                                <Link  className='link' to={'/produtos'}>
                                    <Navbar.Brand>Produtos</Navbar.Brand>
                                </Link>
                                 
                            {/*   
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                                </NavDropdown>
                            */}
                        </Nav>
                        <Nav>
                            {/* <Navbar.Brand>
                                <Link className='link' to={''}>
                                    <Favoritos />
                                    <Navbar.Brand className='descrição'>Favoritos</Navbar.Brand>
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link className='link' to={''}>
                                    <Carrinho />
                                    <Navbar.Brand className='descrição'>Carrinho</Navbar.Brand>
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link className='link' to={''}>
                                    <Perfil />
                                    <Navbar.Brand className='descrição'>Conta</Navbar.Brand>
                                </Link>
                            </Navbar.Brand> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </S.NavBar>
    );
}

export default Nav_;