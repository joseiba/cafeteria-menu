import {Card, CardGroup, Col, Row, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/sectionContent.css'

const SectionContent = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) =>  {

  const [listProductos, setListProductos] = useState([]);

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });
  

  useEffect(() => {
    client.get("/productos/")
    .then(function(res) {
      setListProductos(res.data);
      console.log(listProductos)  
    })
    .catch(function(error) {
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
      debugger
			setTotal(total + product.precio *  product.cantidad);
			setCountProducts(countProducts +  product.cantidad);
			return setAllProducts([...products]);
		}

		setTotal(total + product.precio * product.cantidad);
		setCountProducts(countProducts + product.cantidad);
		setAllProducts([...allProducts, product]);
	};


  return (    
    <div className="mt-4 container-height row">  
      <div className='col-12 scroll-container'>
        <CardGroup>
        <Row>
            {listProductos.map(product =>
                 <Col className='item scroll-page' key={product.id}>
                 <Card>
                 <Card.Img variant="top" src="holder.js/100px160" />
                 <Card.Body>
                   <Card.Title> {product.nombre} </Card.Title>
                   <Card.Text>
                       Precio: {product.precio}
                   </Card.Text>
                 </Card.Body>
                 <Card.Footer>
                   <button className='btn btn-primary' onClick={() => onAddProduct(product)}>Agregar al pedido</button>
                 </Card.Footer>
                 </Card>
               </Col>  
            )}                       
        </Row>
        
      
      </CardGroup>
      </div>    
    </div>
  );
}

export default SectionContent;