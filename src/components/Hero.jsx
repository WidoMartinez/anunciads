import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import GradientText from "./GradientText";
import axios from "axios";

const Hero = () => {
	const [contactFormData, setContactFormData] = useState({
		name: "",
		website: "",
		phone: "",
		email: "",
	});
	const [formStatus, setFormStatus] = useState("idle");

	const gtag_report_conversion = (url, callback) => {
		if (typeof window.gtag === "function") {
			window.gtag("event", "conversion", {
				send_to: "AW-980744893/m9_NCPGupb0aEL3109MD",
				event_callback: () => {
					if (callback) callback();
					if (url) window.open(url, "_blank");
				},
			});
		} else {
			if (callback) callback();
			if (url) window.open(url, "_blank");
		}
		return false;
	};

	const handleContactFormChange = (e) => {
		const { name, value } = e.target;
		setContactFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleContactFormSubmit = async (e) => {
		e.preventDefault();
		setFormStatus("sending");

		// --- CORRECCIÓN ---
		// Aseguramos que la URL de la API se obtenga de las variables de entorno de Vite.
		const apiUrl = import.meta.env.VITE_API_URL;

		try {
			const response = await axios.post(
				`${apiUrl}/send-email`,
				contactFormData
			);

			if (response.status === 200) {
				setFormStatus("success");
				setContactFormData({ name: "", website: "", phone: "", email: "" });
				gtag_report_conversion(null, null); // Reporta la conversión
			}
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			setFormStatus("error");
		}
	};

	return (
		<section
			id="inicio"
			className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900/95 dark:to-gray-900"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className="flex items-center space-x-2 mb-4">
							<div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
								✓ Certificados por Google
							</div>
						</div>
						<h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
							Impulsa tu Negocio con <GradientText>Google Ads</GradientText>{" "}
							Profesional
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
							Campañas optimizadas que generan resultados reales desde el primer
							día. Te ayudamos a configurar, lanzar y optimizar tu presencia
							digital para atraer clientes calificados.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<motion.a
								href="https://api.whatsapp.com/send/?phone=56939363916&text=Hola, quiero comenzar con Google Ads para mi negocio. ¿Podrían ayudarme?"
								onClick={(e) => {
									e.preventDefault();
									gtag_report_conversion(e.currentTarget.href);
								}}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
							>
								Comenzar Ahora
								<ArrowRight className="ml-2 h-5 w-5" />
							</motion.a>
							<motion.a
								href="#casos"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-600/10 dark:text-blue-400 dark:border-blue-400 transition-colors text-center"
							>
								Ver Casos de Éxito
							</motion.a>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-transparent dark:border-gray-700"
					>
						<h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
							Envíanos un Mensaje
						</h3>
						<form onSubmit={handleContactFormSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
								>
									Nombre
								</label>
								<input
									type="text"
									name="name"
									id="name"
									required
									value={contactFormData.name}
									onChange={handleContactFormChange}
									className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Tu nombre completo"
								/>
							</div>
							<div>
								<label
									htmlFor="website"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
								>
									Página Web
								</label>
								<input
									type="url"
									name="website"
									id="website"
									required
									value={contactFormData.website}
									onChange={handleContactFormChange}
									className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="https://www.tuempresa.cl"
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="phone"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
									>
										Fono de Contacto
									</label>
									<input
										type="tel"
										name="phone"
										id="phone"
										required
										value={contactFormData.phone}
										onChange={handleContactFormChange}
										className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="+56 9 3936 3916"
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
									>
										Correo Electrónico
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										value={contactFormData.email}
										onChange={handleContactFormChange}
										className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="tu@correo.com"
									/>
								</div>
							</div>
							<div>
								<motion.button
									type="submit"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									disabled={formStatus === "sending"}
									className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70"
								>
									{formStatus === "sending" ? (
										<>
											<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
											<span>Enviando...</span>
										</>
									) : (
										<>
											Enviar Mensaje
											<Send className="ml-2 h-5 w-5" />
										</>
									)}
								</motion.button>
							</div>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
