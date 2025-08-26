import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	Mail,
	Phone,
	MapPin,
	MessageCircle,
	Send,
	User,
	Globe,
	CheckCircle,
} from "lucide-react"; // Importamos nuevos iconos
import axios from "axios";
import GradientText from "./GradientText";

// Componente para el input con icono
const FormInput = ({ icon: Icon, children }) => (
	<div className="relative">
		<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
			<Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
		</div>
		{children}
	</div>
);

const ContactSection = () => {
	const [contactFormData, setContactFormData] = useState({
		name: "",
		website: "",
		phone: "",
		email: "",
	});
	const [formStatus, setFormStatus] = useState("idle"); // idle, sending, success, error

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

	const gtag_form_submission = () => {
		if (typeof window.gtag === "function") {
			window.gtag("event", "conversion", {
				send_to: "AW-980744893/w6nVCI61hb4aEL3109MD",
			});
		}
	};

	const handleContactFormChange = (e) => {
		const { name, value } = e.target;
		setContactFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleContactFormSubmit = async (e) => {
		e.preventDefault();
		setFormStatus("sending");

		const apiUrl = "https://anunciads.onrender.com";

		try {
			const response = await axios.post(
				`${apiUrl}/send-email`,
				contactFormData
			);

			if (response.status === 200) {
				setFormStatus("success");
				setContactFormData({ name: "", website: "", phone: "", email: "" }); // Limpiamos el formulario
				gtag_form_submission();
			}
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			setFormStatus("error");
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
					<h2 className="text-4xl font-bold mb-4">
						<GradientText>Ponte en Contacto</GradientText>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						¿Tienes una pregunta o estás listo para comenzar? Completa el
						formulario o contáctanos directamente.
					</p>
				</motion.div>
				<div className="grid lg:grid-cols-2 gap-12 items-start">
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
											Padre Las Casas, Araucanía, Chile
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

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-transparent dark:border-gray-700"
					>
						<h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
							Envíanos un Mensaje
						</h3>
						{formStatus === "success" ? (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className="flex flex-col items-center justify-center h-full min-h-[300px] text-center"
							>
								<CheckCircle className="h-20 w-20 text-green-500 mb-4" />
								<p className="text-xl font-semibold text-gray-800 dark:text-white">
									¡Mensaje enviado con éxito!
								</p>
								<p className="text-gray-600 dark:text-gray-400 mt-2">
									Nos pondremos en contacto contigo a la brevedad.
								</p>
							</motion.div>
						) : (
							<form onSubmit={handleContactFormSubmit} className="space-y-6">
								<FormInput icon={User}>
									<input
										type="text"
										name="name"
										id="name"
										required
										value={contactFormData.name}
										onChange={handleContactFormChange}
										className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="Tu nombre completo"
										disabled={formStatus === "sending"}
									/>
								</FormInput>

								<FormInput icon={Globe}>
									<input
										type="url"
										name="website"
										id="website"
										required
										value={contactFormData.website}
										onChange={handleContactFormChange}
										className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="https://www.tuempresa.cl"
										disabled={formStatus === "sending"}
									/>
								</FormInput>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<FormInput icon={Phone}>
										<input
											type="tel"
											name="phone"
											id="phone"
											required
											value={contactFormData.phone}
											onChange={handleContactFormChange}
											className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
											placeholder="+56 9 3936 3916"
											disabled={formStatus === "sending"}
										/>
									</FormInput>
									<FormInput icon={Mail}>
										<input
											type="email"
											id="email"
											name="email"
											required
											value={contactFormData.email}
											onChange={handleContactFormChange}
											className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
											placeholder="tu@correo.cl"
											disabled={formStatus === "sending"}
										/>
									</FormInput>
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
								{formStatus === "error" && (
									<p className="text-sm text-red-500 text-center mt-2">
										Hubo un error al enviar tu mensaje. Por favor, intenta de
										nuevo.
									</p>
								)}
							</form>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
