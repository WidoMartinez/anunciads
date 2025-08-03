import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	ArrowRight,
	BarChart3,
	Target,
	Users,
	CheckCircle,
	Star,
	TrendingUp,
	Zap,
	Shield,
	Clock,
	Send,
	Mail,
	Phone,
	MapPin,
	MessageCircle,
	Calculator,
	X,
	Award,
	ThumbsUp,
	Moon,
	Sun,
} from "lucide-react";
import "./App.css";
import BudgetCalculator from "./BudgetCalculator";
import FAQ from "./FAQ";
import DiscountPopup from "./DiscountPopup";
import Chatbot from "./Chatbot.jsx";
import FloatingHelpWidget from "./FloatingHelpWidget.jsx";
import GradientText from "./GradientText.jsx";
import axios from "axios";

// Importar imágenes
import dashboardHero from "./assets/dashboard-hero.png";

// Para el flujo de redirección (Checkout Pro), no se necesita el SDK de React de Mercado Pago aquí.

const App = () => {
	const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	// --- ESTADO SIMPLIFICADO PARA EL PAGO ---
	const [isLoading, setIsLoading] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);
	// --- FIN ESTADO SIMPLIFICADO ---

	const [contactFormData, setContactFormData] = useState({
		name: "",
		website: "",
		phone: "",
		email: "",
	});
	const [formStatus, setFormStatus] = useState("idle"); // 'idle', 'sending'

	const handleContactFormChange = (e) => {
		const { name, value } = e.target;
		setContactFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleContactFormSubmit = (e) => {
		e.preventDefault();
		setFormStatus("sending");

		const message = `
¡Hola! Tengo una consulta desde el formulario de contacto principal:

*Nombre:* ${contactFormData.name}
*Email:* ${contactFormData.email}
*Teléfono:* ${contactFormData.phone}
*Página Web:* ${contactFormData.website}
        `.trim();

		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://api.whatsapp.com/send/?phone=56939363916&text=${encodedMessage}`;

		// Pequeño delay para que el usuario vea el feedback
		setTimeout(() => {
			window.open(whatsappUrl, "_blank");
			setContactFormData({ name: "", website: "", phone: "", email: "" }); // Limpiar formulario
			setFormStatus("idle"); // Resetear estado del botón
		}, 500);
	};

	useEffect(() => {
		const popupShown = localStorage.getItem("discountPopupShown");
		if (!popupShown) {
			const timer = setTimeout(() => {
				setIsPopupOpen(true);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, []);

	const handleClosePopup = () => {
		setIsPopupOpen(false);
		localStorage.setItem("discountPopupShown", "true");
	};

	const [isDarkMode, setIsDarkMode] = useState(() => {
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme");
			return savedTheme ? JSON.parse(savedTheme) : false;
		}
		return false;
	});

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		if (typeof window !== "undefined") {
			localStorage.setItem("theme", JSON.stringify(isDarkMode));
		}
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	// --- FUNCIÓN DE COMPRA MODIFICADA PARA REDIRECCIÓN ---
	const handleBuy = async (plan) => {
		setSelectedPlan(plan.name);
		setIsLoading(true);
		try {
			const response = await axios.post(
				"http://localhost:8080/create_preference",
				{
					title: plan.name,
					// Convierte el precio de string a número para el backend
					price: parseFloat(plan.currentPrice.replace(/[^0-9]/g, "")),
					quantity: 1,
				}
			);

			// --- CAMBIO CLAVE: REDIRECCIÓN ---
			// Tomamos la URL que nos da el backend y redirigimos al usuario.
			const { redirectUrl } = response.data;
			window.location.href = redirectUrl;
		} catch (error) {
			console.error("Error al crear la preferencia:", error);
			alert("Error al generar el link de pago. Intenta de nuevo.");
			setIsLoading(false); // Detenemos la carga si hay un error
		}
	};
	// --- FIN FUNCIÓN DE COMPRA ---

	const प्लांस = [
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
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
			<header className="fixed top-0 w-full bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<div className="text-2xl font-bold text-white">anunciAds</div>
						</div>
						<nav className="hidden md:flex items-center space-x-8">
							<a
								href="#inicio"
								className="text-gray-300 hover:text-white transition-colors"
							>
								Inicio
							</a>
							<a
								href="#servicios"
								className="text-gray-300 hover:text-white transition-colors"
							>
								Servicios
							</a>
							<a
								href="#precios"
								className="text-gray-300 hover:text-white transition-colors"
							>
								Precios
							</a>
							<a
								href="#casos"
								className="text-gray-300 hover:text-white transition-colors"
							>
								Casos de Éxito
							</a>
							<a
								href="#faq"
								className="text-gray-300 hover:text-white transition-colors"
							>
								FAQ
							</a>
							<a
								href="#contacto"
								className="text-gray-300 hover:text-white transition-colors"
							>
								Contacto
							</a>
						</nav>
						<div className="flex items-center gap-2 sm:gap-4">
							<motion.button
								onClick={() => setIsCalculatorOpen(true)}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="hidden sm:flex items-center bg-transparent text-white border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
							>
								<Calculator className="mr-2 h-4 w-4" />
								Solicitar Presupuesto
							</motion.button>
							<motion.a
								href="https://api.whatsapp.com/send/?phone=56939363916&text=Hola, me gustaría agendar una consulta gratuita para mi negocio. ¿Podrían ayudarme?"
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
							>
								Consulta Gratuita
							</motion.a>
							<button
								onClick={toggleTheme}
								className="p-2 rounded-full text-white hover:bg-white/20 transition-colors"
								aria-label="Cambiar tema"
							>
								{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
							</button>
						</div>
					</div>
				</div>
			</header>

			<main>
				<section
					id="inicio"
					className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800/50 dark:to-gray-900"
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
							>
								<div className="flex items-center space-x-2 mb-4">
									<div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
										✓ Certificados por Google
									</div>
								</div>
								<h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
									Impulsa tu Negocio con <GradientText>Google Ads</GradientText>{" "}
									Profesional
								</h1>
								<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
									Campañas optimizadas que generan resultados reales desde el
									primer día. Te ayudamos a configurar, lanzar y optimizar tu
									presencia digital para atraer clientes calificados.
								</p>
								<div className="flex flex-col sm:flex-row gap-4">
									<motion.a
										href="https://api.whatsapp.com/send/?phone=56939363916&text=Hola, quiero comenzar con Google Ads para mi negocio. ¿Podrían ayudarme?"
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
									>
										Comenzar Ahora
										<ArrowRight className="ml-2 h-5 w-5" />
									</motion.a>
									<motion.a
										href="#casos"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-600/10 dark:text-blue-400 dark:border-blue-400 transition-colors text-center"
									>
										Ver Casos de Éxito
									</motion.a>
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="relative"
							>
								<img
									src={dashboardHero}
									alt="Dashboard de Marketing Digital"
									className="rounded-2xl shadow-2xl"
								/>
								<div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
									<div className="flex items-center space-x-3">
										<div className="bg-green-100 p-2 rounded-lg">
											<TrendingUp className="h-6 w-6 text-green-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												ROI Promedio
											</p>
											<p className="text-2xl font-bold text-gray-900 dark:text-white">
												+340%
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
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
								¿Por qué elegir AnunciAds?
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Somos expertos en Google Ads con años de experiencia ayudando a
								empresas a crecer y alcanzar sus objetivos de marketing digital.
							</p>
						</motion.div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{[
								{
									icon: Zap,
									title: "Resultados Inmediatos",
									description:
										"Tráfico calificado desde el día 1 con campañas optimizadas",
								},
								{
									icon: Target,
									title: "ROI Optimizado",
									description:
										"Inversión inteligente con seguimiento detallado de métricas",
								},
								{
									icon: Shield,
									title: "Soporte 24/7",
									description:
										"Acompañamiento continuo y optimización constante",
								},
								{
									icon: BarChart3,
									title: "Transparencia Total",
									description:
										"Reportes detallados y acceso completo a métricas",
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

				<section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-bold text-white mb-4">
								Resultados que Hablan por Sí Solos
							</h2>
							<p className="text-xl text-blue-100 max-w-3xl mx-auto">
								Métricas reales de nuestros clientes que demuestran el impacto
								de nuestras campañas
							</p>
						</motion.div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{[
								{ metric: "7.85%", label: "CTR Promedio", icon: Target },
								{
									metric: "+23%",
									label: "Crecimiento en Ventas",
									icon: TrendingUp,
								},
								{
									metric: "2,268",
									label: "Conversiones Generadas",
									icon: Users,
								},
								{
									metric: "5.56%",
									label: "Tasa de Conversión",
									icon: BarChart3,
								},
							].map((kpi, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20"
								>
									<div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
										<kpi.icon className="h-8 w-8 text-white" />
									</div>
									<div className="text-4xl font-bold text-white mb-2">
										{kpi.metric}
									</div>
									<div className="text-blue-100">{kpi.label}</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<section
					id="servicios"
					className="py-20 bg-gray-50 dark:bg-gray-800/50"
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
								Nuestros Servicios
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Soluciones integrales de marketing digital diseñadas para hacer
								crecer tu negocio
							</p>
						</motion.div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[
								{
									title: "Campañas Google Ads",
									description:
										"Configuración y optimización profesional de campañas de búsqueda, display y shopping",
									features: [
										"Investigación de palabras clave",
										"Configuración de campañas",
										"Optimización continua",
										"Reportes detallados",
									],
								},
								{
									title: "Landing Pages",
									description:
										"Diseño y desarrollo de páginas de aterrizaje optimizadas para conversión",
									features: [
										"Diseño responsive",
										"Optimización CRO",
										"A/B Testing",
										"Integración con Analytics",
									],
								},
								{
									title: "Análisis y Reportes",
									description:
										"Métricas detalladas y insights accionables para mejorar el rendimiento",
									features: [
										"Dashboard personalizado",
										"Reportes automáticos",
										"Análisis de competencia",
										"Recomendaciones estratégicas",
									],
								},
							].map((service, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									whileHover={{ y: -10 }}
									className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl dark:border dark:border-gray-700 dark:hover:shadow-blue-500/20 transition-all duration-300"
								>
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
										{service.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-6">
										{service.description}
									</p>
									<ul className="space-y-3">
										{service.features.map((feature, featureIndex) => (
											<li key={featureIndex} className="flex items-center">
												<CheckCircle className="h-5 w-5 text-green-500 mr-3" />
												<span className="text-gray-700 dark:text-gray-300">
													{feature}
												</span>
											</li>
										))}
									</ul>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<section id="casos" className="py-20 bg-white dark:bg-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
								Clientes que Confían en Nosotros
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Resultados reales para negocios como el tuyo. Esto es lo que
								dicen nuestros clientes sobre su experiencia.
							</p>
						</motion.div>
						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									name: "Carla Rojas",
									position: "CEO, Tienda Moda Local",
									testimonial:
										"Desde que empezamos con AnunciAds, nuestras ventas online aumentaron un 150%. Su equipo no solo configuró la campaña, sino que la optimiza constantemente para darnos los mejores resultados.",
									rating: 5,
								},
								{
									name: "Javier Núñez",
									position: "Gerente, Servicios Profesionales",
									testimonial:
										"El soporte ha sido increíble. Teníamos muchas dudas y siempre estuvieron ahí para guiarnos. Ahora recibimos prospectos calificados todos los días gracias a la campaña que crearon para nosotros.",
									rating: 5,
								},
								{
									name: "María Paz",
									position: "Fundadora, E-commerce de Artesanía",
									testimonial:
										"Profesionalismo de principio a fin. Entendieron nuestras necesidades a la perfección y el retorno de la inversión ha sido mucho mejor de lo que esperábamos. Totalmente recomendados.",
									rating: 5,
								},
							].map((testimonial, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-transparent dark:border-gray-700"
								>
									<div className="flex mb-4">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star
												key={i}
												className="h-5 w-5 text-yellow-400 fill-yellow-400"
											/>
										))}
									</div>
									<p className="text-gray-700 dark:text-gray-300 mb-6 italic">
										"{testimonial.testimonial}"
									</p>
									<div>
										<p className="font-bold text-gray-900 dark:text-white">
											{testimonial.name}
										</p>
										<p className="text-gray-600 dark:text-gray-400">
											{testimonial.position}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<section id="faq" className="py-20 bg-gray-100 dark:bg-gray-800">
					<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
								Preguntas Frecuentes
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Resolvemos tus dudas más comunes para que tomes la mejor
								decisión.
							</p>
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

				<section id="precios" className="py-20 bg-white dark:bg-gray-900">
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
								¡Oferta especial! 50% de descuento en todos nuestros planes
								durante los primeros 2 meses. Elige el que mejor se adapte a tu
								negocio y objetivos.
							</p>
						</motion.div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
							{प्लांस.map((plan, index) => (
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
													? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/50"
													: "bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-800"
											} disabled:opacity-50 disabled:cursor-wait`}
										>
											{isLoading && selectedPlan === plan.name
												? "Redirigiendo..."
												: "CONTRATAR AHORA"}
										</motion.button>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<section id="nosotros" className="py-20 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
								Nuestro Método Probado
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Un proceso estructurado que garantiza resultados consistentes y
								medibles
							</p>
						</motion.div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{[
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
							].map((process, index) => (
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

				<section
					id="contacto"
					className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800/50 dark:to-gray-900"
				>
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
										href="https://api.whatsapp.com/send/?phone=939363916&text=Hola, me gustaría hablar con un experto."
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
								<form onSubmit={handleContactFormSubmit} className="space-y-6">
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
											disabled={formStatus === "sending"}
											className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70"
										>
											{formStatus === "sending" ? (
												<>
													<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
													<span>Redirigiendo...</span>
												</>
											) : (
												<>
													Contactar por WhatsApp
													<Send className="ml-2 h-5 w-5" />
												</>
											)}
										</motion.button>
									</div>
								</form>
							</motion.div>
						</div>
					</div>
				</section>
			</main>

			<footer className="bg-gray-900 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="text-2xl font-bold mb-2">
								anunci<span className="text-blue-400">Ads</span>
							</div>
							<p className="text-gray-400 mb-4">
								Expertos en Google Ads ayudando a empresas a crecer y alcanzar
								sus objetivos de marketing digital.
							</p>
							<div className="flex space-x-4">
								<a
									href="https://www.instagram.com/anunciads.cl/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white hover:opacity-80 transition-opacity"
									aria-label="Instagram"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-6 w-6"
									>
										<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
										<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
										<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
									</svg>
								</a>
								<a
									href="https://web.facebook.com/profile.php?id=61560652700176"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white hover:opacity-80 transition-opacity"
									aria-label="Facebook"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-6 w-6"
									>
										<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
									</svg>
								</a>
							</div>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">Servicios</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a
										href="#servicios"
										className="hover:text-white transition-colors"
									>
										Campañas Google Ads
									</a>
								</li>
								<li>
									<a
										href="#servicios"
										className="hover:text-white transition-colors"
									>
										Landing Pages
									</a>
								</li>
								<li>
									<a
										href="#servicios"
										className="hover:text-white transition-colors"
									>
										Análisis y Reportes
									</a>
								</li>
								<li>
									<a
										href="#servicios"
										className="hover:text-white transition-colors"
									>
										Consultoría Digital
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">Empresa</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a
										href="#nosotros"
										className="hover:text-white transition-colors"
									>
										Sobre Nosotros
									</a>
								</li>
								<li>
									<a
										href="#casos"
										className="hover:text-white transition-colors"
									>
										Casos de Éxito
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Blog
									</a>
								</li>
								<li>
									<a
										href="#contacto"
										className="hover:text-white transition-colors"
									>
										Contacto
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">Contacto</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a
										href="mailto:contacto@anunciads.cl"
										className="hover:text-white transition-colors"
									>
										contacto@anunciads.cl
									</a>
								</li>
								<li>
									<a
										href="tel:+56939363916"
										className="hover:text-white transition-colors"
									>
										+56 9 3936 3916
									</a>
								</li>
								<li>Temuco, Chile</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
						<p>&copy; 2024 AnunciAds. Todos los derechos reservados.</p>
					</div>
				</div>
			</footer>

			<DiscountPopup isOpen={isPopupOpen} onClose={handleClosePopup} />

			{isCalculatorOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100] p-4"
					onClick={() => setIsCalculatorOpen(false)}
				>
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl h-auto max-h-[90vh] flex overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="hidden lg:flex flex-col justify-between w-1/3 bg-gradient-to-br from-blue-700 to-indigo-800 p-8 text-white">
							<div>
								<div className="text-3xl font-bold mb-8">anunciAds</div>
								<h2 className="text-4xl font-bold leading-tight mb-4">
									Estás a un paso de potenciar tu negocio.
								</h2>
								<p className="text-blue-200">
									Completa el formulario y recibe una cotización a la medida de
									tus objetivos.
								</p>
							</div>
							<div className="space-y-4">
								<div className="flex items-center gap-4">
									<Award className="h-6 w-6 text-yellow-300" />
									<span>Análisis por expertos certificados.</span>
								</div>
								<div className="flex items-center gap-4">
									<ThumbsUp className="h-6 w-6 text-yellow-300" />
									<span>Propuesta 100% personalizada.</span>
								</div>
								<div className="flex items-center gap-4">
									<CheckCircle className="h-6 w-6 text-yellow-300" />
									<span>Sin costo ni compromiso.</span>
								</div>
							</div>
						</div>
						<div className="w-full lg:w-2/3 relative">
							<button
								onClick={() => setIsCalculatorOpen(false)}
								className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 z-10"
							>
								<X className="h-6 w-6" />
							</button>
							<div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
								<BudgetCalculator onClose={() => setIsCalculatorOpen(false)} />
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}

			<FloatingHelpWidget />
			<Chatbot />
		</div>
	);
};

export default App;
