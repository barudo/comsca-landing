import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChartNoAxesCombined, Sprout, Users, NotebookPen, ShieldCheck } from "lucide-react";

const benefits = [
  { number: "01", icon: NotebookPen, title: "Keep activities in one place", description: "Record your COMSCA group’s activities online. Keep a clear history of what happens in your group, so it’s easier to stay organized and look back when you need to.", tag: "Every activity. A clearer record." },
  { number: "02", icon: ChartNoAxesCombined, title: "See your group’s progress", description: "Turn your group’s records into useful views of how it’s doing over time. Follow your progress, spot patterns, and see how your shared efforts add up.", tag: "Clear views. Meaningful progress." },
  { number: "03", icon: Users, title: "Move forward together", description: "Bring a clearer picture of your group to every discussion. Use your records and progress views to celebrate milestones and plan your next steps together.", tag: "Better insight. Shared decisions." },
];

function CommunityIllustration() {
  return <div className="illustration" role="img" aria-label="Illustration of a community growing their shared savings, with a savings jar and flourishing plant">
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <span className="spark spark-one">✦</span><span className="spark spark-two">✦</span><span className="little-dot" />
    <div className="floating-note community-note"><span className="note-icon"><Users size={20}/></span><span>Your group’s activities<strong>Organized in one place</strong></span></div>
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
    <div className="floating-note savings-note"><span className="success-icon"><Check size={18}/></span><span>See your progress.<strong>Plan your next steps.</strong></span></div>
    <div className="art-caption"><span /> Your records. Your progress. Together.</div>
  </div>;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><nav className="nav container" aria-label="Main navigation">
      <a href="#" className="brand" aria-label="COMSCA home"><span className="brand-icon"><Sprout size={25} strokeWidth={2.2}/></span>comsca<span className="brand-period">.</span></a>
      <div className="nav-links"><a href="/services">Our Services</a><a href="#benefits">The benefits</a></div>
      <a className="nav-cta" href="/register">Create your group <ArrowUpRight size={16}/></a>
    </nav></header>
    <main id="main" className="container">
      <section className="hero" id="about" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span/> ONLINE TOOLS FOR COMSCA GROUPS.</div>
          <h1 id="hero-title">Clear records.<br/>Stronger<br/><span>groups.</span></h1>
          <p className="hero-description">COMSCA is a digital savings and credit management platform that helps community groups manage members, savings, loans, repayments, financial records, and cycle distributions in one secure system.</p>
          <div className="hero-actions"><a className="button" href="/register">Create your group <ArrowRight size={18}/></a><a className="text-link" href="/services">See Features <ArrowRight size={18}/></a></div>
          <div className="trust-line"><ShieldCheck size={17}/><span>Built for COMSCA groups. Focused on your shared progress.</span></div>
        </div>
        <CommunityIllustration/>
      </section>
      <section className="benefits" id="benefits" aria-labelledby="benefits-title">
        <div className="section-heading"><div><div className="eyebrow">RECORD. UNDERSTAND. GROW.</div><h2 id="benefits-title">Help your group thrive.</h2></div><p>Your group puts in the work. <strong>Our service helps you see the progress.</strong> Bring your activities and insights together online to support the way you manage and grow your COMSCA group.</p></div>
        <div className="benefit-grid">{benefits.map(({number, icon: Icon, title, description, tag}) => <article className="benefit-card" key={number}><div className="card-top"><span className="card-icon"><Icon size={25} strokeWidth={1.6}/></span><span className="card-number">{number}</span></div><h3>{title}</h3><p>{description}</p><div className="card-tag"><span/> {tag}</div></article>)}</div>
        <div className="closing-note"><Users size={16}/><span>A clearer picture today. A stronger group tomorrow.</span><ArrowDown size={14}/></div>
      </section>
    </main>
    <footer className="footer"><div className="container footer-row"><a href="#" className="brand footer-brand"><span className="brand-icon"><Sprout size={19}/></span>comsca.</a><span className="footer-message">Clear records. Shared progress.</span><span className="copyright">© {new Date().getFullYear()} COMSCA</span><a href="/services">Explore the features <ArrowUpRight size={14}/></a></div></footer>
  </>;
}
