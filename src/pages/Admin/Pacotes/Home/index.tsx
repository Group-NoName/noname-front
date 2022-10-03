import * as S from './styles';
import Nav_Admin from "../../../../components/Nav_Admin"
import { api } from "../../../../service/api"

function home() {
  return(
    <section>
      <Nav_Admin/>
      <S.Home>
        <h1>Ho me</h1>
      </S.Home>
    </section>
  ) 
}
export default home;