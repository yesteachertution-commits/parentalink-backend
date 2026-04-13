const axios = require("axios");

const AUTHKEY_URL = "https://console.authkey.io/restapi/requestjson.php";

const authHeaders = () => ({
  "Authorization": `Basic ${process.env.AUTHKEY_API_KEY}`,
  "Content-Type": "application/json",
});

const normalizeAuthkeyMobile = (inputMobile, countryCode) => {
  const cc = String(countryCode || "").trim().replace(/^\+/, "");
  const digits = String(inputMobile || "").trim().replace(/[^\d]/g, ""); // keep digits only
  if (!digits) return "";

  // Authkey expects `country_code` + `mobile` (without country prefix).
  // If caller already includes country prefix, strip it to avoid 91 + 91xxxxxxxxxx.
  if (cc && digits.startsWith(cc) && digits.length > cc.length) {
    return digits.slice(cc.length);
  }
  return digits;
};

/**
 * Sends attendance WhatsApp template message via Authkey.
 * Template "parenta" (wid: 30443):
 * "Dear Parent, we would like to inform you that your child {{1}} is {{2}} today."
 */
const sendWhatsAppNotification = async (mobile, studentName, attendanceStatus) => {
  const formattedName = studentName.trim();
  const formattedStatus = attendanceStatus.charAt(0).toUpperCase() + attendanceStatus.slice(1).toLowerCase();

  const countryCode = process.env.AUTHKEY_COUNTRY_CODE || "91";
  const authkeyMobile = normalizeAuthkeyMobile(mobile, countryCode);
  const wid = process.env.AUTHKEY_WID;

  // Authkey portal often logs `variables: [...]` for Meta-style templates ({{1}}, {{2}}),
  // but their WhatsApp JSON docs use `bodyValues` with var1/var2 for substitution.
  const payload = {
    country_code: countryCode,
    mobile: authkeyMobile,
    wid,
    id: wid, // some accounts show this in request
    type: "text",
    variables: [formattedName, formattedStatus],
    bodyValues: { var1: formattedName, var2: formattedStatus },
  };

  const response = await axios.post(AUTHKEY_URL, payload, { headers: authHeaders() });
  console.log(
    `WhatsApp request to ${mobile} ->`,
    JSON.stringify(payload)
  );
  console.log(`WhatsApp response for ${mobile}:`, JSON.stringify(response.data));
  return response.data;
};

// TODO: Marks WhatsApp notification — will be implemented in v2
// const sendWhatsAppMarksNotification = async (mobile, studentName, subject, marks, total, className, date) => { ... };

module.exports = { sendWhatsAppNotification };
