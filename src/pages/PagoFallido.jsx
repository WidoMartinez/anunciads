// src/pages/PagoFallido.jsx
import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const PagoFallido = () => {
	const [searchParams] = useSearchParams();
	const paymentId = searchParams.get("payment_id");
	const status = searchParams.get("status");

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-4">
			<div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg">
				<XCircle className="text-red-500 w-20 h-20 mx-auto mb-6" />
				<h1 className="text-4xl font-bold text-gray-800 mb-4">
					Hubo un problema con tu pago
				</h1>
				<p className="text-gray-600 text-lg mb-8">
					Lamentablemente, no pudimos procesar tu pago. Por favor, intenta
					nuevamente o utiliza otro medio de pago.
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
					to="/#precios"
					className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
				>
					Volver a intentar
				</Link>
			</div>
		</div>
	);
};

export default PagoFallido;
