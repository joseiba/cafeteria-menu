import '../App.css';
import Container from './Dashboard';
import Sidebar from './SideBar';
import AddProducts from './AddProducts';
import Pedidos from './Pedidos';
import Usuarios from './Usuarios';
import AddUser from './AddUser';
import EditUser from './EditUser';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function RouteIndex() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
        <Routes>
          <Route >
            <Route exact path="/index" element={<Container />} />
            <Route exact path="/agregarProducto" element={<AddProducts />} />
            <Route exact path="/pedidos" element={<Pedidos />} />
            <Route exact path="/usuarios" element={<Usuarios />} />
            <Route exact path="/agregarUsuario" element={<AddUser />} />
            <Route exact path="/editarUsuario" element={<EditUser />} />                      
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouteIndex;