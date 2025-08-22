import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import GradientText from "../GradientText";
import dashboardHero from "../assets/dashboard-hero.png";

const Hero = () => {
	const gtag_report_conversion = (url) => {
		if (typeof window.gtag === "function") {
			window.gtag("event", "conversion", {
				send_to: "AW-980744893/m9_NCPGupb0aEL3109MD",
				event_callback: () => {
					if (url) window.open(url, "_blank");
				},
			});
		} else {
			if (url) window.open(url, "_blank");
		}
		return false;
	};

	return (
		<section
			id="inicio"
			className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900/95 dark:to-gray-900"
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
							Campañas optimizadas que generan resultados reales desde el primer
							día. Te ayudamos a configurar, lanzar y optimizar tu presencia
							digital para atraer clientes calificados.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<motion.a
								href="https://api.whatsapp.com/send/?phone=56939363916&text=Hola, quiero comenzar con Google Ads para mi negocio. ¿Podrían ayudarme?"
								onClick={(e) => {
									e.preventDefault();
									gtag_report_conversion(e.currentTarget.href);
								}}
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
	);
};

export default Hero;
