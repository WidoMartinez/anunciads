import React from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";

// Importa los estilos necesarios para el slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialSlider = ({ testimonials }) => {
	// Configuración para el carrusel automático
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000, // Cambia cada 5 segundos
		arrows: false, // Oculta las flechas para un look más limpio
		adaptiveHeight: true, // Ajusta la altura a cada testimonio
		appendDots: (dots) => (
			<div>
				<ul style={{ margin: "0px" }}> {dots} </ul>
			</div>
		),
	};

	return (
		<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 h-full">
			<Slider {...settings}>
				{testimonials.map((testimonial, index) => (
					<div key={index} className="px-2">
						<div className="flex flex-col h-full">
							<div className="flex mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										className="h-5 w-5 text-yellow-400 fill-yellow-400"
									/>
								))}
							</div>
							<p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg flex-grow">
								"{testimonial.testimonial}"
							</p>
							<div>
								<p className="font-bold text-gray-900 dark:text-white">
									{testimonial.name}
								</p>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									{testimonial.position}
								</p>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default TestimonialSlider;
