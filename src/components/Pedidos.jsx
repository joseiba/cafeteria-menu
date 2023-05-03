import {Card, CardGroup, Col, Row, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Pedidos = ({}) => {

    const [pedidos, setPedidos] = useState([]);;

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
    });

    useEffect(() => {
        client.get("/pedidos/",
        {
                headers: {
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json',
                }
            })
        .then(function(res) {
          setPedidos(res.data);
          console.log(pedidos)  
        })
        .catch(function(error) {
          console.log(error)
        });
        // eslint-disable-next-line
      }, []);
      

}

export default Pedidos;