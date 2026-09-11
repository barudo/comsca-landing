import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services — COMSCA",
  description: "Explore COMSCA’s tools for managing groups, members, savings, loans, financial reports, and cycle distributions.",
};

const serviceGroups = [
  {
    title: "Organize your group",
    description: "Give your community a clear structure and a space of its own.",
    features: [
      ["Group Management", "Create and manage COMSCA groups with a unique group slug, keeping each group’s data separate."],
      ["Membership Management", "Register members, maintain profiles, update membership status, and organize everyone within your group."],
      ["Roles & Permissions", "Assign Owner, Treasurer, Secretary, or Member roles and control what each person can view or do."],
      ["Group Administration", "Let group owners and administrators manage members, roles, cycles, and operational settings."],
      ["Secure Group Portal", "Access your group through a dedicated address such as group-slug.comsca.com, with sign-in and data isolated to your group."],
    ],
  },
  {
    title: "Manage everyday finances",
    description: "Keep contributions, loans, and every movement of money connected.",
    features: [
      ["Savings Management", "Record and track each member’s savings and contributions throughout every cycle."],
      ["Loan Management", "Record loans issued to members, including principal, interest, repayments, outstanding balances, and loan status."],
      ["Transaction Management", "Maintain financial transactions linked to the correct COMSCA group and operating cycle."],
      ["Member Ledger", "View each member’s history of savings, loans, repayments, and other financial transactions."],
      ["Cash & Fund Tracking", "Track available funds, collections, money lent out, repayments, expenses, and other fund movements."],
    ],
  },
  {
    title: "Follow each cycle through",
    description: "Understand your progress and prepare for what comes next.",
    features: [
      ["Cycle Management", "Create operating cycles, such as June–May, and designate one as your group’s current active cycle."],
      ["Financial Reports", "Generate summaries of savings, loans, outstanding balances, income, expenses, and overall group finances."],
      ["Cycle Closing & Distribution", "Close completed cycles, calculate member entitlements, and record distribution or share-out amounts."],
      ["Notifications & Reminders", "Notify members and officers about contributions, loan payments, meetings, cycle deadlines, and other group activities."],
      ["Platform Administration", "Give COMSCA platform administrators tools to approve and activate newly registered groups and manage group accounts."],
    ],
  },
];

const coreWorkflow = ["Groups", "Members", "Cycles", "Savings", "Loans", "Repayments", "Transactions", "Reports", "Cycle Closing"];

export default function Services() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><nav className="nav container" aria-label="Main navigation">
      <a href="/" className="brand" aria-label="COMSCA home"><span className="brand-icon"><Sprout size={25} strokeWidth={2.2}/></span>comsca<span className="brand-period">.</span></a>
      <div className="nav-links"><a href="/services" aria-current="page">Our Services</a><a href="/#benefits">The benefits</a></div>
      <a className="nav-cta" href="/register">Create your group <ArrowUpRight size={16}/></a>
    </nav></header>
    <main id="main" className="container">
      <section className="services services-page" id="services" aria-labelledby="services-title">
        <div className="section-heading"><div><div className="eyebrow">OUR SERVICES</div><h1 id="services-title">From your first member<br/>to your next share-out.</h1></div><p>Manage your group’s daily activities and see how it prospers. Keep your people, financial records, and operating cycles connected in one place.</p></div>
        <div className="core-workflow" aria-labelledby="workflow-title">
          <h3 id="workflow-title">Your core group workflow</h3>
          <ol>{coreWorkflow.map((step, index) => <li key={step}><span>{step}</span>{index < coreWorkflow.length - 1 && <ArrowRight size={14} aria-hidden="true"/>}</li>)}</ol>
        </div>
        <div className="service-groups">{serviceGroups.map(group => <div className="service-group" key={group.title}>
          <div className="service-group-heading"><h3>{group.title}</h3><p>{group.description}</p></div>
          <div className="service-grid">{group.features.map(([title, description]) => <article className="service-card" key={title}><h4>{title}</h4><p>{description}</p></article>)}</div>
        </div>)}</div>
        <div className="service-signup"><h2>Ready to bring your group together?</h2><p>Start with your account and a home for your COMSCA group.</p><a className="button" href="/register">Create your group <ArrowRight size={18}/></a></div>
      </section>
    </main>
    <footer className="footer"><div className="container footer-row"><a href="/" className="brand footer-brand"><span className="brand-icon"><Sprout size={19}/></span>comsca.</a><span className="footer-message">Clear records. Shared progress.</span><span className="copyright">© {new Date().getFullYear()} COMSCA</span><a href="/services">Explore the features <ArrowUpRight size={14}/></a></div></footer>
  </>;
}
