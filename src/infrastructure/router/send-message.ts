import { Router } from "express";
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const router = Router();
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

router.post('/', async (req, res) => {
    const { phone, message } = req.body;

    try {
        await client.sendMessage(phone + '@c.us', message);
        res.send(`Mensaje enviado a ${phone}: ${message}`);
    } catch (error) {
        res.status(500).send('Error al enviar el mensaje');
    }
});

export { router };
