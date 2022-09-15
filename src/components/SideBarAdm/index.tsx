import { Link } from 'react-router-dom';
import {AiFillPlusSquare, AiFillEye} from "react-icons/ai";
import * as S from './styles';

function SideBarAdm(){

    return(
        <S.Container>
            <section>
                <div className="header">
                    <h1>Administrador</h1>
                </div>
                <div className="main">
                    <div className="produtos">
                        <div className='p'>
                            <h1>Produtos</h1>
                            <ul>
                                
                                <Link className="Link" to={'/admin/produtos/cadastro'}><AiFillPlusSquare/><li>Adicionar produto</li></Link>
                                <Link className="Link" to={'/admin/produtos'}><AiFillEye/><li>Visualizar produtos</li></Link>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="categorias">
                        <div className="c">
                            <h1>Categorias</h1>
                            <ul>
                                <Link className="Link" to={'/admin/categorias/cadastro'}><AiFillPlusSquare/><li>Adicionar categoria</li>  </Link>
                                <Link className="Link" to={'/admin/categorias'}><AiFillEye/><li>Visualizar categorias</li></Link>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="tags">
                        <div className='t'>
                            <h1>Tags</h1>
                            <ul>
                                
                                <Link className="Link" to={'/admin/tags/cadastro'}><AiFillPlusSquare/><li>Adicionar tags</li></Link>
                                <Link className="Link" to={'/admin/tags'}><AiFillEye/><li>Visualizar tags</li></Link>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </S.Container>
    )
}

export default SideBarAdm