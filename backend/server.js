// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// --- SOLUCIÓN DEFINITIVA PARA CORS ---
// Simplemente usamos cors() sin una configuración compleja.
// Esto añadirá la cabecera 'Access-Control-Allow-Origin: *' a todas las respuestas,
// permitiendo que tu frontend (anunciads.cl) pueda comunicarse con el backend.
app.use(cors());

// --- RUTA PARA ENVIAR CORREO ELECTRÓNICO ---
app.post("/send-email", async (req, res) => {
	console.log("✅ Petición recibida en /send-email");
	const { name, email, phone, website } = req.body;

	if (!name || !email || !phone || !website) {
		console.log("❌ Error: Faltan campos en la petición.");
		return res
			.status(400)
			.json({ message: "Por favor, completa todos los campos." });
	}

	console.log("✅ Datos recibidos:", { name, email, phone, website });

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		secure: process.env.EMAIL_PORT == 465,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		connectionTimeout: 15000, // 15 segundos
		socketTimeout: 15000, // 15 segundos
	});

	const mailOptions = {
		from: `"Sitio Web AnunciAds" <${process.env.EMAIL_USER}>`,
		to: process.env.EMAIL_TO,
		subject: "Nuevo Mensaje del Formulario de Contacto",
		html: `
            <h1>Nuevo Contacto desde anunciads.cl</h1>
            <p>Has recibido un nuevo mensaje a través del formulario de tu sitio web.</p>
            <h2>Detalles del Contacto:</h2>
            <ul>
                <li><strong>Nombre:</strong> ${name}</li>
                <li><strong>Email del remitente:</strong> ${email}</li>
                <li><strong>Teléfono:</strong> ${phone}</li>
                <li><strong>Sitio Web:</strong> <a href="${website}">${website}</a></li>
            </ul>
        `,
	};

	try {
		console.log("⏳ Intentando enviar el correo electrónico...");
		await transporter.sendMail(mailOptions);
		console.log("✅ Correo enviado exitosamente.");
		res.status(200).json({ message: "Correo enviado exitosamente." });
	} catch (error) {
		console.error("❌ Error al enviar el correo:", error);
		res.status(500).json({ message: "Error interno al enviar el correo." });
	}
});

// --- INICIAR EL SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`✅ El servidor backend está corriendo en el puerto ${PORT}`);
});
