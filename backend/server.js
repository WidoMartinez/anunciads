// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno del archivo .env

const app = express();
app.use(express.json());

// --- CONFIGURACIÓN DE CORS ---
const allowedOrigins = [
	"https://www.anunciads.cl",
	"https://anunciads.cl",
	"http://localhost:5173", // Para desarrollo local
];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg =
					"La política de CORS para este sitio no permite acceso desde el origen especificado.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

// --- RUTA PARA ENVIAR CORREO ELECTRÓNICO ---
app.post("/send-email", async (req, res) => {
	const { name, email, phone, website } = req.body;

	if (!name || !email || !phone || !website) {
		return res
			.status(400)
			.json({ message: "Por favor, completa todos los campos." });
	}

	// --- **CONFIGURACIÓN DEL TRANSPORTER MODIFICADA** ---
	// Ahora usa los datos SMTP de tu dominio desde el archivo .env
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		secure: process.env.EMAIL_PORT == 465, // true para puerto 465, false para otros
		auth: {
			user: process.env.EMAIL_USER, // contacto@anunciads.cl
			pass: process.env.EMAIL_PASS, // la contraseña de tu correo
		},
	});

	// Configurar el contenido del correo (sin cambios)
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

	// Enviar el correo
	try {
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: "Correo enviado exitosamente." });
	} catch (error) {
		console.error("Error al enviar el correo:", error);
		res.status(500).json({ message: "Error interno al enviar el correo." });
	}
});

// --- INICIAR EL SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`✅ El servidor backend está corriendo en el puerto ${PORT}`);
});
