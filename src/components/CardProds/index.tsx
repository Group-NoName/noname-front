import { DOMAttributes } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import * as S from './styles'
import ValidadorDesconto from '../../validators/validadorDesconto'

interface ICard extends DOMAttributes<HTMLButtonElement> {
    name: string;
    imageURL: string;
    produtoID: string;
    preco: number;
}

function CardProds({ name, imageURL, produtoID, preco}: ICard) {
    const navigate = useNavigate();
    const validacao = new ValidadorDesconto ()
  return (
    <S.Container>
        <Card style={{ width: '18rem', height: '25rem' }}>
            <div className="imgstyle">
                <div className="imgs">
                    <img src={imageURL} className='img'/>
                </div>
            </div>
        <Card.Body>
            <Card.Title className='name'>{name}</Card.Title>
            <Card.Title className='preco'>Preço: R$ {preco}</Card.Title>
            <Button variant="primary" onClick={() => navigate(`/produto/${produtoID}`)}>Ver Mais</Button>
        </Card.Body>
        </Card>
    </S.Container>
  );
}

export default CardProds;