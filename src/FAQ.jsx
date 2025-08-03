import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
	{
		question: "¿En cuánto tiempo veré resultados con mis campañas?",
		answer:
			"Aunque los resultados pueden variar, la mayoría de nuestros clientes comienzan a ver tráfico calificado y leads potenciales dentro de los primeros 7 a 14 días. La optimización para un rendimiento máximo es un proceso continuo que mejora mes a mes.",
	},
	{
		question: "¿Necesito un contrato a largo plazo?",
		answer:
			"No. Creemos en la flexibilidad y en ganar tu confianza con resultados. Ofrecemos planes mensuales sin contratos a largo plazo. Puedes cancelar o pausar nuestros servicios en cualquier momento, solo te pedimos un aviso con 30 días de antelación.",
	},
	{
		question: "¿Qué pasa si ya tengo una cuenta de Google Ads?",
		answer:
			"¡Perfecto! Realizaremos una auditoría completa y gratuita de tu cuenta existente para identificar áreas de mejora, optimizar la estructura y potenciar lo que ya funciona. No necesitas empezar de cero; trabajamos sobre tu cuenta para darte control y transparencia total.",
	},
	{
		question: "¿Cuál es la diferencia entre su servicio y hacerlo yo mismo?",
		answer:
			"La diferencia principal es la experiencia y el ahorro de tiempo y dinero. Como expertos certificados, evitamos los errores comunes que cuestan caro, aplicamos estrategias probadas para maximizar tu ROI y nos mantenemos al día con las constantes actualizaciones de Google Ads, permitiéndole a ti enfocarte en dirigir tu negocio.",
	},
];

const FAQItem = ({ item, isOpen, onClick }) => {
	return (
		<div className="border-b border-gray-200 dark:border-gray-700 py-4">
			<button
				onClick={onClick}
				className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 dark:text-white"
			>
				<span>{item.question}</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<ChevronDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
				</motion.div>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden"
					>
						<p className="pt-4 text-gray-600 dark:text-gray-400">
							{item.answer}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const FAQ = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const handleClick = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="w-full">
			{faqData.map((item, index) => (
				<FAQItem
					key={index}
					item={item}
					isOpen={openIndex === index}
					onClick={() => handleClick(index)}
				/>
			))}
		</div>
	);
};

export default FAQ;
