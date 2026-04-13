// SMS via Twilio is no longer used — replaced by Authkey WhatsApp API
const sendSms = async (mobile, message) => {
  console.warn("sendSms called but Twilio is disabled. Use sendWhatsAppNotification instead.");
};

module.exports = sendSms;
