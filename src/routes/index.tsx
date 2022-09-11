import { Route, Routes as RoutesWrapper } from 'react-router-dom';
import Home from '../pages/Home';
import Produto from '../pages/Produto';
import HomeProduto from '../pages/Admin/Produtos/Home'
import CadastroProduto from '../pages/Admin/Produtos/Cadastro'

function Routes() {
    return (
      // <BrowserRouter>
      <RoutesWrapper>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="admin" >
          <Route path="produtos">
            <Route index element={ <HomeProduto/> } />
            <Route path="cadastro" element={<CadastroProduto/>} />
          </Route>
        </Route>
      </RoutesWrapper>
      // </BrowserRouter>
    );
  }
  
  export default Routes;