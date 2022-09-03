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
                    {/* <Input
                        fontSize={25}
                        placeHolder={'Buscar'}
                        width={100}
                        height={100}
                        borderRadius={25}
                    /> */}
                </div>
                <div className="iconSettings">
                    <div className="iconPerfil">
                        <HiUserCircle />
                        <div className="blockContent">
                            <p>Olá, Faça login </p>
                            <p>ou cadastre-se</p>
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