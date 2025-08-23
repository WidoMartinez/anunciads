import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	MessageCircle,
	Send,
	X,
	Bot,
	BarChart3,
	DollarSign,
	FileText,
	Phone,
} from "lucide-react";

const MI_NUMERO_WHATSAPP = "56939363916";

const initialMessage = {
	id: 1,
	type: "bot",
	content:
		"¡Hola! Soy el asistente virtual de anunciAds. ¿En qué puedo ayudarte hoy?",
	timestamp: new Date(),
	options: [
		{
			id: "servicios",
			text: "Nuestros Servicios",
			icon: <BarChart3 className="w-4 h-4" />,
		},
		{
			id: "precios",
			text: "Ver Planes y Precios",
			icon: <DollarSign className="w-4 h-4" />,
		},
		{
			id: "cotizacion",
			text: "Quiero una cotización",
			icon: <FileText className="w-4 h-4" />,
		},
		{
			id: "contacto",
			text: "Hablar con un asesor",
			icon: <Phone className="w-4 h-4" />,
		},
	],
};

const Chatbot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([initialMessage]);
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [showLeadForm, setShowLeadForm] = useState(false);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		if (!isOpen) {
			const timer = setTimeout(() => {
				setMessages([initialMessage]);
				setShowLeadForm(false);
				setInputValue("");
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isTyping]);

	const predefinedResponses = {
		servicios: {
			content:
				"Ofrecemos soluciones integrales de marketing digital. Nuestra especialidad es potenciar negocios con Google Ads.",
			options: [
				{ id: "google_ads", text: "Más sobre Google Ads" },
				{ id: "landing_pages", text: "Creación de Landing Pages" },
				{ id: "analitica", text: "Análisis y Reportes" },
				{ id: "contacto", text: "Contactar a un experto" },
			],
		},
		precios: {
			content:
				"Tenemos planes para cada tipo de negocio, ¡y ahora con 50% de descuento los primeros 2 meses! Puedes ver el detalle en nuestra sección de precios.",
			options: [
				{ id: "ver_precios_pagina", text: "Llévame a la sección de Precios" },
				{ id: "cotizacion", text: "Necesito un plan a medida" },
				{ id: "contacto", text: "Hablar con un asesor" },
			],
		},
		cotizacion: {
			content:
				"¡Excelente! Para preparar una cotización a tu medida, por favor déjame tus datos de contacto.",
			requiresLead: true,
		},
		contacto: {
			content:
				"Claro, te pondremos en contacto con un especialista. Por favor, completa el formulario para que puedan comunicarse contigo.",
			requiresLead: true,
		},
		google_ads: {
			content:
				"Creamos y optimizamos campañas en Google Ads para maximizar tu ROI, generando clientes potenciales y ventas desde el primer día.",
			options: [
				{ id: "cotizacion", text: "Solicitar cotización" },
				{ id: "precios", text: "Ver planes" },
			],
		},
	};

	const addMessage = (messageData) => {
		if (!messageData.requiresLead) {
			setShowLeadForm(false);
		}
		setMessages((prev) => [...prev, messageData]);
	};

	const simulateTyping = async (duration = 1000) => {
		setIsTyping(true);
		await new Promise((resolve) => setTimeout(resolve, duration));
		setIsTyping(false);
	};

	const handleOptionClick = async (optionId, optionText) => {
		if (optionId === "ver_precios_pagina") {
			document
				.getElementById("precios")
				?.scrollIntoView({ behavior: "smooth" });
			setIsOpen(false);
			return;
		}

		setMessages((prev) => {
			const updatedMessages = prev.map((msg, index) => {
				if (index === prev.length - 1 && msg.type === "bot") {
					return { ...msg, options: null };
				}
				return msg;
			});
			return [
				...updatedMessages,
				{
					id: Date.now(),
					type: "user",
					content: optionText,
					timestamp: new Date(),
				},
			];
		});

		await simulateTyping();
		const response = predefinedResponses[optionId];
		if (response) {
			if (response.requiresLead) {
				setShowLeadForm(true);
			}
			addMessage({
				id: Date.now(),
				type: "bot",
				content: response.content,
				options: response.options,
				requiresLead: response.requiresLead,
			});
		} else {
			addMessage({
				id: Date.now(),
				type: "bot",
				content:
					"Gracias por tu interés. Para darte información detallada, lo mejor es que hables con un asesor.",
				options: initialMessage.options,
			});
		}
	};

	const handleSendMessage = async () => {
		if (!inputValue.trim()) return;
		const userMessage = inputValue;
		setInputValue("");
		addMessage({
			id: Date.now(),
			type: "user",
			content: userMessage,
			timestamp: new Date(),
		});

		await simulateTyping();

		const lowerCaseMessage = userMessage.toLowerCase();
		let responseKey = null;

		if (
			lowerCaseMessage.includes("precio") ||
			lowerCaseMessage.includes("plan")
		) {
			responseKey = "precios";
		} else if (
			lowerCaseMessage.includes("servicio") ||
			lowerCaseMessage.includes("hacen")
		) {
			responseKey = "servicios";
		} else if (
			lowerCaseMessage.includes("contacto") ||
			lowerCaseMessage.includes("hablar") ||
			lowerCaseMessage.includes("asesor")
		) {
			responseKey = "contacto";
		}

		if (responseKey) {
			const response = predefinedResponses[responseKey];
			if (response.requiresLead) setShowLeadForm(true);
			addMessage({
				id: Date.now(),
				type: "bot",
				content: response.content,
				options: response.options,
				requiresLead: response.requiresLead,
			});
		} else {
			addMessage({
				id: Date.now(),
				type: "bot",
				content:
					"Lo siento, no entendí tu pregunta. Aquí tienes las opciones principales para ayudarte:",
				options: initialMessage.options,
			});
		}
	};

	const handleLeadSubmit = async (leadData) => {
		setShowLeadForm(false);

		const message = `
¡Nuevo Lead desde el Chatbot de anunciAds!

*Nombre:* ${leadData.name}
*Email:* ${leadData.email}
*Teléfono:* ${leadData.phone}
    `.trim();

		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://api.whatsapp.com/send/?phone=${MI_NUMERO_WHATSAPP}&text=${encodedMessage}`;

		window.open(whatsappUrl, "_blank");

		await simulateTyping(500);

		addMessage({
			id: Date.now(),
			type: "bot",
			content: `¡Perfecto, ${leadData.name}! He abierto WhatsApp para que nos envíes tus datos. Mientras, ¿puedo ayudarte en algo más?`,
			options: initialMessage.options,
		});
	};

	const LeadForm = () => {
		const [formData, setFormData] = useState({
			name: "",
			email: "",
			phone: "",
		});
		const handleSubmit = (e) => {
			e.preventDefault();
			handleLeadSubmit(formData);
		};
		return (
			<div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
				<h4 className="font-semibold mb-3 text-gray-800 dark:text-white text-sm">
					Información de Contacto
				</h4>
				<form onSubmit={handleSubmit} className="space-y-2">
					<input
						type="text"
						placeholder="Nombre completo"
						value={formData.name}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, name: e.target.value }))
						}
						className="w-full px-3 py-1.5 border rounded-md text-xs bg-white dark:bg-gray-800 dark:border-gray-700"
						required
					/>
					<input
						type="email"
						placeholder="Email"
						value={formData.email}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, email: e.target.value }))
						}
						className="w-full px-3 py-1.5 border rounded-md text-xs bg-white dark:bg-gray-800 dark:border-gray-700"
						required
					/>
					<input
						type="tel"
						placeholder="Teléfono"
						value={formData.phone}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, phone: e.target.value }))
						}
						className="w-full px-3 py-1.5 border rounded-md text-xs bg-white dark:bg-gray-800 dark:border-gray-700"
						required
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md"
					>
						Enviar por WhatsApp
					</button>
				</form>
			</div>
		);
	};

	return (
		// --- DIV ENVOLVENTE CON CLASES RESPONSIVAS ---
		<div className="hidden lg:block">
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
				aria-label="Toggle Chat"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={isOpen ? "x" : "message"}
						initial={{ rotate: -90, opacity: 0 }}
						animate={{ rotate: 0, opacity: 1 }}
						exit={{ rotate: 90, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{isOpen ? (
							<X className="w-7 h-7" />
						) : (
							<MessageCircle className="w-7 h-7" />
						)}
					</motion.div>
				</AnimatePresence>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="fixed bottom-28 right-6 z-50 w-72 h-[27rem] shadow-xl flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl"
					>
						<header className="bg-blue-600 text-white rounded-t-2xl p-4 flex-shrink-0">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<Bot className="w-6 h-6" />
									<div>
										<h3 className="text-base font-bold">Asistente anunciAds</h3>
										<div className="flex items-center space-x-1.5">
											<div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
											<span className="text-xs text-blue-100">En línea</span>
										</div>
									</div>
								</div>
								<button
									onClick={() => setIsOpen(false)}
									className="text-white hover:bg-blue-700 p-1 rounded-full"
								>
									<X className="w-5 h-5" />
								</button>
							</div>
						</header>

						<div className="flex-1 overflow-y-auto p-3 space-y-3">
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex items-start gap-2 ${
										message.type === "user" ? "justify-end" : "justify-start"
									}`}
								>
									{message.type === "bot" && (
										<Bot className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
									)}
									<div
										className={`w-auto max-w-xs p-2.5 rounded-xl ${
											message.type === "user"
												? "bg-blue-600 text-white rounded-br-none"
												: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-bl-none"
										}`}
									>
										<p className="text-sm">{message.content}</p>
										{message.options && !showLeadForm && (
											<div className="mt-2.5 space-y-1.5">
												{message.options.map((option) => (
													<button
														key={option.id}
														className="w-full text-left justify-start text-xs h-auto py-1.5 px-3 flex items-center gap-2 bg-white dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-50 border rounded-lg"
														onClick={() =>
															handleOptionClick(option.id, option.text)
														}
													>
														{option.icon && (
															<span className="text-blue-500">
																{option.icon}
															</span>
														)}
														<span className="flex-1 text-gray-700 dark:text-gray-200">
															{option.text}
														</span>
													</button>
												))}
											</div>
										)}
										{message.requiresLead && showLeadForm && (
											<div className="mt-3">
												{" "}
												<LeadForm />{" "}
											</div>
										)}
									</div>
								</div>
							))}
							{isTyping && (
								<div className="flex items-start gap-2 justify-start">
									<Bot className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
									<div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl rounded-bl-none">
										<div className="flex space-x-1">
											<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
											<div
												className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
												style={{ animationDelay: "0.1s" }}
											></div>
											<div
												className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
												style={{ animationDelay: "0.2s" }}
											></div>
										</div>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						<div className="border-t p-2 bg-white dark:bg-gray-800 rounded-b-2xl flex-shrink-0">
							<form
								className="flex space-x-2"
								onSubmit={(e) => {
									e.preventDefault();
									handleSendMessage();
								}}
							>
								<input
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
									placeholder="Escribe tu mensaje..."
									className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 dark:border-gray-600"
								/>
								<button
									type="submit"
									className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex-shrink-0"
								>
									<Send className="w-5 h-5" />
								</button>
							</form>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Chatbot;
