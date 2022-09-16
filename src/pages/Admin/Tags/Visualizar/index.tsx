import { useCallback, useEffect, useState } from "react"
import Nav_Admin from "../../../../components/Nav_Admin";
import tags from "../../../../interfaces/tags"
import { api } from "../../../../service/api"
import * as S from './styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function visualizarTag() {
    const [tag, setTag] = useState<tags>()
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => { getTag() }, [id]);
    async function getTag() {
        const response = await api.get<tags>(`tags/tags/${id}`)
        setTag(response.data)
    }
    const deletarTag = useCallback(
        async (id: string) => {
            await api.delete(`/tags/excluir/${id}`)
            navigate(`/admin/tags/`)
        }, []
    )
    

    return (
        <section>
            <Nav_Admin />
            <S.Visualizar>
                <h1>{tag?.nome}</h1>
                <Link to={`/admin/tags/editar/${tag?.id}`}>Editar</Link>
                <Button onClick={() => deletarTag(String(tag?.id))}>Remover</Button>
            </S.Visualizar>
        </section>
    )
}
export default visualizarTag