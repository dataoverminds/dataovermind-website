import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendAdminNotification, sendUserConfirmation } from "@/lib/email";

/* ─── Types ───────────────────────────────────────────────── */
interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

/* ─── Validation ──────────────────────────────────────────── */
function validate(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const { name, email, company, message } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { ok: false, error: "Name is required" };
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email is required" };
  }
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return { ok: false, error: "Message is required" };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: typeof company === "string" ? company.trim() : "",
      message: message.trim(),
    },
  };
}

/* ─── POST Handler ────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = validate(body);

    if (!result.ok) {
      return NextResponse.json(
        { status: "error", message: result.error },
        { status: 400 }
      );
    }

    const { data } = result;

    // Step 1: Insert lead into Supabase
    const supabase = getSupabaseAdmin();
    const { error: dbError } = await supabase
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
      });

    if (dbError) {
      console.error("[Contact API] Supabase insert error:", dbError);
      return NextResponse.json(
        { status: "error", message: "Failed to save your message. Please try again." },
        { status: 500 }
      );
    }

    // Step 2: Send emails (non-blocking — don't fail the request if emails error)
    try {
      await Promise.all([
        sendAdminNotification(data),
        sendUserConfirmation(data),
      ]);
    } catch (emailError) {
      // Log but don't fail — the lead is already saved
      console.error("[Contact API] Email send error:", emailError);
    }

    return NextResponse.json(
      { status: "success", message: "Your message has been received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { status: "error", message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
