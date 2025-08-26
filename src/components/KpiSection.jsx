import React from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Users, BarChart3 } from "lucide-react";
import logoAzul from "../assets/logo anunciads/logoazul.png"; // Importa tu logo
import GradientText from "./GradientText"; // Importa el componente de gradiente

const kpis = [
	{ metric: "7.85%", label: "CTR Promedio", icon: Target },
	{ metric: "+23%", label: "Crecimiento en Ventas", icon: TrendingUp },
	{ metric: "2,268", label: "Conversiones Generadas", icon: Users },
	{ metric: "5.56%", label: "Tasa de Conversión", icon: BarChart3 },
];

const KpiSection = () => {
	return (
		<section className="py-20 bg-gray-50 dark:bg-gray-800/80">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<div className="flex justify-center items-center gap-4 mb-4">
						<img src={logoAzul} alt="AnunciAds Logo" className="h-12 w-12" />
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white">
							<GradientText>Resultados que Hablan por Sí Solos</GradientText>
						</h2>
					</div>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Métricas reales de nuestros clientes que demuestran el impacto de
						nuestras campañas
					</p>
				</motion.div>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{kpis.map((kpi, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center border border-gray-200 dark:border-gray-700 shadow-lg"
						>
							<div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
								<kpi.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
							</div>
							<div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
								{kpi.metric}
							</div>
							<div className="text-gray-600 dark:text-gray-400">
								{kpi.label}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default KpiSection;
