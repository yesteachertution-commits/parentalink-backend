const express = require("express");
const router = express.Router();
const { authkeyWhatsappDeliveryWebhook } = require("../controller/authkeyWebhookController");

// Authkey webhook endpoint (configure this URL in Authkey panel if available)
router.post("/whatsapp", authkeyWhatsappDeliveryWebhook);

module.exports = router;

