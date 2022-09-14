import { DOMAttributes } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import * as S from './styles'

interface ICard extends DOMAttributes<HTMLButtonElement> {
    name: string;
    imageURL: string;
    produtoID: string;
    preco: number;
}

function CardProds({ name, imageURL, produtoID, preco}: ICard) {
    const navigate = useNavigate();
  return (
    <S.Container>
        <Card style={{ width: '18rem', height: '25rem' }}>
            <div className="imgstyle">
                <Card.Img className="img" variant="top" src={imageURL}/>
            </div>
        <Card.Body>
            <Card.Title className='name'>{name}</Card.Title>
            <Card.Title>Preço: R$ {preco}</Card.Title>
            <Button variant="primary" onClick={() => navigate(`/produto/${produtoID}`)}>Ver Mais</Button>
        </Card.Body>
        </Card>
    </S.Container>
  );
}

export default CardProds;