import React from "react";
import { motion } from "framer-motion";
import TestimonialSlider from "./TestimonialSlider.jsx";
import GradientText from "./GradientText"; // Importa el componente de gradiente

const googlePartnerLogo =
	"https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/127085552";

const testimonials = [
	{
		name: "Carla Rojas",
		position: "CEO, Tienda Moda Local",
		testimonial:
			"Desde que empezamos con AnunciAds, nuestras ventas online aumentaron un 150%. Su equipo no solo configuró la campaña, sino que la optimiza constantemente.",
		rating: 5,
	},
	{
		name: "Javier Núñez",
		position: "Gerente, Servicios Profesionales",
		testimonial:
			"El soporte ha sido increíble. Teníamos muchas dudas y siempre estuvieron ahí para guiarnos. Ahora recibimos prospectos calificados todos los días.",
		rating: 5,
	},
	{
		name: "María Paz",
		position: "Fundadora, E-commerce de Artesanía",
		testimonial:
			"Profesionalismo de principio a fin. Entendieron nuestras necesidades a la perfección y el retorno de la inversión ha sido mucho mejor de lo que esperábamos.",
		rating: 5,
	},
];

const ProofSection = () => {
	return (
		<section id="casos" className="py-20 bg-gray-50 dark:bg-gray-800/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						<GradientText>Confianza y Resultados Comprobados</GradientText>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Somos partners oficiales de Google y nuestros clientes avalan
						nuestro trabajo.
					</p>
				</motion.div>
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* --- COLUMNA IZQUIERDA: GOOGLE PARTNER --- */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="bg-white dark:bg-gray-800 p-10 rounded-2xl border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-center shadow-lg"
					>
						<div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
							<img
								src={googlePartnerLogo}
								alt="Google Partner Badge"
								className="h-32 w-32 object-contain flex-shrink-0"
							/>
							<div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
									Somos Google Partners Certificados
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mt-2">
									Tu éxito está respaldado por la experiencia y certificación
									oficial de Google, asegurando que tu inversión está en manos
									de expertos.
								</p>
							</div>
						</div>
					</motion.div>

					{/* --- COLUMNA DERECHA: SLIDER DE TESTIMONIOS --- */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="rounded-2xl shadow-lg"
					>
						<TestimonialSlider testimonials={testimonials} />
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ProofSection;
