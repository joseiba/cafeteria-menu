import {Card, CardGroup, Col, Row, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';

import NotifyError from "./NotifyError";
import NotifySuccess from "./NotifySuccess";

const Pedidos = ({}) => {

    const [pedidos, setPedidos] = useState([]);;

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
    });

    useEffect(() => {
        client.get("/pedidos",
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            }
          })
        .then(function(res) {
          console.log(res.data[0].lista_productos)
          setPedidos(res.data)            
        })
        .catch(function(error) {
          console.log(error)
        });
        // eslint-disable-next-line
      }, []);
      
      return (  
        <>
          {/* <BootstrapTable data={ pedidos }>
              <TableHeaderColumn dataField='id' isKey hidden export>Product ID</TableHeaderColumn>
              <TableHeaderColumn dataField='mesa'>Product Name</TableHeaderColumn>
              <TableHeaderColumn dataField='total'>Product Price</TableHeaderColumn>
              <TableHeaderColumn dataField='action' export={ false }>Action</TableHeaderColumn>
          </BootstrapTable>
          <ToastContainer/>  */}
        </>
      );
}

export default Pedidos;