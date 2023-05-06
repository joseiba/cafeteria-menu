import { Card, CardGroup, Col, Row, Button, Table } from 'react-bootstrap';
import { useState, useEffect, Link } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";


import NotifyError from "./NotifyError";
import NotifySuccess from "./NotifySuccess";

const Usuarios = (props) => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);;

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

  useEffect(() => {
    client.get("/users/",
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
          'Content-Type': 'application/json',
        }
      })
      .then(function (res) {
        console.log(res)
        setUsers(res.data)
      })
      .catch(function (error) {
        console.log(error)
      });
    // eslint-disable-next-line
  }, []);

  const onDeleteUser = (id) => {
    client.delete("/users/" + id + "/",
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
          'Content-Type': 'application/json',
        }
      })
      .then(function (res) {
        console.log(res)
        NotifySuccess();
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error)
        NotifyError();
      });
  };

  return (
    <>
      <div className="mt-4 container-height" style={{ display: 'block;', margin: 'auto' }}>
        <div className=''>
          <button className='btn btn-primary' onClick={() => navigate("/agregarUsuario")}>Agregar nuevo usuario</button>
          <Table className='mt-4' striped bordered hover variant="dark" style={{ width: '500px', margin: 'auto' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.username}</td>
                  <td>
                    <div>
                      <button className='btn btn-warning' type='button' onClick={() => navigate("/editarUsuario", {
                        state: {
                          id: user.id,
                        },
                      })}>Editar</button>
                      <button className='btn btn-danger' type='button' onClick={() => onDeleteUser(user.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

      </div>

    </>
  );
}

export default Usuarios;