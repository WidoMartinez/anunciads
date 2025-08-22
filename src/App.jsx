import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Award, ThumbsUp, CheckCircle } from "lucide-react";
import "./App.css";

// --- COMPONENTES PRINCIPALES ---
import Header from "./components/Header";
import Hero from "./components/Hero";
import KpiSection from "./components/KpiSection";
import ServicesSection from "./components/ServicesSection";
import ProofSection from "./components/ProofSection";
import ClientMarquee from "./components/ClientMarquee";
import FAQ from "./FAQ"; // Mantenemos FAQ como componente simple
import PricingSection from "./components/PricingSection";
import MethodSection from "./components/MethodSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// --- COMPONENTES DE UI ADICIONALES ---
import BudgetCalculator from "./BudgetCalculator";
import DiscountPopup from "./DiscountPopup";
import Chatbot from "./Chatbot.jsx";
import FloatingHelpWidget from "./FloatingHelpWidget.jsx";

const App = () => {
	const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(() => {
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme");
			return savedTheme ? JSON.parse(savedTheme) : false;
		}
		return false;
	});

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

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
			<Header
				toggleTheme={toggleTheme}
				isDarkMode={isDarkMode}
				setIsCalculatorOpen={setIsCalculatorOpen}
			/>

			<main>
				<Hero />
				<KpiSection />
				<ServicesSection />
				<ProofSection />
				<ClientMarquee />

				<section id="faq" className="py-20 bg-white dark:bg-gray-900">
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

				<PricingSection />
				<MethodSection />
				<ContactSection />
			</main>

			<Footer />

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
