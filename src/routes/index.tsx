import { Route, Routes as RoutesWrapper } from 'react-router-dom';
import Home from '../pages/Home';
import Produto from '../pages/Produto';
import HomeProduto from '../pages/Admin/Produtos/Home'
import CadastroProduto from '../pages/Admin/Produtos/Cadastro'
import HomeAdmin from '../pages/Admin/Home/index';
import VisualizarProduto from '../pages/Admin/Produtos/Visualizar'
import EditarProduto from '../pages/Admin/Produtos/Editar'
import CadastroCategoria from '../pages/Admin/Categorias/Cadastro'
import HomeCategoria from '../pages/Admin/Categorias/Home'
import VisualizarCategoria from '../pages/Admin/Categorias/Visualizar'
import EditarCategoria from '../pages/Admin/Categorias/Editar'
import HomeTags from '../pages/Admin/Tags/Home'
import CadastroTags from '../pages/Admin/Tags/Cadastro'
import VisualizarTag from '../pages/Admin/Tags/Visualizar'
import EditarTags from '../pages/Admin/Tags/Editar'
import Produtos from '../pages/Produtos'
import HomePacote from '../pages/Admin/Pacotes/Home'
import CadastroPacote from '../pages/Admin/Pacotes/Cadastro'
import VisualizarPacote from '../pages/Admin/Pacotes/Visualizar'
import EditarPacote from '../pages/Admin/Pacotes/Editar'
import Pacote from '../pages/Pacote';
import HomeOferta from '../pages/Admin/Ofertas/Home'
import CadastroOferta from '../pages/Admin/Ofertas/Cadastro'
import VisualizarOferta from '../pages/Admin/Ofertas/Visualizar'
import Pacotes from '../pages/Pacotes';

function Routes() {
    return (
      // <BrowserRouter>
      <RoutesWrapper>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/pacotes" element={<Pacotes />} />
        <Route path="/pacote/:id" element={<Pacote />} />
        <Route path="admin" >
          <Route index element={<HomeAdmin/>}/> 
          <Route path="produtos">
            <Route index element={ <HomeProduto/> } />
            <Route path="cadastro" element={<CadastroProduto/>} />
            <Route path="visualizar/:id" element={<VisualizarProduto/>} />  
            <Route path="editar/:id" element={<EditarProduto/>} />
          </Route>
          <Route path="categorias">
            <Route index element={ <HomeCategoria/> } />
            <Route path="cadastro" element={<CadastroCategoria/>} />
            <Route path="visualizar/:id" element={<VisualizarCategoria/>} />       
            <Route path="editar/:id" element={<EditarCategoria/>} />
          </Route>
          <Route path="tags">
            <Route index element={ <HomeTags/> } />
            <Route path="cadastro" element={<CadastroTags/>} />
            <Route path="visualizar/:id" element={<VisualizarTag/>} />       
            <Route path="editar/:id" element={<EditarTags/>} />
          </Route>
          <Route path="pacotes">
            <Route index element={ <HomePacote/> } />
            <Route path="cadastro" element={<CadastroPacote/>} />
            <Route path="visualizar/:id" element={<VisualizarPacote/>} />  
            <Route path="editar/:id" element={<EditarPacote/>} />
          </Route>
          <Route path="ofertas">
            <Route index element={ <HomeOferta/> } />
            <Route path="cadastro" element={<CadastroOferta/>} />
            <Route path="visualizar/:id" element={<VisualizarOferta/>} />
          </Route>  
        </Route>
      </RoutesWrapper>
      // </BrowserRouter>
    );
  }
  
  export default Routes;