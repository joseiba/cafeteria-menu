import { Card, CardGroup, Col, Row, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import NotifyError from "./NotifyError";
import NotifySuccess from "./NotifySuccess";

import Container from '../components/Dashboard';
import '../styles/sectionContent.css'

const EditProduct = () => {

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
    });


    const location = useLocation();
    console.log('location', location.state.id)
    const [nombrePro, setNombrePro] = useState('');
    const [precio, setPrecio] = useState(0);

    useEffect(() => {
        client.get("/productos/" + location.state.id,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(function (res) {
                console.log(res)
                setNombrePro(res.data.nombre)
                setPrecio(res.data.precio)
            })
            .catch(function (error) {
                console.log(error)
            });
        // eslint-disable-next-line
    }, []);

    const onEditProductos = () => {
        client.put("/productos/" + + location.state.id + "/", {
            nombre: nombrePro,
            precio: precio,
            cantidad: 1
        },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(function (res) {
                NotifySuccess();
                console.log(res)
            })
            .catch(function (error) {
                console.log(error)
                NotifyError();
            });
    };
    return (
        <>
            <Form style={{ margin: 'auto' }}>
                <Form.Group className="mb-3 d-flex flex-column" controlId="formGridAddress1">
                    <Form.Label>Nombre del producto</Form.Label>
                    <input type="text" value={nombrePro} onChange={(e) => setNombrePro(e.target.value)} placeholder="Ej: jugo de naranja" />
                </Form.Group>

                <Form.Group className="mb-3 d-flex flex-column" controlId="formGridAddress2" >
                    <Form.Label>Precio</Form.Label>
                    <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 15.000" />
                </Form.Group>

                <Button variant="primary" type="button" onClick={onEditProductos}>
                    Editar
                </Button>
            </Form>
            <ToastContainer />
        </>


    );
}

export default EditProduct;