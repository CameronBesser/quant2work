// lib/telegram.backend.ts
import axios from "axios";
import { NextRequest } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_IDS = (process.env.TELEGRAM_CHAT_IDS || "").split(",");

/**
 * Get real client IP from NextRequest
 */
export const getClientIP = (req: NextRequest): string => {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0] || req.headers.get("x-real-ip") || "unknown";
  // Remove IPv6 prefix if present
  return ip.replace(/^::ffff:/, "");
};

/**
 * Get country from IP
 */
export const getCountryFromIP = async (ip: string): Promise<string> => {
  if (ip === "unknown" || ip === "127.0.0.1" || ip === "::1") return "Localhost";
  try {
    const response = await axios.get(`http://www.geoplugin.net/json.gp?ip=${ip}`, { timeout: 3000 });
    return response.data?.geoplugin_countryName || "Unknown";
  } catch {
    return "Unknown";
  }
};

/**
 * Format current date/time
 */
export const getCurrentDateTime = (): string => {
  return new Date().toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
};

/**
 * Send message to Telegram (backend version)
 */
export const sendTelegramMessage = async (
  body: { data: Record<string, any>; formType?: string },
  req: NextRequest
) => {
  const { data, formType = "Form Submission" } = body;

  const ip = getClientIP(req);
  const country = await getCountryFromIP(ip);
  const userAgent = req.headers.get("user-agent") || "unknown";
  const dateTime = getCurrentDateTime();

  // Build message
  let message = `**${formType}**\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;

  // Loop through the data object (the actual form fields)
  for (const [key, value] of Object.entries(data)) {
    if (value && value !== "") {
      const displayKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      message += `${displayKey}: ${value}\n`;
    }
  }

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🌐 IP: ${ip}\n`;
  message += `📍 ${country}\n`;
  message += `🖥️ ${userAgent}\n`;
  message += `📅 ${dateTime}`;

  // Send to all chat IDs
  for (const chatId of CHAT_IDS) {
    try {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      });
      console.log(`Message sent to ${chatId}`);
    } catch (error) {
      console.error(`Failed to send to ${chatId}:`, error);
    }
  }
};