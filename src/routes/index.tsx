import { Route, Routes as RoutesWrapper } from 'react-router-dom';
import Home from '../pages/Home';
import Produto from '../pages/Produto';

function Routes() {
    return (
      // <BrowserRouter>
      <RoutesWrapper>
        <Route path="/" element={<Home />} />
        <Route path="/produto" element={<Produto />} />
      </RoutesWrapper>
      // </BrowserRouter>
    );
  }
  
  export default Routes;