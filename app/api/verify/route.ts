import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid verification details." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || !("phone" in payload) || !("otp" in payload)
    || typeof payload.phone !== "string" || !/^[0-9]{10}$/.test(payload.phone)
    || typeof payload.otp !== "string" || !/^[0-9]+$/.test(payload.otp)) {
    return NextResponse.json({ message: "Please enter a valid phone number and OTP." }, { status: 400 });
  }

  const baseUrl = process.env.API_URL;
  if (!baseUrl) {
    return NextResponse.json({ message: "Verification is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    // API_URL already includes /api/v1.
    const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/user/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-group-slug": "www" },
      body: JSON.stringify({ phone: payload.phone, otp: payload.otp }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      const message = response.status < 500 && typeof result?.message === "string"
        ? result.message
        : "Verification could not be completed. Please try again.";
      return NextResponse.json({ message }, { status: response.status >= 400 && response.status < 500 ? response.status : 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "We couldn’t reach the verification service. Please try again shortly." }, { status: 502 });
  }
}
