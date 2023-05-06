import '../App.css';
import Container from './Dashboard';
import Sidebar from './SideBar';
import AddProducts from './AddProducts';
import Pedidos from './Pedidos';
import Usuarios from './Usuarios';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Cocina from './Cocina';
import EditProduct from './EditProduct';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function RouteIndex({setUserId}) {
  const role = localStorage.getItem("role")
  const roleAdmin = role == "admin" ? true : false;
  const roleCocinero = role == "cocinero" ? true : false;
  const roleRecepcionista = role == "recepcionista" ? true : false; 
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar  setUserId={setUserId}/>
        <Routes>       

          <Route>
            {roleAdmin ? (<>
              <Route path="/" element={<Container />} exact />
              <Route path="/pedidos" element={<Pedidos />} />
            </>) : roleRecepcionista && <>
              <Route path="/" element={<Container />} exact />
              <Route path="/pedidos" element={<Pedidos />} />
            </>}

            {roleAdmin ? (
              <>
                <Route path="/cocina" element={<Cocina />} />
              </>)
              :
              roleCocinero && (
                <><Route path="/cocina" element={<Cocina />} />
                </>
              )
            }

            {roleAdmin && <>
              <Route path="/agregarProducto" element={<AddProducts />} />
              {/* <Route  path="/usuarios" element={<Usuarios />} /> */}
              {/* <Route  path="/agregarUsuario" element={<AddUser />} />
              <Route  path="/editarUsuario" element={<EditUser />} /> */}
              <Route path="/editarProducto" element={<EditProduct />} />
            </>}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouteIndex;