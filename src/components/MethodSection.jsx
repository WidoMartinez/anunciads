import React from "react";
import { motion } from "framer-motion";
import GradientText from "./GradientText"; // Importamos el componente de gradiente

const steps = [
	{
		step: "01",
		title: "Investigación y Análisis",
		description:
			"Análisis de mercado preciso usando inteligencia artificial para identificar patrones y oportunidades.",
	},
	{
		step: "02",
		title: "Definición de Objetivos",
		description:
			"Objetivos SMART específicos, medibles, alcanzables, relevantes y con plazo definido.",
	},
	{
		step: "03",
		title: "Implementación",
		description:
			"Metodología ágil para trabajar de forma flexible y eficiente, obteniendo resultados tangibles.",
	},
	{
		step: "04",
		title: "Optimización y Soporte",
		description:
			"Servicio integral con mejoras continuas y soporte rápido a través de múltiples canales.",
	},
];

const MethodSection = () => {
	return (
		<section id="nosotros" className="py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						<GradientText>Nuestro Método Probado</GradientText>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Un proceso estructurado que garantiza resultados consistentes y
						medibles
					</p>
				</motion.div>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((process, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							className="text-center"
						>
							<div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
								{process.step}
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
								{process.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								{process.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default MethodSection;
