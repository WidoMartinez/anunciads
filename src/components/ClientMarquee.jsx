import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

// --- TUS LOGOS IMPORTADOS AQUÍ ---
import logoPlaceholder1 from "../assets/logos/Color-diseño.png";
import logoPlaceholder2 from "../assets/logos/guiño.png";
import logoPlaceholder3 from "../assets/logos/fierroyforma.png";

const logos = [
	{ name: "Color Diseño", src: logoPlaceholder1 },
	{ name: "Guiño", src: logoPlaceholder2 },
	{ name: "Fierro y Forma", src: logoPlaceholder3 },
];

const ClientMarquee = () => {
	const [gradientColorValue, setGradientColorValue] = useState([249, 250, 251]); // Color inicial para 'bg-gray-50'

	useEffect(() => {
		const updateGradientColor = () => {
			const isDark = document.documentElement.classList.contains("dark");
			// Colores del fondo de la sección: gray-800/50 (oscuro) y gray-50 (claro)
			setGradientColorValue(isDark ? [31, 41, 55] : [249, 250, 251]);
		};
		updateGradientColor();
		const observer = new MutationObserver(updateGradientColor);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	return (
		// La sección ahora es transparente para heredar el fondo de su contenedor en App.jsx
		<section className="py-12 bg-transparent overflow-x-hidden">
			<Marquee
				gradient={true}
				gradientColor={gradientColorValue}
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
							className="h-20 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 
                        dark:brightness-0 dark:invert 
                        dark:hover:brightness-100 dark:hover:invert-0 
                        transition-all duration-300"
						/>
					</div>
				))}
			</Marquee>
		</section>
	);
};

export default ClientMarquee;
