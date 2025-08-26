// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
	console.log("✅ Petición recibida en /send-email");

	// Extraemos todos los posibles campos del body
	const { name, email, phone, website, source, message, calculatorData } =
		req.body;

	if (!name || !email || !phone || !website) {
		console.log("❌ Error: Faltan campos básicos en la petición.");
		return res
			.status(400)
			.json({ message: "Por favor, completa todos los campos." });
	}

	console.log("✅ Datos recibidos:", req.body);

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		secure: process.env.EMAIL_PORT == 465,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		connectionTimeout: 15000,
		socketTimeout: 15000,
	});

	const emailSubject = `Nuevo Mensaje desde ${
		source || "Formulario de Contacto"
	}`;

	// --- SECCIÓN DE DATOS ADICIONALES DINÁMICA ---
	// Si vienen datos de la calculadora, los formateamos aquí
	let additionalDataHtml = "";
	if (calculatorData) {
		additionalDataHtml = `
			<h2>Detalles de la Calculadora:</h2>
			<ul>
				<li><strong>Presupuesto Mensual:</strong> ${calculatorData.budget}</li>
				<li><strong>Objetivos:</strong> ${calculatorData.goals}</li>
			</ul>
		`;
	} else if (message) {
		// Si es un mensaje genérico (de otros formularios)
		additionalDataHtml = `<h2>Mensaje Adicional:</h2><pre>${message}</pre>`;
	}

	const mailOptions = {
		from: `"Sitio Web AnunciAds" <${process.env.EMAIL_USER}>`,
		to: process.env.EMAIL_TO,
		subject: emailSubject,
		html: `
            <h1>Nuevo Contacto desde ${source || "tu sitio web"}</h1>
            <p>Has recibido un nuevo mensaje a través de tu sitio web.</p>
            <h2>Detalles del Contacto:</h2>
            <ul>
                <li><strong>Nombre:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Teléfono:</strong> ${phone}</li>
                <li><strong>Sitio Web:</strong> <a href="${website}">${website}</a></li>
            </ul>
			${additionalDataHtml}
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`✅ El servidor backend está corriendo en el puerto ${PORT}`);
});
