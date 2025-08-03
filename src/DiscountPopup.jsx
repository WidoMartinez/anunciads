import React from "react";
import { motion } from "framer-motion";
import { X, TicketPercent } from "lucide-react";

const DiscountPopup = ({ isOpen, onClose }) => {
	if (!isOpen) {
		return null;
	}

	const handleClaimAndClose = () => {
		// Cierra el popup y el localStorage se manejará en el componente padre
		onClose();
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[101] p-4"
			onClick={onClose} // Cierra el popup si se hace clic en el fondo
		>
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 50, opacity: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md text-center p-8 sm:p-12"
				onClick={(e) => e.stopPropagation()} // Evita que el popup se cierre al hacer clic en él
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2"
					aria-label="Cerrar popup"
				>
					<X className="h-6 w-6" />
				</button>

				{/* --- INICIO DE LA MODIFICACIÓN DE COLOR --- */}
				<div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
					<TicketPercent className="h-12 w-12 text-blue-600 dark:text-blue-400" />
				</div>

				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					¡Espera, tenemos un regalo!
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
					Obtén un{" "}
					<span className="font-bold text-blue-600 dark:text-blue-400">
						20% de descuento
					</span>{" "}
					en tu primer mes al contratar cualquiera de nuestros planes.
				</p>

				<motion.a
					href="https://api.whatsapp.com/send/?phone=939363916&text=Hola, quiero reclamar mi 20% de descuento en el primer mes de servicio."
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleClaimAndClose}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="inline-block w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
				>
					¡Reclamar mi Descuento!
				</motion.a>
				{/* --- FIN DE LA MODIFICACIÓN DE COLOR --- */}
			</motion.div>
		</motion.div>
	);
};

export default DiscountPopup;
