import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	Mail,
	Phone,
	MapPin,
	MessageCircle,
	Send,
	AlertTriangle,
	CheckCircle,
} from "lucide-react";
import axios from "axios"; // <--- Importamos axios

const ContactSection = () => {
	const [contactFormData, setContactFormData] = useState({
		name: "",
		website: "",
		phone: "",
		email: "",
	});
	// Estado mejorado para manejar el feedback al usuario
	const [formStatus, setFormStatus] = useState({ status: "idle", message: "" }); // idle, sending, success, error

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

	// --- **FUNCIÓN DE ENVÍO MODIFICADA** ---
	const handleContactFormSubmit = async (e) => {
		e.preventDefault();
		setFormStatus({ status: "sending", message: "" });

		// Usamos la variable de entorno de Vite para la URL del API
		const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

		try {
			const response = await axios.post(
				`${apiUrl}/send-email`,
				contactFormData
			);

			if (response.status === 200) {
				setFormStatus({
					status: "success",
					message:
						"¡Mensaje enviado! Nos pondremos en contacto contigo pronto.",
				});
				setContactFormData({ name: "", website: "", phone: "", email: "" }); // Limpiar formulario
				gtag_report_conversion(null, null); // Reportar conversión sin abrir URL
			}
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			setFormStatus({
				status: "error",
				message:
					"Hubo un error. Por favor, intenta de nuevo o contáctanos por WhatsApp.",
			});
		}
	};

	return (
		<section id="contacto" className="py-20 bg-gray-50 dark:bg-gray-800/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Ponte en Contacto
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						¿Tienes una pregunta o estás listo para comenzar? Completa el
						formulario o contáctanos directamente.
					</p>
				</motion.div>
				<div className="grid lg:grid-cols-2 gap-12 items-start">
					{/* Columna de Información de Contacto (sin cambios) */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
								Información de Contacto
							</h3>
							<div className="space-y-4">
								<div className="flex items-center">
									<div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl mr-4">
										<Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<h4 className="font-semibold text-gray-800 dark:text-white">
											Email
										</h4>
										<a
											href="mailto:contacto@anunciads.cl"
											className="text-blue-600 dark:text-blue-400 hover:underline"
										>
											contacto@anunciads.cl
										</a>
									</div>
								</div>
								<div className="flex items-center">
									<div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl mr-4">
										<Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<h4 className="font-semibold text-gray-800 dark:text-white">
											Teléfono
										</h4>
										<a
											href="tel:+56939363916"
											className="text-blue-600 dark:text-blue-400 hover:underline"
										>
											+56 9 3936 3916
										</a>
									</div>
								</div>
								<div className="flex items-center">
									<div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl mr-4">
										<MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<h4 className="font-semibold text-gray-800 dark:text-white">
											Ubicación
										</h4>
										<p className="text-gray-600 dark:text-gray-400">
											Temuco, Chile
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-8 pt-8 border-t border-blue-200 dark:border-gray-700">
							<p className="text-gray-700 dark:text-gray-300 mb-4">
								O si quieres escribirnos directamente, pincha el botón para
								hablar con un experto.
							</p>
							<motion.a
								href="https://api.whatsapp.com/send/?phone=56939363916&text=Hola, me gustaría hablar con un experto."
								onClick={(e) => {
									e.preventDefault();
									gtag_report_conversion(e.currentTarget.href);
								}}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="inline-flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
							>
								<MessageCircle className="mr-2 h-5 w-5" />
								Hablar por WhatsApp
							</motion.a>
						</div>
					</motion.div>

					{/* Columna del Formulario (con cambios) */}
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
							{/* Campos del formulario (sin cambios) */}
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
									disabled={formStatus.status === "sending"}
									className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70"
								>
									{formStatus.status === "sending" ? (
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

							{/* --- **NUEVO: MENSAJES DE FEEDBACK** --- */}
							<div className="h-10 mt-4">
								{formStatus.status === "success" && (
									<div className="flex items-center justify-center text-center text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
										<CheckCircle className="h-5 w-5 mr-2" />
										<span className="text-sm font-medium">
											{formStatus.message}
										</span>
									</div>
								)}
								{formStatus.status === "error" && (
									<div className="flex items-center justify-center text-center text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
										<AlertTriangle className="h-5 w-5 mr-2" />
										<span className="text-sm font-medium">
											{formStatus.message}
										</span>
									</div>
								)}
							</div>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
