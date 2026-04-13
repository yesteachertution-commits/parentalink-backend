const normalizeIndiaMobile = (input) => {
  const digits = String(input || "").replace(/\D/g, "");
  if (!digits) return "";

  // Accept 10-digit local numbers or 12-digit numbers starting with 91
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;

  // Fallback: if it already looks like +<country><...>, keep best-effort
  if (digits.startsWith("91") && digits.length > 12) return `+${digits.slice(-12)}`;

  return "";
};

module.exports = { normalizeIndiaMobile };
