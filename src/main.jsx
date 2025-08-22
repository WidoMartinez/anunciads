// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

// Importamos las páginas existentes y la nueva
import PagoExitoso from "./pages/PagoExitoso.jsx";
import PagoFallido from "./pages/PagoFallido.jsx";
import EcommercePage from "./pages/EcommercePage.jsx"; // <-- IMPORTAMOS LA NUEVA PÁGINA

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				{/* Ruta para la página principal */}
				<Route path="/" element={<App />} />

				{/* NUEVA RUTA para la página de E-commerce */}
				<Route path="/ecommerce" element={<EcommercePage />} />

				{/* Rutas para las páginas de estado del pago */}
				<Route path="/pago-exitoso" element={<PagoExitoso />} />
				<Route path="/pago-fallido" element={<PagoFallido />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
