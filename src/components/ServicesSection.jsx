import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
	Target,
	LayoutTemplate,
	BarChart3,
	ShoppingCart,
	ArrowRight,
} from "lucide-react";
import GradientText from "./GradientText"; // Importa el componente de gradiente

const services = [
	{
		icon: Target,
		title: "Campañas de Google Ads",
		imageUrl:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
		linkTo: "#contacto",
	},
	{
		icon: LayoutTemplate,
		title: "Diseño Web y E-commerce",
		isEcommerce: true,
		imageUrl:
			"https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop",
		linkTo: "/ecommerce",
	},
	{
		icon: BarChart3,
		title: "Análisis y Estrategia",
		imageUrl:
			"https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
		linkTo: "#contacto",
	},
];

const ServicesSection = () => {
	return (
		<section id="servicios" className="py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						<GradientText>Soluciones a tu Medida</GradientText>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Desde la gestión publicitaria hasta el desarrollo de tu tienda
						online, te cubrimos.
					</p>
				</motion.div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							className="relative group bg-cover bg-center rounded-2xl ring-4 ring-blue-500/30 hover:ring-blue-500 transition-all duration-300 flex flex-col justify-end overflow-hidden aspect-[9/16]"
							style={{ backgroundImage: `url(${service.imageUrl})` }}
						>
							{/* Gradiente sutil en la parte inferior para legibilidad del botón */}
							<div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

							<div className="relative p-6">
								{service.isEcommerce ? (
									<Link
										to={service.linkTo}
										className="w-full inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
									>
										<ShoppingCart className="mr-3 h-5 w-5" />
										{service.title}
									</Link>
								) : (
									<a
										href={service.linkTo}
										className="w-full inline-flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
									>
										{service.title}
										<ArrowRight className="ml-3 h-5 w-5" />
									</a>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;
