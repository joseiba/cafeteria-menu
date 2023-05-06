import {Card, CardGroup, Col, Row, Button, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';

import NotifyError from "./NotifyError";
import NotifySuccess from "./NotifySuccess";

import '../styles/sectionContent.css'

const AddUser = () =>  {

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });
  
  const [userFistName, setFirtsName] = useState('');
  const [userLastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');

  const onAddUser = () => {
		client.post("/users/",  {
			username: userName,
			password: pass,
      password2: pass,
      first_name: userFistName,
      last_name: userLastName            		
		}, 
     {headers: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
      'Content-Type': 'application/json',
      }})
		.then(function(res) {
        console.log(res)
        setFirtsName('');
        setLastName('');
        setUserName('');
        setPass('');
        NotifySuccess();
		})
		.catch(function(error) {
		    console.log(error)
        NotifyError();
		});
	};  
  return (  
    <>
    <Form style={{ margin: 'auto'}}>      
      <Form.Group className="mb-3 d-flex flex-column" controlId="formGridAddress1">
        <Form.Label>Nombre</Form.Label>
        <input type="text" value={userFistName} onChange={(e) => setFirtsName(e.target.value)} placeholder="Ej: Jose" required/>
      </Form.Group>

      <Form.Group className="mb-3 d-flex flex-column" controlId="formGridAddress1">
        <Form.Label>Apellido</Form.Label>
        <input type="text" value={userLastName} onChange={(e) => setLastName(e.target.value)} placeholder="Ej: Lopez" required/>
      </Form.Group>

      <Form.Group className="mb-3 d-flex flex-column" controlId="formGridAddress1">
        <Form.Label>Nombre Usuario</Form.Label>
        <input type="text" required value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Ej: joseiba"/>
      </Form.Group>

      <Form.Group className="mb-3 d-flex flex-column" controlId="formGridAddress2" >
        <Form.Label>Password</Form.Label>
        <input type="password" minLength={'8'} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" required/>
      </Form.Group>
     
      <Button variant="primary" type="button" onClick={onAddUser}>
        Agregar
      </Button>
    </Form>
        <ToastContainer/> 
    </>
  );
}

export default AddUser;