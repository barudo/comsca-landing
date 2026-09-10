import { ArrowDown, ArrowRight, ArrowUpRight, Check, HeartHandshake, Sprout, Users, Wallet, ShieldCheck } from "lucide-react";

const benefits = [
  { number: "01", icon: Wallet, title: "Make saving a habit", description: "Small contributions can make a meaningful difference. Save regularly with your group and build a fund for the things that matter.", tag: "Small steps. Lasting progress." },
  { number: "02", icon: Sprout, title: "Open new possibilities", description: "Access loans from your group’s pooled savings to support a livelihood, meet household needs, or take the next step toward your goals.", tag: "Local savings. Local opportunity." },
  { number: "03", icon: HeartHandshake, title: "Grow stronger, together", description: "Be part of a community that looks out for each other. A shared social fund can help members through emergencies and unexpected needs.", tag: "A little support goes a long way." },
];

function CommunityIllustration() {
  return <div className="illustration" role="img" aria-label="Illustration of a community growing their shared savings, with a savings jar and flourishing plant">
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <span className="spark spark-one">✦</span><span className="spark spark-two">✦</span><span className="little-dot" />
    <div className="floating-note community-note"><span className="note-icon"><Users size={20}/></span><span>Rooted in community<strong>Growing together</strong></span></div>
    <svg className="savings-art" viewBox="0 0 500 430" fill="none" aria-hidden="true">
      <ellipse cx="250" cy="376" rx="164" ry="17" fill="#DCE9FF"/>
      <path d="M303 300V163" stroke="#2058B8" strokeWidth="7" strokeLinecap="round"/>
      <path d="M303 226C260 230 232 208 233 175C278 171 303 192 303 226Z" fill="#7EA9EF"/>
      <path d="M303 191C304 146 331 122 367 127C366 165 341 190 303 191Z" fill="#2B69CC"/>
      <path d="M303 166C271 151 260 125 275 99C306 111 316 137 303 166Z" fill="#A6C5F5"/>
      <path d="M303 262C307 223 332 208 362 215C358 247 334 267 303 262Z" fill="#5D90E0"/>
      <path d="M266 282H342L331 367C329 376 277 376 275 367L266 282Z" fill="#C9DDFB"/>
      <path d="M263 281H345V296H263V281Z" fill="#ADCDF8"/>
      <rect x="119" y="218" width="135" height="155" rx="27" fill="#F9FCFF" stroke="#2C64BE" strokeWidth="3"/>
      <path d="M126 279C153 266 171 285 192 277C213 269 227 268 247 277V344C247 359 237 366 223 366H148C133 366 126 355 126 343V279Z" fill="#D6E6FF"/>
      <rect x="113" y="206" width="147" height="24" rx="9" fill="#2B65C5"/>
      <path d="M157 217H215" stroke="#153E86" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="187" cy="305" r="30" fill="#FFF" stroke="#9FBEF0" strokeWidth="2"/>
      <path d="M178 319V289H190C202 289 202 307 190 307H173M173 296H201M173 302H198" stroke="#3069C7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="188" cy="170" r="23" fill="#A9C8F6" stroke="#3770CB" strokeWidth="2"/>
      <path d="M188 155V185M195 161H184C176 161 176 170 184 170H191C199 170 199 179 191 179H180" stroke="#245AB1" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M187 123V131M170 128L173 134M205 128L202 134" stroke="#86ABE5" strokeWidth="2" strokeLinecap="round"/>
      <rect x="87" y="355" width="43" height="12" rx="5" fill="#72A1E8"/>
      <rect x="87" y="344" width="43" height="12" rx="5" fill="#B3CFF8"/>
      <rect x="91" y="333" width="43" height="12" rx="5" fill="#D3E3FA"/>
    </svg>
    <div className="floating-note savings-note"><span className="success-icon"><Check size={18}/></span><span>A little today.<strong>A brighter tomorrow.</strong></span></div>
    <div className="art-caption"><span /> Built on trust. Grown together.</div>
  </div>;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><nav className="nav container" aria-label="Main navigation">
      <a href="#" className="brand" aria-label="COMSCA home"><span className="brand-icon"><Sprout size={25} strokeWidth={2.2}/></span>comsca<span className="brand-period">.</span></a>
      <div className="nav-links"><a href="#about">About COMSCA</a><a href="#benefits">The benefits</a></div>
      <a className="nav-cta" href="https://comsca.worldvision.org.ph/contact/" target="_blank" rel="noreferrer">Get involved <ArrowUpRight size={16}/></a>
    </nav></header>
    <main id="main" className="container">
      <section className="hero" id="about" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span/> PEOPLE. PURPOSE. POSSIBILITIES.</div>
          <h1 id="hero-title">Small savings.<br/>Stronger<br/><span>communities.</span></h1>
          <p className="hero-description">Big change starts with what we can do together. COMSCA brings people together to save, support one another, and build a more secure future.</p>
          <div className="hero-actions"><a className="button" href="#benefits">Discover the benefits <ArrowRight size={18}/></a><a className="text-link" href="https://comsca.worldvision.org.ph/about/" target="_blank" rel="noreferrer">How it works <ArrowUpRight size={16}/></a></div>
          <div className="trust-line"><ShieldCheck size={17}/><span>Community-owned. Member-managed. Together, for everyone.</span></div>
        </div>
        <CommunityIllustration/>
      </section>
      <section className="benefits" id="benefits" aria-labelledby="benefits-title">
        <div className="section-heading"><div><div className="eyebrow">A SIMPLE IDEA. A SHARED FUTURE.</div><h2 id="benefits-title">Better together, in every way.</h2></div><p>COMSCA stands for <strong>Community Managed Savings and Credit Association.</strong> It’s a locally run savings group that puts the power of progress in its members’ hands.</p></div>
        <div className="benefit-grid">{benefits.map(({number, icon: Icon, title, description, tag}) => <article className="benefit-card" key={number}><div className="card-top"><span className="card-icon"><Icon size={25} strokeWidth={1.6}/></span><span className="card-number">{number}</span></div><h3>{title}</h3><p>{description}</p><div className="card-tag"><span/> {tag}</div></article>)}</div>
        <div className="closing-note"><Users size={16}/><span>When we save together, we move forward together.</span><ArrowDown size={14}/></div>
      </section>
    </main>
    <footer className="footer"><div className="container footer-row"><a href="#" className="brand footer-brand"><span className="brand-icon"><Sprout size={19}/></span>comsca.</a><span className="footer-message">Small beginnings. Shared possibilities.</span><span className="copyright">© {new Date().getFullYear()} COMSCA</span><a href="https://comsca.worldvision.org.ph/" target="_blank" rel="noreferrer">Explore the COMSCA Network <ArrowUpRight size={14}/></a></div></footer>
  </>;
}
