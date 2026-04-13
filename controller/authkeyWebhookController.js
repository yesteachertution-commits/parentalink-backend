const authkeyWhatsappDeliveryWebhook = async (req, res) => {
  try {
    // Authkey delivery reports format may vary; keep it flexible.
    console.log("Authkey WhatsApp webhook received:", JSON.stringify(req.body));
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Authkey webhook error:", err);
    return res.status(500).json({ ok: false });
  }
};

module.exports = { authkeyWhatsappDeliveryWebhook };

