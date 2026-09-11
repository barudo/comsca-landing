import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid registration details." }, { status: 400 });
  }

  const fields = ["firstname", "lastname", "phone", "groupName", "slug", "password"] as const;
  if (!payload || fields.some(key => typeof payload[key] !== "string" || !(payload[key] as string).trim())) {
    return NextResponse.json({ message: "Please complete all registration fields." }, { status: 400 });
  }
  const data = Object.fromEntries(fields.map(key => [key, payload[key] as string]));
  if (!/^[0-9]{10}$/.test(data.phone) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.slug) || data.slug.length < 3 || data.slug.length > 63 || data.password.length < 8 || data.firstname.length > 100 || data.lastname.length > 100 || data.groupName.length > 150) {
    return NextResponse.json({ message: "Please check your registration details, phone number, slug, and password." }, { status: 400 });
  }

  const baseUrl = process.env.API_URL;
  if (!baseUrl) {
    return NextResponse.json({ message: "Registration is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-group-slug": "www" },
      body: JSON.stringify(data),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      const message = response.status < 500 && typeof result?.message === "string"
        ? result.message
        : "Registration could not be completed. Please try again.";
      return NextResponse.json({ message }, { status: response.status >= 400 && response.status < 500 ? response.status : 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "We couldn’t reach the registration service. Please try again shortly." }, { status: 502 });
  }
}
