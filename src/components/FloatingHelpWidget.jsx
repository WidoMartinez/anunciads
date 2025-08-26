import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FileText,
	Calendar,
	MessageCircle,
	CheckCircle,
	X,
	User,
	Mail,
	Phone,
	Tag,
	PenSquare,
} from "lucide-react";
import axios from "axios";

const gtag_form_submission = () => {
	if (typeof window.gtag === "function") {
		window.gtag("event", "conversion", {
			send_to: "AW-980744893/w6nVCI61hb4aEL3109MD",
		});
	}
};

const LeadCaptureForm = ({ type = "contact", onClose }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		interest: "",
		message: "",
	});
	const [formStatus, setFormStatus] = useState("idle"); // idle, sending, success, error

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormStatus("sending");

		const config = getFormConfig();
		const apiUrl = "https://anunciads.onrender.com";

		const submissionData = {
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			website: "No especificado (Widget)",
			source: `Widget Flotante (${config.title})`, // 2. Añadimos la fuente para un asunto de correo claro
			message: `
				Interés Principal: ${formData.interest || "No especificado"}
				Mensaje Adicional: ${formData.message || "Ninguno"}
			`,
		};

		try {
			await axios.post(`${apiUrl}/send-email`, submissionData);
			gtag_form_submission();
			setFormStatus("success");
			setTimeout(() => {
				onClose && onClose();
			}, 3000);
		} catch (error) {
			console.error("Error al enviar formulario del widget:", error);
			setFormStatus("error");
		}
	};

	const getFormConfig = () => {
		switch (type) {
			case "quote":
				return {
					title: "Solicitar Cotización",
					description:
						"Detalla tu proyecto y te enviaremos una propuesta a medida.",
					buttonText: "Enviar Solicitud",
					icon: <FileText className="w-5 h-5 text-blue-600" />,
					fields: ["name", "email", "phone", "interest", "message"],
				};
			case "meeting":
				return {
					title: "Agendar una Reunión",
					description:
						"Conversemos 15 min. sobre cómo podemos potenciar tu negocio.",
					buttonText: "Enviar Solicitud",
					icon: <Calendar className="w-5 h-5 text-blue-600" />,
					fields: ["name", "email", "phone", "interest"],
				};
			default:
				return {
					title: "Hablar con un Especialista",
					description: "Resuelve tus dudas sobre Google Ads con un experto.",
					buttonText: "Enviar Mensaje",
					icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
					fields: ["name", "email", "phone", "message"],
				};
		}
	};

	const config = getFormConfig();

	const FormInput = ({ icon: Icon, children }) => (
		<div className="relative">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<Icon className="h-5 w-5 text-slate-400" />
			</div>
			{children}
		</div>
	);

	if (formStatus === "success") {
		return (
			<div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl border dark:border-slate-700 p-8 text-center">
				<CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
					¡Enviado!
				</h3>
				<p className="text-slate-500 dark:text-slate-400 mt-2">
					Hemos recibido tu solicitud. Nos pondremos en contacto contigo a la
					brevedad.
				</p>
			</div>
		);
	}

	return (
		<div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl border dark:border-slate-700">
			<header className="relative p-5 border-b dark:border-slate-700">
				{onClose && (
					<button
						className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
						onClick={onClose}
					>
						<X className="w-5 h-5" />
					</button>
				)}
				<div className="flex items-center space-x-4">
					<div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
						{config.icon}
					</div>
					<div>
						<h3 className="text-lg font-bold text-gray-900 dark:text-white">
							{config.title}
						</h3>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							{config.description}
						</p>
					</div>
				</div>
			</header>

			<div className="p-6">
				<form onSubmit={handleSubmit} className="space-y-4">
					{config.fields.includes("name") && (
						<FormInput icon={User}>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								required
								className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-600"
								placeholder="Nombre Completo"
								disabled={formStatus === "sending"}
							/>
						</FormInput>
					)}
					{config.fields.includes("email") && (
						<FormInput icon={Mail}>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								required
								className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-600"
								placeholder="Email"
								disabled={formStatus === "sending"}
							/>
						</FormInput>
					)}
					{config.fields.includes("phone") && (
						<FormInput icon={Phone}>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								required
								className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-600"
								placeholder="Teléfono"
								disabled={formStatus === "sending"}
							/>
						</FormInput>
					)}
					{config.fields.includes("interest") && (
						<FormInput icon={Tag}>
							<select
								name="interest"
								value={formData.interest}
								onChange={handleInputChange}
								className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-600"
								disabled={formStatus === "sending"}
							>
								<option value="">Interés principal...</option>
								<option value="Campañas Google Ads">Campañas Google Ads</option>
								<option value="Creación de Landing Page">
									Creación de Landing Page
								</option>
								<option value="Analítica y Reportes">
									Analítica y Reportes
								</option>
								<option value="Consulta General">Consulta General</option>
							</select>
						</FormInput>
					)}
					{/* --- 1. CORRECCIÓN DEL TEXTAREA --- */}
					{config.fields.includes("message") && (
						<div className="relative">
							<div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
								<PenSquare className="h-5 w-5 text-slate-400" />
							</div>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleInputChange}
								rows={3}
								className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-600"
								placeholder="Cuéntanos más sobre tu proyecto..."
								disabled={formStatus === "sending"}
							/>
						</div>
					)}
					<button
						type="submit"
						className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md disabled:opacity-50 transition-colors"
						disabled={formStatus === "sending"}
					>
						{formStatus === "sending" ? (
							<>
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								<span>Enviando...</span>
							</>
						) : (
							config.buttonText
						)}
					</button>
					{formStatus === "error" && (
						<p className="text-sm text-red-500 text-center mt-2">
							Hubo un error al enviar. Por favor, inténtalo de nuevo.
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

// ... (El resto del componente FloatingHelpWidget se mantiene igual)
const LeadCaptureModal = ({ isOpen, onClose, type }) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 bg-black/60 z-[101] flex items-center justify-center p-4">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className="w-full max-w-md"
					>
						<LeadCaptureForm type={type} onClose={onClose} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const FloatingHelpWidget = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("advisor");

	return (
		<div className="hidden lg:block">
			<div className="fixed bottom-6 left-6 z-40">
				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ opacity: 0, y: 10, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 10, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className="mb-4 w-64 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-2xl border dark:border-slate-700"
						>
							<h4 className="font-bold text-gray-800 dark:text-white mb-2 px-2">
								¿Necesitas Ayuda?
							</h4>
							<div className="space-y-1">
								<button
									className="w-full flex items-center gap-3 text-sm p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
									onClick={() => {
										setModalType("quote");
										setShowModal(true);
										setIsExpanded(false);
									}}
								>
									<FileText className="w-5 h-5 text-blue-500" /> Solicitar
									Cotización
								</button>
								<button
									className="w-full flex items-center gap-3 text-sm p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
									onClick={() => {
										setModalType("meeting");
										setShowModal(true);
										setIsExpanded(false);
									}}
								>
									<Calendar className="w-5 h-5 text-blue-500" /> Agendar Reunión
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				<motion.button
					onClick={() => setIsExpanded(!isExpanded)}
					className="bg-blue-600 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					aria-label="Toggle Help Widget"
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={isExpanded ? "x" : "help"}
							initial={{ rotate: -90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: 90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							{isExpanded ? (
								<X className="w-7 h-7" />
							) : (
								<MessageCircle className="w-7 h-7" />
							)}
						</motion.div>
					</AnimatePresence>
				</motion.button>
			</div>

			<LeadCaptureModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				type={modalType}
			/>
		</div>
	);
};

export default FloatingHelpWidget;
