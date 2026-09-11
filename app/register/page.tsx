import type { Metadata } from "next";
import { Sprout, ArrowLeft } from "lucide-react";
import RegistrationForm from "./registration-form";

export const metadata: Metadata = {
  title: "Create your group — COMSCA",
  description: "Create your COMSCA account and set up your community group.",
};

export default function Register() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><nav className="nav container" aria-label="Main navigation">
      <a href="/" className="brand" aria-label="COMSCA home"><span className="brand-icon"><Sprout size={25} strokeWidth={2.2}/></span>comsca<span className="brand-period">.</span></a>
      <a className="text-link" href="/"><ArrowLeft size={16}/> Back to home</a>
    </nav></header>
    <main id="main" className="registration container">
      <div className="registration-heading"><div className="eyebrow">START YOUR GROUP’S NEXT CHAPTER</div><h1>Create your account<br/>and your group.</h1><p>A shared space for your members, records, and progress.</p></div>
      <RegistrationForm/>
    </main>
  </>;
}
