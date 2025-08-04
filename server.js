// server.js
import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

// --- CONFIGURACIÓN INICIAL ---
// Tu Access Token de PRUEBA. Para producción final, deberás cambiarlo por el de PRODUCCIÓN.
const accessToken =
	"TEST-7789908977314890-080311-63e6f0b9f6018bc165bb0d817248e786-136386884";

const client = new MercadoPagoConfig({
	accessToken: accessToken,
	options: { timeout: 5000 },
});

const app = express();
app.use(express.json());

// --- CONFIGURACIÓN DE CORS ---
// Es una buena práctica ser específico sobre qué dominios pueden hacer peticiones.
const allowedOrigins = [
	"https://www.anunciads.cl", // Tu dominio principal de frontend
	"https://anunciads.cl", // Tu dominio sin 'www'
];

app.use(
	cors({
		origin: function (origin, callback) {
			// Permite peticiones sin 'origin' (como las de Postman o apps móviles)
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

// --- RUTA PARA CREAR LA PREFERENCIA DE PAGO ---
app.post("/create_preference", async (req, res) => {
	try {
		const { title, price, quantity } = req.body;

		const preferenceBody = {
			items: [
				{
					title: title,
					unit_price: Number(price),
					quantity: Number(quantity),
					currency_id: "CLP", // Moneda para Chile
				},
			],
			back_urls: {
				success: "https://www.anunciads.cl/pago-exitoso",
				failure: "https://www.anunciads.cl/pago-fallido",
				pending: "https://www.anunciads.cl/pago-pendiente",
			},
			auto_return: "approved",
			// --- ¡URL DE NOTIFICACIÓN DE PRODUCCIÓN! ---
			// Aquí usamos la URL pública de tu backend desplegado en Render.
			notification_url: "https://anunciads.onrender.com/webhook",
		};

		const preference = new Preference(client);
		const result = await preference.create({ body: preferenceBody });

		// Devolvemos la URL de redirección al frontend
		res.json({
			redirectUrl: result.init_point,
		});
	} catch (error) {
		console.log("Error al crear preferencia:", error);
		res.status(500).send("Error al crear la preferencia de pago.");
	}
});

// --- RUTA PARA RECIBIR LAS NOTIFICACIONES (WEBHOOKS) ---
app.post("/webhook", async (req, res) => {
	const paymentQuery = req.query;
	console.log("🔔 Notificación de Webhook recibida:", paymentQuery);

	if (paymentQuery.type === "payment" && paymentQuery["data.id"]) {
		const paymentId = paymentQuery["data.id"];

		try {
			const paymentService = new Payment(client);
			const paymentInfo = await paymentService.get({ id: paymentId });

			console.log("✅ Información completa del pago obtenida:", {
				id: paymentInfo.id,
				status: paymentInfo.status,
				status_detail: paymentInfo.status_detail,
				payer_email: paymentInfo.payer.email,
			});

			if (paymentInfo.status === "approved") {
				console.log(
					`✅ El pago ${paymentInfo.id} fue aprobado. Actualizando sistema...`
				);
			} else if (paymentInfo.status === "rejected") {
				console.log(`❌ El pago ${paymentInfo.id} fue rechazado.`);
			}
		} catch (error) {
			console.error("Error al obtener información del pago:", error);
		}
	}
	res.sendStatus(200);
});

// --- INICIAR EL SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`✅ El servidor backend está corriendo en el puerto ${PORT}`);
});
