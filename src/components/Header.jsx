import React from "react";
import { motion } from "framer-motion";
import { Calculator, Sun, Moon } from "lucide-react";

const Header = ({ toggleTheme, isDarkMode, setIsCalculatorOpen }) => {
	const gtag_report_conversion = (url) => {
		if (typeof window.gtag === "function") {
			window.gtag("event", "conversion", {
				send_to: "AW-980744893/m9_NCPGupb0aEL3109MD",
				event_callback: () => {
					if (url) window.open(url, "_blank");
				},
			});
		} else {
			if (url) window.open(url, "_blank");
		}
		return false;
	};

	return (
		<header className="fixed top-0 w-full bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<div className="text-2xl font-bold text-white">anunciAds</div>
					</div>
					<nav className="hidden md:flex items-center space-x-8">
						<a
							href="#inicio"
							className="text-gray-300 hover:text-white transition-colors"
						>
							Inicio
						</a>
						<a
							href="#servicios"
							className="text-gray-300 hover:text-white transition-colors"
						>
							Servicios
						</a>
						<a
							href="#precios"
							className="text-gray-300 hover:text-white transition-colors"
						>
							Precios
						</a>
						<a
							href="#casos"
							className="text-gray-300 hover:text-white transition-colors"
						>
							Casos de Éxito
						</a>
						<a
							href="#faq"
							className="text-gray-300 hover:text-white transition-colors"
						>
							FAQ
						</a>
						<a
							href="#contacto"
							className="text-gray-300 hover:text-white transition-colors"
						>
							Contacto
						</a>
					</nav>
					<div className="flex items-center gap-2 sm:gap-4">
						<motion.button
							onClick={() => setIsCalculatorOpen(true)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="hidden sm:flex items-center bg-transparent text-white border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
						>
							<Calculator className="mr-2 h-4 w-4" />
							Solicitar Presupuesto
						</motion.button>
						<motion.a
							href="https://api.whatsapp.com/send/?phone=56939363916&text=Hola, me gustaría agendar una consulta gratuita para mi negocio. ¿Podrían ayudarme?"
							onClick={(e) => {
								e.preventDefault();
								gtag_report_conversion(e.currentTarget.href);
							}}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-animated-gradient text-white px-6 py-2 rounded-lg font-semibold transition-transform duration-300"
						>
							Consulta Gratuita
						</motion.a>
						<button
							onClick={toggleTheme}
							className="p-2 rounded-full text-white hover:bg-white/20 transition-colors"
							aria-label="Cambiar tema"
						>
							{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
