"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { getRegistrationPayload, validateRegistrationPayload } from "./registration-payload";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [slug, setSlug] = useState("");
  const [slugCheck, setSlugCheck] = useState<{ slug: string; status: "available" | "unavailable" | "error" } | null>(null);
  const slugStatus = slug.length >= 3 ? (slugCheck?.slug === slug ? slugCheck.status : "checking") : null;
  const [message, setMessage] = useState("");
  const [hasRequiredFields, setHasRequiredFields] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [registeredPhone, setRegisteredPhone] = useState("");
  const [registeredSlug, setRegisteredSlug] = useState("");
  const [verified, setVerified] = useState(false);
  const pending = useRef(false);
  const otpInput = useRef<HTMLInputElement>(null);
  const registrationDisabled = submitting || !hasRequiredFields || !slug.trim() || slugStatus === "unavailable";

  useEffect(() => {
    if (registeredPhone) otpInput.current?.focus();
  }, [registeredPhone]);

  useEffect(() => {
    setSlugCheck(null);
    if (slug.length < 3 || registeredPhone) return;

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        if (!apiBaseUrl) throw new Error("API URL is not configured");
        const response = await fetch(`${apiBaseUrl}/groups/validae-slug?slug=${encodeURIComponent(slug)}`, {
          method: "GET",
          headers: { "x-group-slug": "www" },
          signal: controller.signal,
          cache: "no-store",
        });
        const result = await response.json();
        if (controller.signal.aborted) return;
        setSlugCheck({
          slug,
          status: result?.success === false ? "unavailable" : response.ok && result?.success === true ? "available" : "error",
        });
      } catch {
        if (!controller.signal.aborted) setSlugCheck({ slug, status: "error" });
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [slug, registeredPhone]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = getRegistrationPayload(data);
    const validationMessage = validateRegistrationPayload(payload);
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }
    if (slugStatus === "unavailable") {
      setMessage("This slug is no longer available. Please choose another.");
      return;
    }
    pending.current = true;
    setSubmitting(true);
    setMessage("");
    try {
      if (!apiBaseUrl) {
        setMessage("This service is temporarily unavailable. Please try again later.");
        return;
      }
      const response = await fetch(`${apiBaseUrl}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-group-slug": "www" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage((typeof result?.error === "string" && result.error) || (typeof result?.message === "string" && result.message) || "Registration could not be completed. Please try again.");
        return;
      }
      form.reset();
      setRegisteredSlug(payload.slug);
      setRegisteredPhone(String(payload.phone));
    } catch {
      setMessage("We couldn’t connect to the registration service. Please try again.");
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  }

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const data = new FormData(event.currentTarget);
    pending.current = true;
    setSubmitting(true);
    setMessage("");
    try {
      if (!apiBaseUrl) {
        setMessage("This service is temporarily unavailable. Please try again later.");
        return;
      }
      const response = await fetch(`${apiBaseUrl}/user/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-group-slug": "www" },
        body: JSON.stringify({ phone: registeredPhone, otp: data.get("otp") }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) {
        setMessage((typeof result?.error === "string" && result.error) || (typeof result?.message === "string" && result.message) || "Verification could not be completed. Please try again.");
        return;
      }
      setVerified(true);
    } catch {
      setMessage("We couldn’t connect to the verification service. Please try again.");
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  }

  if (verified) return <div className="registration-form" role="status">
    <h2>Phone number verified</h2>
    <p className="otp-description">Your phone number +63 {registeredPhone} has been verified successfully.</p>
    <a className="button" href={`https://${registeredSlug}.comsca.com`}>Go to {registeredSlug}.comsca.com <ArrowRight size={18}/></a>
  </div>;

  if (registeredPhone) return <form className="registration-form" onSubmit={handleVerify} aria-labelledby="otp-title" aria-busy={submitting}>
    <h2 id="otp-title">Check your phone</h2>
    <p className="otp-description">Check your phone number for the OTP sent to +63 {registeredPhone}.</p>
    <div className="form-field"><label htmlFor="verify-phone">Phone number</label><div className="phone-input"><span id="verify-phone-prefix">+63</span><input id="verify-phone" name="phone" type="tel" autoComplete="tel-national" value={registeredPhone} readOnly aria-describedby="verify-phone-prefix"/></div></div>
    <div className="form-field"><label htmlFor="otp">One-time password (OTP)</label><input ref={otpInput} id="otp" name="otp" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]+" required disabled={submitting} aria-describedby="otp-help"/></div>
    <p id="otp-help" className="field-help">Enter the code you received on your phone.</p>
    <button className="button registration-submit" type="submit" disabled={submitting}>{submitting ? "Verifying…" : "Verify phone number"} <ArrowRight size={18}/></button>
    {message && <p className="registration-message" role="alert">{message}</p>}
  </form>;

  return <form className="registration-form" onSubmit={handleSubmit} onChange={(event) => {
    const data = new FormData(event.currentTarget);
    setHasRequiredFields(["firstname", "lastname", "phone", "password", "groupName"].every((name) => {
      const value = data.get(name);
      return typeof value === "string" && value.trim().length > 0;
    }));
  }} aria-busy={submitting}>
    <fieldset disabled={submitting}>
      <legend>Your account</legend>
      <div className="form-row">
        <div className="form-field"><label htmlFor="firstname">First name</label><input id="firstname" name="firstname" autoComplete="given-name" required maxLength={100}/></div>
        <div className="form-field"><label htmlFor="lastname">Last name</label><input id="lastname" name="lastname" autoComplete="family-name" required maxLength={100}/></div>
      </div>
      <div className="form-field"><label htmlFor="phone">Phone number</label><div className="phone-input"><span id="phone-prefix">+63</span><input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="9171234567" required pattern="[0-9]{10}" minLength={10} maxLength={10} title="Enter your 10-digit phone number without +63 or the leading 0." aria-describedby="phone-prefix phone-help"/></div><p id="phone-help" className="field-help">Enter 10 digits, without the country code or leading 0.</p></div>
      <div className="form-field"><label htmlFor="password">Password</label><div className="password-input"><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required aria-describedby="password-help"/><button type="button" onClick={() => setShowPassword(!showPassword)} aria-controls="password" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div><p id="password-help" className="field-help">Use at least 8 characters, up to 72 bytes. Emoji and accented letters may count as multiple bytes.</p></div>
    </fieldset>
    <fieldset disabled={submitting}>
      <legend>Your COMSCA group</legend>
      <div className="form-field"><label htmlFor="group-name">Group name</label><input id="group-name" name="groupName" onChange={(event) => setSlug(event.target.value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 63)
        .replace(/-+$/g, ""))} autoComplete="organization" placeholder="e.g. Mabuhay Savings Group" required maxLength={150}/></div>
      <div className="form-field"><label htmlFor="slug">Group address (slug)</label><div className="slug-input"><input id="slug" name="slug" value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="mabuhay" autoCapitalize="none" autoCorrect="off" spellCheck={false} required minLength={3} maxLength={63} pattern="[a-z0-9]+(-[a-z0-9]+)*" title="Use lowercase letters, numbers, and hyphens, with no hyphen at the start or end." aria-describedby="slug-help slug-suffix slug-availability" aria-invalid={slugStatus === "unavailable"}/><span id="slug-suffix">.comsca.com</span></div><p id="slug-availability" className={`field-help${slugStatus === "unavailable" ? " slug-unavailable" : ""}`} role="status" aria-live="polite">{slugStatus === "checking" ? "Checking slug availability…" : slugStatus === "unavailable" ? "This slug is no longer available. Please choose another." : slugStatus === "available" ? "This slug is available." : slugStatus === "error" ? "Couldn’t check slug availability. Please try again." : ""}</p><p id="slug-help" className="field-help">Choose 3–63 lowercase letters, numbers, or hyphens. Start and end with a letter or number.</p></div>
    </fieldset>
    <button className="button registration-submit" type="submit" disabled={registrationDisabled}>{submitting ? "Creating your account…" : "Create account & group"} <ArrowRight size={18}/></button>
    {message && <p className="registration-message" role="status">{message}</p>}
  </form>;
}
