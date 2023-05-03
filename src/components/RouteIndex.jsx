import '../App.css';
import Container from './Dashboard';
import Sidebar from './SideBar';
import AddProducts from './AddProducts';
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
            {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouteIndex;