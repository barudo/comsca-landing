"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [registeredPhone, setRegisteredPhone] = useState("");
  const pending = useRef(false);
  const otpInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (registeredPhone) otpInput.current?.focus();
  }, [registeredPhone]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(["firstname", "lastname", "phone", "groupName", "slug", "password"].map(key => [key, data.get(key)]));
    pending.current = true;
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-group-slug": "www" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.message || "Registration could not be completed. Please try again.");
        return;
      }
      form.reset();
      setRegisteredPhone(String(payload.phone));
    } catch {
      setMessage("We couldn’t connect to the registration service. Please try again.");
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  }

  if (registeredPhone) return <form className="registration-form" onSubmit={event => event.preventDefault()} aria-labelledby="otp-title">
    <h2 id="otp-title">Check your phone</h2>
    <p className="otp-description" role="status">Check your phone number for the OTP sent to +63 {registeredPhone}.</p>
    <div className="form-field"><label htmlFor="otp">One-time password (OTP)</label><input ref={otpInput} id="otp" name="otp" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]+" required aria-describedby="otp-help"/></div>
    <p id="otp-help" className="field-help">Phone verification will be available here soon.</p>
    <button className="button registration-submit" type="submit" disabled>Verify phone number <ArrowRight size={18}/></button>
  </form>;

  return <form className="registration-form" onSubmit={handleSubmit} aria-busy={submitting}>
    <fieldset disabled={submitting}>
      <legend>Your account</legend>
      <div className="form-row">
        <div className="form-field"><label htmlFor="firstname">First name</label><input id="firstname" name="firstname" autoComplete="given-name" required maxLength={100}/></div>
        <div className="form-field"><label htmlFor="lastname">Last name</label><input id="lastname" name="lastname" autoComplete="family-name" required maxLength={100}/></div>
      </div>
      <div className="form-field"><label htmlFor="phone">Phone number</label><div className="phone-input"><span id="phone-prefix">+63</span><input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="9171234567" required pattern="[0-9]{10}" minLength={10} maxLength={10} title="Enter your 10-digit phone number without +63 or the leading 0." aria-describedby="phone-prefix phone-help"/></div><p id="phone-help" className="field-help">Enter 10 digits, without the country code or leading 0.</p></div>
      <div className="form-field"><label htmlFor="password">Password</label><div className="password-input"><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required aria-describedby="password-help"/><button type="button" onClick={() => setShowPassword(!showPassword)} aria-controls="password" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div><p id="password-help" className="field-help">Use at least 8 characters.</p></div>
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
      <div className="form-field"><label htmlFor="slug">Group address (slug)</label><div className="slug-input"><input id="slug" name="slug" value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="mabuhay" autoCapitalize="none" autoCorrect="off" spellCheck={false} required minLength={3} maxLength={63} pattern="[a-z0-9]+(-[a-z0-9]+)*" title="Use lowercase letters, numbers, and hyphens, with no hyphen at the start or end." aria-describedby="slug-help slug-suffix"/><span id="slug-suffix">.comsca.com</span></div><p id="slug-help" className="field-help">Choose 3–63 lowercase letters, numbers, or hyphens. Start and end with a letter or number.</p></div>
    </fieldset>
    <button className="button registration-submit" type="submit" disabled={submitting}>{submitting ? "Creating your account…" : "Create account & group"} <ArrowRight size={18}/></button>
    {message && <p className="registration-message" role="status">{message}</p>}
  </form>;
}
