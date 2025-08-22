import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	ArrowRight,
	ShoppingCart,
	Target,
	TrendingUp,
	BarChart3,
	CheckCircle,
	Star,
	Zap,
	Shield,
	ChevronDown,
} from "lucide-react";
import GradientText from "../GradientText"; // Asegúrate que la ruta sea correcta
import FAQ from "../FAQ"; // Reutilizamos el componente de FAQ

// Componente de Header reutilizable
const Header = () => (
	<header className="fixed top-0 w-full bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg z-50">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex justify-between items-center h-16">
				<div className="flex items-center">
					<a href="/" className="text-2xl font-bold text-white">
						anunciAds
					</a>
				</div>
				<nav className="hidden md:flex items-center space-x-8">
					<a
						href="/"
						className="text-gray-300 hover:text-white transition-colors"
					>
						Inicio
					</a>
					<div className="relative group">
						<button className="flex items-center text-gray-300 hover:text-white transition-colors py-5">
							Servicios
							<ChevronDown className="ml-1 h-4 w-4" />
						</button>
						<div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-20">
							<a
								href="/#servicios"
								className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
							>
								Servicios Generales
							</a>
							<a
								href="/ecommerce"
								className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
							>
								E-commerce
							</a>
						</div>
					</div>
					<a
						href="/#precios"
						className="text-gray-300 hover:text-white transition-colors"
					>
						Precios
					</a>
					<a
						href="/#contacto"
						className="text-gray-300 hover:text-white transition-colors"
					>
						Contacto
					</a>
				</nav>
				<div className="flex items-center gap-2 sm:gap-4">
					<motion.a
						href="https://api.whatsapp.com/send/?phone=56939363916&text=Hola, me gustaría una consulta gratuita para mi E-commerce."
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
					>
						Consulta Gratuita
					</motion.a>
				</div>
			</div>
		</div>
	</header>
);

// Componente de Footer reutilizable
const Footer = () => (
	<footer className="bg-gray-900 text-white py-16">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<div className="text-2xl font-bold mb-2">
				anunci<span className="text-blue-400">Ads</span>
			</div>
			<p className="text-gray-400 mb-4">
				Expertos en Google Ads para E-commerce.
			</p>
			<p>&copy; 2024 AnunciAds. Todos los derechos reservados.</p>
		</div>
	</footer>
);

const EcommercePage = () => {
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

		const message = `¡Hola! Estoy interesado/a en contratar el *${plan.name}* para mi E-commerce.\n\nPrecio de oferta: ${plan.currentPrice} ${plan.period}.\n\n¿Podrían darme más información?`;
		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://api.whatsapp.com/send/?phone=56939363916&text=${encodedMessage}`;

		gtag_report_conversion(whatsappUrl, () => {
			setIsLoading(false);
			setSelectedPlan(null);
		});
	};

	const प्लांस = [
		{
			name: "E-commerce Inicial",
			description: "Perfecto para tiendas que empiezan a vender online.",
			originalPrice: "$150.000",
			currentPrice: "$75.000",
			period: "/mes",
			budget: "Presupuesto publicitario recomendado: desde $200.000/mes",
			features: [
				{ text: "1 Campaña de Google Shopping", icon: ShoppingCart },
				{ text: "Configuración de Merchant Center", icon: CheckCircle },
				{ text: "Optimización de feed de productos", icon: TrendingUp },
				{ text: "Informe de rendimiento mensual", icon: BarChart3 },
			],
			popular: false,
		},
		{
			name: "E-commerce Crecimiento",
			description: "Para negocios que buscan escalar sus ventas.",
			originalPrice: "$250.000",
			currentPrice: "$125.000",
			period: "/mes",
			budget: "Presupuesto publicitario recomendado: desde $500.000/mes",
			features: [
				{
					text: "Campañas de Shopping y Búsqueda Dinámica",
					icon: ShoppingCart,
				},
				{ text: "Estrategias de Remarketing Dinámico", icon: Target },
				{ text: "Optimización de conversiones avanzada", icon: Zap },
				{ text: "2 informes mensuales detallados", icon: BarChart3 },
			],
			popular: true,
		},
		{
			name: "E-commerce Pro",
			description: "Solución integral para líderes del mercado.",
			originalPrice: "$400.000",
			currentPrice: "$200.000",
			period: "/mes",
			budget: "Presupuesto publicitario recomendado: desde $1.000.000/mes",
			features: [
				{ text: "Campañas Performance Max", icon: Star },
				{ text: "Gestión avanzada de feed de productos", icon: CheckCircle },
				{ text: "Soporte prioritario y Account Manager", icon: Shield },
				{ text: "Reportes y dashboards personalizados", icon: BarChart3 },
			],
			popular: false,
		},
	];

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
			<Header />

			<main>
				<section
					id="inicio"
					className="relative pt-24 bg-cover bg-center"
					style={{
						backgroundImage:
							"url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop')",
					}}
				>
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 to-indigo-100/95 dark:from-gray-800/90 dark:to-gray-900/90"></div>
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
						<motion.div
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<ShoppingCart className="mx-auto h-16 w-16 text-blue-600 dark:text-blue-400 mb-4" />
							<h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
								Vende Más con Publicidad para{" "}
								<GradientText>E-commerce</GradientText>
							</h1>
							<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
								Atrae clientes listos para comprar con campañas de Google Ads
								diseñadas específicamente para tiendas online.
							</p>
							<motion.a
								href="https://api.whatsapp.com/send/?phone=56939363916&text=Hola, quiero vender más en mi e-commerce. ¿Me ayudan?"
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
							>
								Aumentar Mis Ventas
								<ArrowRight className="ml-2 h-5 w-5" />
							</motion.a>
						</motion.div>
					</div>
				</section>

				<section className="py-20 bg-white dark:bg-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
								¿Por Qué Google Ads para tu Tienda Online?
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Nuestras estrategias están enfocadas en lo que más importa: el
								retorno de tu inversión (ROAS).
							</p>
						</motion.div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[
								{
									icon: Target,
									title: "Maximiza tu ROAS",
									description:
										"Optimizamos tus campañas para obtener el máximo retorno por cada peso invertido.",
								},
								{
									icon: ShoppingCart,
									title: "Campañas de Shopping",
									description:
										"Mostramos tus productos directamente en los resultados de búsqueda de Google.",
								},
								{
									icon: TrendingUp,
									title: "Escala tus Ventas",
									description:
										"Aumenta tu visibilidad y llega a miles de nuevos clientes potenciales.",
								},
							].map((benefit, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									whileHover={{ y: -10 }}
									className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg dark:hover:shadow-blue-500/20 transition-all duration-300"
								>
									<div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
										<benefit.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
									</div>
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
										{benefit.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-400">
										{benefit.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<section id="precios" className="py-20 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
								Planes para E-commerce
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Elige el plan que se ajuste al tamaño y los objetivos de tu
								tienda online. ¡50% OFF los primeros 2 meses!
							</p>
						</motion.div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
							{प्लांस.map((plan, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									className={`relative bg-white dark:bg-gray-800 border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${
										plan.popular
											? "border-blue-500 dark:border-blue-500 scale-105"
											: "border-gray-200 dark:border-gray-700"
									}`}
								>
									{plan.popular && (
										<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
											<span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
												MÁS POPULAR
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
											<p className="text-xs text-gray-500 dark:text-gray-400 h-8 mt-2">
												{plan.budget}
											</p>
										</div>
										<ul className="text-left space-y-3">
											{plan.features.map((feature, featureIndex) => (
												<li
													key={featureIndex}
													className="flex items-start text-sm"
												>
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
													? "bg-blue-500 text-white hover:bg-blue-600"
													: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 hover:bg-blue-200"
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

				<section id="faq" className="py-20 bg-white dark:bg-gray-900">
					<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
								Preguntas Frecuentes sobre E-commerce
							</h2>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<FAQ />
						</motion.div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default EcommercePage;
