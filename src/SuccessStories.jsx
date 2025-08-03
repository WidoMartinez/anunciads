import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, DollarSign, Star } from "lucide-react";

const caseStudies = [
	{
		clientName: "Tienda Moda Local",
		logoUrl: "https://placehold.co/100x40/ffffff/3b82f6?text=ModaLocal",
		testimonial:
			"Desde que empezamos con AnunciAds, nuestras ventas online aumentaron un 150%. Su equipo no solo configuró la campaña, sino que la optimiza constantemente.",
		metricValue: "+150%",
		metricLabel: "Aumento en Ventas",
		icon: TrendingUp,
		chartData: [
			{ name: "Antes", value: 40 },
			{ name: "Después", value: 100 },
		],
	},
	{
		clientName: "Servicios Profesionales",
		logoUrl: "https://placehold.co/100x40/ffffff/3b82f6?text=ServiPro",
		testimonial:
			"El soporte ha sido increíble. Ahora recibimos prospectos calificados todos los días gracias a la campaña que crearon para nosotros. El costo por lead bajó un 30%.",
		metricValue: "-30%",
		metricLabel: "Costo por Lead",
		icon: Target,
		chartData: [
			{ name: "Antes", value: 100 },
			{ name: "Después", value: 70 },
		],
	},
	{
		clientName: "E-commerce de Artesanía",
		logoUrl: "https://placehold.co/100x40/ffffff/3b82f6?text=Artesan%C3%ADa",
		testimonial:
			"Profesionalismo de principio a fin. Entendieron nuestras necesidades y el retorno de la inversión ha sido mucho mejor de lo que esperábamos. ¡Un ROI de 5x!",
		metricValue: "5:1",
		metricLabel: "Retorno de Inversión (ROI)",
		icon: DollarSign,
		chartData: [
			{ name: "Inversión", value: 20 },
			{ name: "Retorno", value: 100 },
		],
	},
];

const BarChart = ({ data }) => (
	<div className="w-full h-20 flex items-end justify-around gap-4">
		{data.map((entry, index) => (
			<div key={index} className="flex flex-col items-center flex-1">
				<div className="w-full h-full flex items-end">
					<motion.div
						initial={{ height: 0 }}
						whileInView={{ height: `${entry.value}%` }}
						transition={{ duration: 1, ease: "easeOut" }}
						className={`w-full rounded-t-lg ${
							index === 0 ? "bg-slate-300 dark:bg-slate-600" : "bg-blue-500"
						}`}
					/>
				</div>
				<span className="text-xs mt-2 text-slate-500 dark:text-slate-400">
					{entry.name}
				</span>
			</div>
		))}
	</div>
);

const SuccessStories = () => {
	return (
		<section id="casos" className="py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Resultados que Inspiran Confianza
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						No solo lo decimos nosotros, nuestros números hablan por sí solos.
						Estos son algunos de nuestros casos de éxito.
					</p>
				</motion.div>
				<div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
					{caseStudies.map((study, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col"
						>
							<div className="flex items-center justify-between mb-6">
								<img
									src={study.logoUrl}
									alt={`${study.clientName} logo`}
									className="h-8"
									onError={(e) => (e.target.style.display = "none")}
								/>
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="h-5 w-5 text-yellow-400 fill-current"
										/>
									))}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-6 items-center mb-6">
								<div className="text-left">
									<div
										className={`inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-2`}
									>
										<study.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
									</div>
									<p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
										{study.metricValue}
									</p>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										{study.metricLabel}
									</p>
								</div>
								<div className="h-full">
									<BarChart data={study.chartData} />
								</div>
							</div>

							<p className="text-slate-600 dark:text-slate-300 mb-6 italic flex-grow">
								"{study.testimonial}"
							</p>

							<div>
								<p className="font-bold text-gray-900 dark:text-white">
									{study.clientName}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SuccessStories;
