import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = ({setUserId}) => {
  const role = localStorage.getItem("role")
  const roleAdmin = role == "admin" ? true : false;
  const roleCocinero = role == "cocinero" ? true : false;
  const roleRecepcionista = role == "recepcionista" ? true : false;
  const handleLogout = () => {
    window.localStorage.removeItem('role')
    window.localStorage.removeItem('accessToken')
    setUserId(null)
  }
  return (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            CoffeeTime
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            {roleAdmin ? (<>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list">Dashboard</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/pedidos" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="cart-plus">Pedidos</CDBSidebarMenuItem>
              </NavLink>

            </>)
              :
              (roleRecepcionista && <>
                <NavLink exact to="/index" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="list">Dashboard</CDBSidebarMenuItem>
                </NavLink>
                <NavLink to="/pedidos" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="cart-plus">Pedidos</CDBSidebarMenuItem>
                </NavLink>

              </>)

            }

            {roleAdmin ? (<>
              <NavLink to="/cocina" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="box">Cocina</CDBSidebarMenuItem>
              </NavLink>
            </>)
              :
              (roleCocinero && <>
                <NavLink to="/cocina" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="box">Cocina</CDBSidebarMenuItem>
                </NavLink>
              </>)
            }

            {roleAdmin && <>
              <NavLink to="/agregarProducto" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="plus">Agregar Productos</CDBSidebarMenuItem>
              </NavLink>
            </>}

            {/* <NavLink exact to="/usuarios" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Usuarios
              </CDBSidebarMenuItem>
            </NavLink>           */}

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;