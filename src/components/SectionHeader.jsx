import React from "react";
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import NotifyError from "./NotifyError";
import NotifySuccess from "./NotifySuccess";
import user from '../assets/user.png'


import '../styles/sectionHeader.css'
import { convertGs } from "../utils/convertGs";

const SectionHeader = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {

	const client = axios.create({
		baseURL: "http://127.0.0.1:8000"
	});

	const [active, setActive] = useState(false);
	const [mesa, setMesa] = useState(1);
	const [cliente, setCliente] = useState('');

	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.id !== product.id
		);

		setTotal(total - product.precio * product.cantidad);
		setCountProducts(countProducts - product.cantidad);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
		setMesa(1);
	};

	const onAddPedidos = () => {

		let totalPedidos = total
		let products = []

		allProducts.forEach(item => {
			let id = item.id
			let p = { id, item }
			products.push(p);
		});


		client.post("/pedidos/", {
			mesa: mesa,
			total: totalPedidos,
			cliente: cliente,
			lista_productos: products
		},
			{
				headers: {
					Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
					'Content-Type': 'application/json',
				}
			})
			.then(function (res) {
				onCleanCart();
				console.log(res)
				NotifySuccess()
			})
			.catch(function (error) {
				console.log(error)
				NotifyError()
			});
	};

	return (
		<>
			<div className="top-section">
				<div className="user-info">
					<div className="user-img">
						<img alt="user" src={user} />
					</div>
					<p className="user-name">Bienvenido</p>
				</div>

				<div className='container-icon'>
					<div
						className='container-cart-icon'
						onClick={() => setActive(!active)}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='icon-cart'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
							/>
						</svg>
						<div className='count-products'>
							<span id='contador-productos'>{countProducts}</span>
						</div>
					</div>

					<div
						className={`container-cart-products ${active ? '' : 'hidden-cart'
							}`}
					>
						{allProducts.length ? (
							<>
								<label style={{ marginTop: '8px' }}>
									Mesa:
									<input style={{ marginLeft: '5px' }} type="number" value={mesa} onChange={(e) => setMesa(e.target.value)} />
								</label>

								<label style={{ marginTop: '5px' }}>
									Cliente:
									<input style={{ marginLeft: '5px' }} type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
								</label>
								<div className='row-product'>
									{allProducts.map(product => (
										<div className='cart-product' key={product.id}>
											<div className='info-cart-product'>
												<span className='cantidad-producto-carrito' style={{marginRight: '3px'}}>
													{product.cantidad} 
												</span>
												<p className='titulo-producto-carrito'>
													{product.nombre}
												</p>
												<span className='precio-producto-carrito'>
													{convertGs(product.precio)}
												</span>
											</div>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='icon-close'
												onClick={() => onDeleteProduct(product)}
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</div>
									))}
								</div>

								<div className='cart-total'>
									<h3>Total:</h3>
									<span className='total-pagar'>{convertGs(total)}</span>
								</div>
								<button className='btn-add' onClick={onAddPedidos}>
									Agregar pedido
								</button>
								<button className='btn-clear-all' onClick={onCleanCart}>
									Vaciar Carrito
								</button>


							</>
						) : (
							<p className='cart-empty'>El carrito está vacío</p>
						)}
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

export default SectionHeader;
