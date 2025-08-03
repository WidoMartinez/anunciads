// server.js
import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Reemplaza con tu Access Token de PRUEBA
const accessToken =
	"TEST-7789908977314890-080311-63e6f0b9f6018bc165bb0d817248e786-136386884";

const client = new MercadoPagoConfig({
	accessToken: accessToken,
	options: { timeout: 5000 },
});

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create_preference", async (req, res) => {
	try {
		const { title, price, quantity } = req.body;

		const preferenceBody = {
			items: [
				{
					title: title,
					unit_price: Number(price),
					quantity: Number(quantity),
					currency_id: "CLP",
				},
			],
			back_urls: {
				success: "https://www.anunciads.cl/pago-exitoso",
				failure: "https://www.anunciads.cl/pago-fallido",
				pending: "https://www.anunciads.cl/pago-pendiente",
			},
			auto_return: "approved",
		};

		const preference = new Preference(client);
		const result = await preference.create({ body: preferenceBody });

		// --- CAMBIO CLAVE AQUÍ ---
		// Ahora enviamos la URL de redirección (init_point) en lugar del ID.
		res.json({
			redirectUrl: result.init_point,
		});
	} catch (error) {
		console.log("Error al crear preferencia:", error);
		res.status(500).send("Error al crear la preferencia de pago.");
	}
});

app.listen(8080, () => {
	console.log("✅ El servidor backend está corriendo en el puerto 8080");
});
