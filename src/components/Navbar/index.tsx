import * as S from './styles'
import logo_uol from '../../assets/logo-uol.png'
import { HiMenu, HiHeart, HiShoppingCart, HiUserCircle } from "react-icons/hi";
import { Input } from '../../components/Input'
function Navbar() {
    return (
        <S.NavBar>
            <div className="nav">
                <button className='btn'>
                    <HiMenu className='btn-burguer' />
                </button>
                <div className="logo">
                    <img src={logo_uol} alt="" />
                </div>
                <div className="search-bar">
                    <Input
                        fontSize={2}
                        placeHolder={'Buscar'}
                        width={50}
                        height={3}
                        borderRadius={20}
                    />
                </div>
                <div className="iconSettings">
                    <div className="iconPerfil">
                        <HiUserCircle />
                        <div className="blockContent">
                            <p>Olá, Faça login <br/> ou cadastre-se</p>
                        </div>
                    </div>
                    <div className="HeartIcon">
                        <HiHeart />
                    </div>
                    <div className="Shopcart">
                        <HiShoppingCart />
                    </div>
                </div>
            </div>
        </S.NavBar>

    )
}
export default Navbar;