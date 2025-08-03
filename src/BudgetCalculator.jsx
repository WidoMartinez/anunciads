import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowLeft,
	ArrowRight,
	Send,
	DollarSign,
	Users,
	Target,
	CheckCircle,
	Mail,
	Phone,
	AlertTriangle,
} from "lucide-react";

const MI_NUMERO_WHATSAPP = "56939363916";

const questions = [
	{
		id: "name",
		label: "Para comenzar, ¿cuál es tu nombre?",
		placeholder: "Ej: Juan Pérez",
		type: "text",
		icon: Users,
	},
	{
		id: "email",
		label: "Perfecto, ¿cuál es tu correo electrónico?",
		placeholder: "tu@correo.com",
		type: "email",
		icon: Mail,
	},
	{
		id: "phone",
		label: "Y tu teléfono o WhatsApp para contactarte:",
		placeholder: "+56 9 1234 5678",
		type: "tel",
		icon: Phone,
	},
	{
		id: "website",
		label: "¿Ya tienes una página web?",
		type: "website-choice",
		icon: Target,
	},
	{
		id: "monthlyBudget",
		label: "¿Qué presupuesto mensual tienes en mente para Google Ads?",
		type: "radio",
		icon: DollarSign,
		options: [
			"Menos de $100.000 CLP",
			"Entre $100.000 y $250.000 CLP",
			"Entre $250.000 y $500.000 CLP",
			"Más de $500.000 CLP",
		],
	},
	{
		id: "goals",
		label: "Finalmente, ¿cuáles son tus principales objetivos?",
		type: "multiple-choice",
		options: [
			"Aumentar las ventas online",
			"Generar más clientes potenciales (leads)",
			"Mejorar el reconocimiento de mi marca",
			"Atraer tráfico a mi sitio web",
		],
		icon: CheckCircle,
	},
];

const BudgetCalculator = ({ onClose }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		website: "",
		hasWebsite: "",
		monthlyBudget: "",
		goals: [],
	});
	const [currentStep, setCurrentStep] = useState(0);
	const [error, setError] = useState("");
	// Nuevo estado para manejar la vista de éxito
	const [isSubmitted, setIsSubmitted] = useState(false);

	// Efecto para cerrar el modal automáticamente después de mostrar el mensaje de éxito
	useEffect(() => {
		if (isSubmitted) {
			const timer = setTimeout(() => {
				if (onClose) {
					onClose();
				}
			}, 3500); // Cierra el modal después de 3.5 segundos

			return () => clearTimeout(timer);
		}
	}, [isSubmitted, onClose]);

	const handleNext = () => {
		const currentFieldId = questions[currentStep].id;
		if (currentFieldId === "website") {
			if (!formData.hasWebsite) {
				setError("Por favor, selecciona una opción.");
				return;
			}
			if (formData.hasWebsite === "yes" && !formData.website) {
				setError("Por favor, ingresa la URL de tu sitio web.");
				return;
			}
		} else {
			if (!formData[currentFieldId] || formData[currentFieldId].length === 0) {
				setError("Por favor, completa este campo para continuar.");
				return;
			}
		}
		setError("");
		if (currentStep < questions.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		setError("");
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleChange = (e) => {
		setError("");
		const { id, value, type, checked, name } = e.target;
		if (name === "hasWebsite") {
			setFormData((prev) => ({
				...prev,
				hasWebsite: value,
				website: value === "no" ? "No tiene" : "",
			}));
		} else if (type === "checkbox") {
			setFormData((prev) => ({
				...prev,
				goals: checked
					? [...prev.goals, value]
					: prev.goals.filter((goal) => goal !== value),
			}));
		} else if (type === "radio") {
			setFormData((prev) => ({ ...prev, monthlyBudget: value }));
		} else {
			setFormData((prev) => ({ ...prev, [id]: value }));
		}
	};

	const handleSubmit = () => {
		if (formData.goals.length === 0) {
			setError("Por favor, selecciona al menos un objetivo.");
			return;
		}
		setError("");
		const websiteInfo =
			formData.hasWebsite === "yes"
				? formData.website
				: "No tiene, posible desarrollo.";
		const goalsString = formData.goals.join(", ");

		const whatsappMessage = `
¡Hola! Quiero solicitar un presupuesto con los siguientes datos:
*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone}
*Página Web:* ${websiteInfo}
*Presupuesto Mensual:* ${formData.monthlyBudget}
*Objetivos:* ${goalsString}
        `.trim();

		const encodedMessage = encodeURIComponent(whatsappMessage);
		const whatsappUrl = `https://api.whatsapp.com/send/?phone=${MI_NUMERO_WHATSAPP}&text=${encodedMessage}`;
		window.open(whatsappUrl, "_blank");

		// Cambia el estado para mostrar el mensaje de éxito
		setIsSubmitted(true);
	};

	const currentQuestion = questions[currentStep];
	const variants = {
		enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
		center: { zIndex: 1, x: 0, opacity: 1 },
		exit: (direction) => ({
			zIndex: 0,
			x: direction < 0 ? 300 : -300,
			opacity: 0,
		}),
	};

	// Si el formulario fue enviado, muestra el mensaje de éxito
	if (isSubmitted) {
		return (
			<div className="p-4 md:p-8 w-full h-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
					<h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
						¡Datos Enviados!
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
						Gracias por completar el formulario. Pronto nos comunicaremos
						contigo.
					</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-8 w-full bg-gray-50 dark:bg-gray-900">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 dark:text-white">
					Calcula tu Presupuesto
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					Responde estas breves preguntas para obtener una cotización a tu
					medida.
				</p>
			</div>
			<div className="relative h-[350px] overflow-hidden">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentStep}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
						className="absolute w-full"
					>
						<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 min-h-[280px]">
							<div className="flex items-start space-x-4">
								<div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full flex-shrink-0">
									<currentQuestion.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
								</div>
								<div className="w-full">
									<label className="block text-xl font-semibold text-gray-800 dark:text-white mb-4">
										{currentQuestion.label}
									</label>
									{currentQuestion.type === "text" ||
									currentQuestion.type === "email" ||
									currentQuestion.type === "tel" ||
									currentQuestion.type === "url" ? (
										<input
											type={currentQuestion.type}
											id={currentQuestion.id}
											name={currentQuestion.id}
											value={formData[currentQuestion.id]}
											onChange={handleChange}
											placeholder={currentQuestion.placeholder}
											className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
											autoFocus
											required
										/>
									) : currentQuestion.type === "website-choice" ? (
										<div className="space-y-4">
											<div className="space-y-3">
												<label
													className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 cursor-pointer border-2 ${
														formData.hasWebsite === "yes"
															? "bg-blue-50 dark:bg-blue-900/50 border-blue-500 dark:border-blue-500"
															: "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
													}`}
												>
													<input
														type="radio"
														name="hasWebsite"
														value="yes"
														checked={formData.hasWebsite === "yes"}
														onChange={handleChange}
														className="h-5 w-5 text-blue-600 focus:ring-blue-500"
													/>
													<span className="text-gray-800 dark:text-gray-200 font-medium">
														Sí, ya tengo una
													</span>
												</label>
												<label
													className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 cursor-pointer border-2 ${
														formData.hasWebsite === "no"
															? "bg-blue-50 dark:bg-blue-900/50 border-blue-500 dark:border-blue-500"
															: "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
													}`}
												>
													<input
														type="radio"
														name="hasWebsite"
														value="no"
														checked={formData.hasWebsite === "no"}
														onChange={handleChange}
														className="h-5 w-5 text-blue-600 focus:ring-blue-500"
													/>
													<span className="text-gray-800 dark:text-gray-200 font-medium">
														No, aún no tengo
													</span>
												</label>
											</div>
											<AnimatePresence>
												{formData.hasWebsite === "yes" && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: "auto" }}
														exit={{ opacity: 0, height: 0 }}
														transition={{ duration: 0.3 }}
													>
														<input
															type="url"
															id="website"
															name="website"
															value={formData.website}
															onChange={handleChange}
															placeholder="https://www.tuempresa.cl"
															className="mt-2 w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
														/>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									) : currentQuestion.type === "radio" ? (
										<div className="space-y-3">
											{currentQuestion.options.map((option) => (
												<label
													key={option}
													className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 cursor-pointer border-2 ${
														formData.monthlyBudget === option
															? "bg-blue-50 dark:bg-blue-900/50 border-blue-500 dark:border-blue-500"
															: "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
													}`}
												>
													<input
														type="radio"
														id={option}
														name="monthlyBudget"
														value={option}
														checked={formData.monthlyBudget === option}
														onChange={handleChange}
														className="h-5 w-5 text-blue-600 focus:ring-blue-500"
													/>
													<span className="text-gray-800 dark:text-gray-200 font-medium">
														{option}
													</span>
												</label>
											))}
										</div>
									) : currentQuestion.type === "multiple-choice" ? (
										<div className="space-y-3">
											{currentQuestion.options.map((option) => (
												<label
													key={option}
													className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 cursor-pointer border-2 ${
														formData.goals.includes(option)
															? "bg-blue-50 dark:bg-blue-900/50 border-blue-500 dark:border-blue-500"
															: "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
													}`}
												>
													<input
														type="checkbox"
														id={option}
														name="goals"
														value={option}
														checked={formData.goals.includes(option)}
														onChange={handleChange}
														className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
													/>
													<span className="text-gray-700 dark:text-gray-300">
														{option}
													</span>
												</label>
											))}
										</div>
									) : null}
								</div>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="mt-8">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Paso {currentStep + 1} de {questions.length}
					</span>
				</div>
				<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
					<motion.div
						className="bg-blue-600 h-2.5 rounded-full"
						animate={{
							width: `${((currentStep + 1) / questions.length) * 100}%`,
						}}
					></motion.div>
				</div>
				{error && (
					<div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center justify-center">
						<AlertTriangle className="h-5 w-5 mr-2" />
						<span className="font-medium">{error}</span>
					</div>
				)}
				<div className="flex justify-between mt-6">
					<motion.button
						type="button"
						onClick={handleBack}
						disabled={currentStep === 0}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`flex items-center bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-semibold transition-colors ${
							currentStep === 0
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-gray-400 dark:hover:bg-gray-600"
						}`}
					>
						<ArrowLeft className="mr-2 h-5 w-5" /> Anterior
					</motion.button>
					{currentStep < questions.length - 1 ? (
						<motion.button
							type="button"
							onClick={handleNext}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
						>
							Siguiente <ArrowRight className="ml-2 h-5 w-5" />
						</motion.button>
					) : (
						<motion.button
							type="button"
							onClick={handleSubmit}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="flex items-center justify-center w-52 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:bg-green-600"
						>
							<Send className="mr-2 h-5 w-5" />
							Enviar por WhatsApp
						</motion.button>
					)}
				</div>
			</div>
		</div>
	);
};

export default BudgetCalculator;
