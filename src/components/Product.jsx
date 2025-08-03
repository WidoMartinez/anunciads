// src/components/Product.jsx
import React, { useState } from "react";
import { Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const Product = () => {
	const [preferenceId, setPreferenceId] = useState(null);

	// Datos del servicio que quieres vender
	const serviceData = {
		title: "Servicio de Google Ads - Plan Básico",
		price: 50000,
		quantity: 1,
	};

	const handleBuy = async () => {
		try {
			const response = await axios.post(
				"http://localhost:8080/create_preference",
				serviceData
			);
			setPreferenceId(response.data.id);
		} catch (error) {
			console.error("Error al crear la preferencia:", error);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl text-center">
			<h2 className="text-2xl font-bold mb-4">{serviceData.title}</h2>
			<p className="text-lg text-gray-700 mb-6">
				Optimiza tus campañas y alcanza a más clientes.
			</p>
			<p className="text-3xl font-extrabold text-blue-600 mb-6">
				${serviceData.price.toLocaleString("es-CL")} CLP
			</p>

			{!preferenceId ? (
				<button
					onClick={handleBuy}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 w-full"
				>
					Contratar Ahora
				</button>
			) : (
				// El Wallet component renderiza el botón de pago
				<Wallet
					initialization={{ preferenceId: preferenceId }}
					customization={{ texts: { valueProp: "smart_option" } }}
				/>
			)}
		</div>
	);
};

export default Product;
