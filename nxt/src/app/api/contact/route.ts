import { NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getContactConfig } from "@/lib/data/config";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message } = body;
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ ok: false, error: "All fields are required" }, { status: 400 });
  }

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      subject,
      message,
      timestamp: new Date(),
      read: false,
    });

    const contactConfig = await getContactConfig();
    if (contactConfig.spreadsheetUrl) {
      try {
        await fetch(contactConfig.spreadsheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
          }).toString(),
        });
      } catch (error) {
        console.warn("Spreadsheet submission error:", error);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 500 });
  }
}
