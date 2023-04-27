import './App.css';
import Container from './components/Dashboard';
import Sidebar from './components/SideBar';
import AddProducts from './components/AddProducts';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
        <Routes>
          <Route >
            <Route exact path="/" element={<Container />} />
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

export default App;