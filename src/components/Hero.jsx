import { useState, useEffect } from "react";

// Ya no se necesita el componente GradientText, por lo que se ha eliminado la importación.

// Función para enviar el evento de conversión a Google Ads
const trackConversion = () => {
	// Asegúrate de que la función gtag esté disponible
	if (typeof window.gtag === "function") {
		window.gtag("event", "conversion", {
			// Valor de conversión actualizado con la etiqueta proporcionada
			send_to: "AW-980744893/w6nVCI61hb4aEL3109MD",
		});
		console.log("Evento de conversión enviado a Google Ads.");
	} else {
		console.error("La etiqueta global de Google (gtag.js) no se ha cargado.");
	}
};

const Hero = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		// Activa la animación poco después de que el componente se monte
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email) {
			setMessage("Por favor, introduce tu correo electrónico.");
			return;
		}
		setIsSubmitting(true);
		setMessage("");

		try {
			const response = await fetch("/api/audit-request", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (response.ok) {
				setMessage("¡Gracias! Te contactaremos pronto.");
				setEmail("");
				// Llama a la función de seguimiento de conversión aquí
				trackConversion();
			} else {
				setMessage(data.message || "Hubo un error al enviar tu solicitud.");
			}
		} catch (error) {
			setMessage("Error de conexión. Inténtalo de nuevo.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const backgroundImageUrl =
		"https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto-format&fit=crop";

	return (
		<section
			className="relative bg-gray-900 text-white overflow-hidden flex items-center justify-center min-h-screen"
			style={{
				backgroundImage: `url(${backgroundImageUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
			}}
		>
			<div className="absolute inset-0 bg-black opacity-60"></div>

			<div className="relative container mx-auto px-4 text-center py-8">
				<div className="max-w-4xl mx-auto">
					<h1
						className={`text-4xl md:text-6xl font-extrabold leading-tight mb-6 transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
					>
						{/* Ambas líneas del título ahora están en blanco sólido */}
						<span className="text-white">Maximizamos tu Inversión,</span>
						<br />
						<span className="text-white">Disparamos tus Ventas.</span>
					</h1>
					<p
						className={`text-lg md:text-xl text-gray-300 mb-10 transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
					>
						En Anunciads, convertimos clics en clientes. Deja que nuestros
						especialistas certificados en Google Ads lleven tu negocio al
						siguiente nivel con campañas publicitarias de alto rendimiento.
					</p>

					<form
						onSubmit={handleSubmit}
						className={`max-w-xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-700 ease-out delay-300 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
					>
						<p className="text-white font-bold text-lg mb-4">
							Obtén una auditoría GRATIS de tu cuenta de Google Ads
						</p>
						<div className="flex flex-col md:flex-row gap-4">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Tu correo electrónico"
								className="flex-grow p-3 rounded-md bg-gray-700/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								disabled={isSubmitting}
							/>
							<button
								type="submit"
								className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Enviando..." : "¡La Quiero!"}
							</button>
						</div>
						{message && <p className="text-white mt-4 text-sm">{message}</p>}
					</form>
				</div>
			</div>
		</section>
	);
};

export default Hero;
