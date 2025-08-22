import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	Target,
	Clock,
	Award,
	Zap,
	CheckCircle,
	ThumbsUp,
	Users,
	Shield,
	MessageCircle,
	TrendingUp,
	BarChart3,
} from "lucide-react";

const PricingSection = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);

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

	const handleBuy = (plan) => {
		setSelectedPlan(plan.name);
		setIsLoading(true);
		const message = `¡Hola! Estoy interesado/a en contratar el *${plan.name}*.\n\nPrecio de oferta: ${plan.currentPrice} ${plan.period}.\n\n¿Podrían darme más información sobre los siguientes pasos?`;
		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://api.whatsapp.com/send/?phone=56939363916&text=${encodedMessage}`;
		gtag_report_conversion(whatsappUrl, () => {
			setIsLoading(false);
			setSelectedPlan(null);
		});
	};

	const plans = [
		{
			name: "Plan Básico",
			description: "Ideal para pequeñas empresas que inician en Google Ads.",
			originalPrice: "$80.000",
			currentPrice: "$40.000",
			period: "/mes",
			budget: "Presupuesto publicitario mínimo: $100.000/mes",
			features: [
				{ text: "1 campaña de búsqueda (Search)", icon: Target },
				{ text: "Configuración y optimización continua", icon: TrendingUp },
				{ text: "1 informe mensual de rendimiento", icon: BarChart3 },
				{ text: "Soporte vía WhatsApp", icon: MessageCircle },
			],
			popular: false,
		},
		{
			name: "Plan Estándar",
			description: "Para empresas en crecimiento que buscan diversificar.",
			originalPrice: "$120.000",
			currentPrice: "$60.000",
			period: "/mes",
			budget: "Presupuesto publicitario desde: $200.000/mes",
			features: [
				{ text: "2 campañas: Búsqueda y Display", icon: Target },
				{ text: "Optimización diaria", icon: Clock },
				{ text: "1 informe mensual de rendimiento", icon: BarChart3 },
				{ text: "Soporte vía WhatsApp", icon: MessageCircle },
			],
			popular: false,
		},
		{
			name: "Plan Pro",
			description: "Para empresas con objetivos ambiciosos.",
			originalPrice: "$170.000",
			currentPrice: "$85.000",
			period: "/mes",
			budget: "Presupuesto publicitario desde: $400.000/mes",
			features: [
				{ text: "2 campañas: Búsqueda y Shopping", icon: Target },
				{ text: "2 informes mensuales de rendimiento", icon: BarChart3 },
				{ text: "Soporte prioritario", icon: Award },
				{ text: "Configuraciones personalizadas", icon: Zap },
			],
			popular: true,
		},
		{
			name: "Plan Premium",
			description: "Máximo rendimiento y escalabilidad.",
			originalPrice: "$210.000",
			currentPrice: "$105.000",
			period: "/mes",
			budget: "Presupuesto publicitario desde: $700.000/mes",
			features: [
				{ text: "3 campañas: Búsqueda, Display y Shopping", icon: Target },
				{ text: "Configuración incluida", icon: CheckCircle },
				{ text: "A/B testing continuo", icon: ThumbsUp },
				{ text: "Soporte vía WhatsApp", icon: MessageCircle },
			],
			popular: false,
		},
		{
			name: "Plan Enterprise",
			description: "Para grandes empresas complejas.",
			originalPrice: "$250.000",
			currentPrice: "$125.000",
			period: "/mes",
			budget: "Presupuesto publicitario personalizado",
			features: [
				{
					text: "5 campañas: Search, Display, Shopping, Video, Apps",
					icon: Target,
				},
				{ text: "Integración con Google Tag Manager", icon: Zap },
				{ text: "Account Manager dedicado", icon: Users },
				{ text: "Soporte dedicado 24/7", icon: Shield },
			],
			popular: false,
		},
	];

	return (
		<section id="precios" className="py-20 bg-gray-50 dark:bg-gray-800/50">
			<div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Planes Pensados para Ti
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						¡Oferta especial! 50% de descuento en todos nuestros planes durante
						los primeros 2 meses. Elige el que mejor se adapte a tu negocio y
						objetivos.
					</p>
				</motion.div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
					{plans.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							className={`relative bg-white dark:bg-gray-800 border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${
								plan.popular
									? "border-blue-500 dark:border-blue-500 scale-105 ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/40"
									: "border-gray-200 dark:border-gray-700"
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
										🔥 MÁS POPULAR
									</span>
								</div>
							)}
							<div className="text-center flex-grow">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
									{plan.name}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm mb-4 h-12">
									{plan.description}
								</p>
								<div className="mb-4">
									<span className="text-gray-400 line-through text-lg">
										{plan.originalPrice}
									</span>
									<div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
										{plan.currentPrice}
										<span className="text-lg font-normal text-gray-600 dark:text-gray-400">
											{plan.period}
										</span>
									</div>
									<p className="text-base text-green-500 dark:text-green-400 font-bold">
										50% OFF (primeros 2 meses)
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400 h-8 mt-2">
										{plan.budget}
									</p>
								</div>
								<ul className="text-left space-y-3">
									{plan.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="flex items-start text-sm">
											<feature.icon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
											<span className="text-gray-700 dark:text-gray-300">
												{feature.text}
											</span>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-6">
								<motion.button
									onClick={() => handleBuy(plan)}
									disabled={isLoading && selectedPlan === plan.name}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`block w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors ${
										plan.popular
											? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/50"
											: "bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-800"
									} disabled:opacity-50 disabled:cursor-wait`}
								>
									{isLoading && selectedPlan === plan.name
										? "Abriendo..."
										: "CONTRATAR AHORA"}
								</motion.button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
