import { Card, CardGroup, Col, Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import NotifySuccess from "./NotifySuccess";
import '../styles/sectionContent.css'
import foodImage from '../assets/food.gif'
import { convertGs } from '../utils/convertGs';

const SectionContent = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {

  const [listProductos, setListProductos] = useState([]);
  const navigate = useNavigate();
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

  const role = localStorage.getItem("role")
  const roleAdmin = role == 'admin' ? true : false;
  
  useEffect(() => {
    client.get("/productos/",
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
          'Content-Type': 'application/json',
        }
      })
      .then(function (res) {
        setListProductos(res.data);
        console.log(listProductos)
      })
      .catch(function (error) {
        console.log(error)
      });
    // eslint-disable-next-line
  }, []);

  const onAddProduct = product => {
    if (allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setTotal(total + product.precio * product.cantidad);
      setCountProducts(countProducts + product.cantidad);
      return setAllProducts([...products]);
    }

    setTotal(total + product.precio * product.cantidad);
    setCountProducts(countProducts + product.cantidad);
    setAllProducts([...allProducts, product]);
    NotifySuccess();
  };


  return (
    <div className="mt-4 container-height row">
      <div className='col-12 scroll-container'>
        <>
          {listProductos.length ? (
            <CardGroup>
              <Row>
                {listProductos.map(product =>
                  <Col className='item scroll-page' key={product.id}>
                    <Card>
                      <Card.Img variant="top" src={foodImage} />
                      <Card.Body>
                        <Card.Title> {product.nombre} </Card.Title>
                        <Card.Text>
                          Precio: {convertGs(product.precio)}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <button className='btn btn-primary' onClick={() => onAddProduct(product)}>Agregar al pedido</button>
                        {roleAdmin && <>
                          <button style={{ marginLeft: '5px' }} className='btn btn-warning' onClick={() => navigate("/editarProducto", {
                            state: {
                              id: product.id,
                            },
                          })}>Editar producto</button>
                        </>}
                      </Card.Footer>
                    </Card>
                  </Col>
                )}
              </Row>
            </CardGroup>
          ) : (
            <h1 className='form-label'>No hay ningun Producto agregado</h1>
          )}

        </>

      </div>
      <ToastContainer />
    </div>

  );
}

export default SectionContent;