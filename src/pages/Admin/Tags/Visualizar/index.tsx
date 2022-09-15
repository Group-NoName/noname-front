import { useState } from "react"
import { useParams } from "react-router-dom"
import Nav_Admin from "../../../../components/Nav_Admin";
import tags from "../../../../interfaces/tags"
import { api } from "../../../../service/api"
import * as S from './styles';

function visualizarTag() {   
    return (
        <section>
            <Nav_Admin/>
            <S.Visualizar>
                <h1>teste</h1>
            </S.Visualizar>
        </section>
    )
}
export default visualizarTag