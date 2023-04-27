import {Card, CardGroup, Col, Row, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Container from '../components/Dashboard';

import '../styles/sectionContent.css'

const AddProducts = () =>  {

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });
  

  useEffect(() => {
    // client.get("/productos/")
    // .then(function(res) {
    //   setListProductos(res.data);
    //   console.log(listProductos)  
    // })
    // .catch(function(error) {
    //   console.log(error)
    // });
    // // eslint-disable-next-line
  }, []);

  return (    
    <Container/>
  
  );
}

export default AddProducts;