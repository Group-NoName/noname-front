import Nav_Admin from "../../../components/Nav_Admin";
import { Helmet } from 'react-helmet';
import * as S from "./styles"

function Home(){
    return (
        <>
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <Nav_Admin/>
        </>
    )
}

export default Home;