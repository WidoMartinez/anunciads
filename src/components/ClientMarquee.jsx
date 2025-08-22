import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

// --- TUS LOGOS IMPORTADOS AQUÍ ---
// Asegúrate de que estas rutas sean correctas y los archivos existan.
import logoPlaceholder1 from "../assets/logos/Color-diseño.png";
import logoPlaceholder2 from "../assets/logos/guiño.png";
import logoPlaceholder3 from "../assets/logos/fierroyforma.png";

// Array actualizado para usar tus logos.
// Los he duplicado para que el efecto de bucle infinito se vea mejor.
const logos = [
	{ name: "Logo Cliente 1", src: logoPlaceholder1 },
	{ name: "Logo Cliente 2", src: logoPlaceholder2 },
	{ name: "Logo Cliente 3", src: logoPlaceholder3 },
	{ name: "Logo Cliente 1", src: logoPlaceholder1 },
	{ name: "Logo Cliente 2", src: logoPlaceholder2 },
	{ name: "Logo Cliente 3", src: logoPlaceholder3 },
];

const ClientMarquee = () => {
	// Estado para manejar el color del degradado dinámicamente
	const [gradientColorValue, setGradientColorValue] = useState([255, 255, 255]);

	useEffect(() => {
		// Función para actualizar el color basado en el tema actual
		const updateGradientColor = () => {
			const isDark = document.documentElement.classList.contains("dark");
			// RGB para gray-900 (oscuro) y white (claro)
			setGradientColorValue(isDark ? [17, 24, 39] : [255, 255, 255]);
		};

		// Llama la función una vez al montar el componente
		updateGradientColor();

		// Observa cambios en el atributo 'class' del tag <html> para detectar cambios de tema
		const observer = new MutationObserver(updateGradientColor);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		// Limpia el observador cuando el componente se desmonta
		return () => observer.disconnect();
	}, []);

	return (
		<section className="py-16 bg-white dark:bg-gray-900 overflow-x-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
						Impulsando el Crecimiento de Empresas Líderes
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						Nos enorgullece ser el socio estratégico de negocios ambiciosos.
					</p>
				</div>
			</div>
			<Marquee
				gradient={true}
				gradientColor={gradientColorValue} // Usa el color del estado
				gradientWidth={100}
				speed={40}
				pauseOnHover={true}
				autoFill={true}
			>
				{logos.map((logo, index) => (
					<div
						key={index}
						className="mx-12 sm:mx-16 flex-shrink-0"
						title={logo.name}
					>
						<img
							src={logo.src}
							alt={`Logo de ${logo.name}`}
							className="h-20 w-auto object-contain text-gray-500 dark:text-gray-400 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
						/>
					</div>
				))}
			</Marquee>
		</section>
	);
};

export default ClientMarquee;
