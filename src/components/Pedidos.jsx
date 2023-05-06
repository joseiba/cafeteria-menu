import { Card, CardGroup, Col, Row, Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import NotifyError from "./NotifyError";
import NotifySuccess from "./NotifySuccess";
import '../styles/sectionContent.css'
import { convertGs } from '../utils/convertGs';

const Pedidos = ({ }) => {

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
      .then(function (res) {
        console.log(res.data)
        let p = res.data
        setPedidos(p.filter((p) => p.estado == 1))
        console.log(pedidos)
      })
      .catch(function (error) {
        console.log(error)
      });
    // eslint-disable-next-line
  }, []);

  const onEntregar = (id) => {
    client.delete("/pedidos/" + id + "/",
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
          'Content-Type': 'application/json',
        }
      })
      .then(function (res) {
        console.log(res)
        NotifySuccess()
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);

      })
      .catch(function (error) {
        console.log(error)
        NotifyError()
      });
  }

  return (
    <>
      <div className="mt-4 container-height" style={{ display: 'block', margin: 'auto' }}>
        <div className=''>
          {pedidos.length ? (
            <>
              <Table className='mt-4' striped bordered hover variant="dark" style={{ width: '500px', margin: 'auto' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Cliente</th>
                    <th>Mesa</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map(pedidos =>
                    <tr key={pedidos.id}>
                      <td>{pedidos.id}</td>
                      <td>{pedidos.cliente}</td>
                      <td>{pedidos.mesa}</td>
                      <td>Listo ✅</td>
                      <td>{convertGs(pedidos.total)}</td>
                      <td>
                        <div>
                          <button className='btn btn-primary' type='button' onClick={() => onEntregar(pedidos.id)}>Entregar</button>
                        </div>
                      </td>
                    </tr>

                  )}
                </tbody>
              </Table>
            </>
          ) : (
            <h1 className='form-label'>No se tiene ningun pedido listo</h1>
          )
          }
        </div>

      </div>
      <ToastContainer />
    </>
  );
}

export default Pedidos;