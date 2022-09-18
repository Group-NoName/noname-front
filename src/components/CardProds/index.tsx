import { DOMAttributes } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { string } from 'yup';
import * as S from './styles'

interface ICard extends DOMAttributes<HTMLButtonElement> {
    name: string;
    imageURL: string;
    produtoID: string;
    preco: number;
    tags?: string;
}

function CardProds({ name, imageURL, produtoID, preco, tags}: ICard) {
    const navigate = useNavigate();
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
            <Card.Title>{tags}</Card.Title>
            <Button variant="primary" onClick={() => navigate(`/produto/${produtoID}`)}>Ver Mais</Button>
        </Card.Body>
        </Card>
    </S.Container>
  );
}

export default CardProds;