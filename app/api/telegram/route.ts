// app/api/telegram/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram.backend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // body should be { data: {...}, formType: "..." }
    await sendTelegramMessage(body, req);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}