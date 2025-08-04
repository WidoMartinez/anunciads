// src/pages/PagoExitoso.jsx
import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PagoExitoso = () => {
	const [searchParams] = useSearchParams();
	const paymentId = searchParams.get("payment_id");
	const status = searchParams.get("status");

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-4">
			<div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg">
				<CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-6 animate-pulse" />
				<h1 className="text-4xl font-bold text-gray-800 mb-4">
					¡Pago Aprobado!
				</h1>
				<p className="text-gray-600 text-lg mb-8">
					Muchas gracias por tu compra. Hemos recibido tu pago correctamente y
					pronto nos pondremos en contacto contigo.
				</p>
				<div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-700">
					<p>
						<strong>Estado:</strong>{" "}
						<span className="capitalize">{status}</span>
					</p>
					<p>
						<strong>ID de Pago:</strong> {paymentId}
					</p>
				</div>
				<Link
					to="/"
					className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
				>
					Volver a la página principal
				</Link>
			</div>
		</div>
	);
};

export default PagoExitoso;
