import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-4 gap-8">
					<div>
						<div className="text-2xl font-bold mb-2">
							anunci<span className="text-blue-400">Ads</span>
						</div>
						<p className="text-gray-400 mb-4">
							Expertos en Google Ads ayudando a empresas a crecer y alcanzar sus
							objetivos de marketing digital.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://www.instagram.com/anunciads.cl/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:opacity-80 transition-opacity"
								aria-label="Instagram"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-6 w-6"
								>
									<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
								</svg>
							</a>
							<a
								href="https://web.facebook.com/profile.php?id=61560652700176"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:opacity-80 transition-opacity"
								aria-label="Facebook"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-6 w-6"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
							</a>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Servicios</h3>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a
									href="#servicios"
									className="hover:text-white transition-colors"
								>
									Campañas Google Ads
								</a>
							</li>
							<li>
								<a
									href="#servicios"
									className="hover:text-white transition-colors"
								>
									Landing Pages
								</a>
							</li>
							<li>
								<a
									href="#servicios"
									className="hover:text-white transition-colors"
								>
									Análisis y Reportes
								</a>
							</li>
							<li>
								<a
									href="#servicios"
									className="hover:text-white transition-colors"
								>
									Consultoría Digital
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Empresa</h3>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a
									href="#nosotros"
									className="hover:text-white transition-colors"
								>
									Sobre Nosotros
								</a>
							</li>
							<li>
								<a href="#casos" className="hover:text-white transition-colors">
									Casos de Éxito
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Blog
								</a>
							</li>
							<li>
								<a
									href="#contacto"
									className="hover:text-white transition-colors"
								>
									Contacto
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Contacto</h3>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a
									href="mailto:contacto@anunciads.cl"
									className="hover:text-white transition-colors"
								>
									contacto@anunciads.cl
								</a>
							</li>
							<li>
								<a
									href="tel:+56939363916"
									className="hover:text-white transition-colors"
								>
									+56 9 3936 3916
								</a>
							</li>
							<li>Temuco, Chile</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
					<p>&copy; 2024 AnunciAds. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
