import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// --- CORRECCIÓN AQUÍ ---
// Se importa 'vite-plugin-sitemap' como un export por defecto, sin las llaves {}
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		sitemap({
			hostname: "https://www.anunciads.cl", // Reemplaza con tu dominio principal
			dynamicRoutes: ["/", "/ecommerce"], // Añadimos las rutas de tu sitio
		}),
	],
});
