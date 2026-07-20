import Link from "next/link";
import BrandLink from "@/components/branding/BrandLink";
import BookingForm from "./BookingForm";
import MobileBookingBar from "./MobileBookingBar";
import MobileMenu from "./MobileMenu";
import HeroSupportingCopy from "./HeroSupportingCopy";
import PricingCards from "./PricingCards";
import PricingFaq from "./PricingFaq";
import ServiceIcon from "./ServiceIcon";
import TrackedLink from "./TrackedLink";
import orderStyles from "./BookingOrder.module.css";
import serviceStyles from "./ServiceIcons.module.css";

const services = [
  ["landing", "AI Landing Pages", "Conversion-focused pages with intelligent lead capture, persuasive copy, and fast mobile performance."],
  ["booking", "Booking Automation", "Automated scheduling, confirmations, reminders, intake, and follow-up so fewer prospects fall through."],
  ["response", "Lead Response Systems", "Instant replies, qualification workflows, CRM routing, and personalized nurture sequences."],
  ["automation", "Business Automation", "Connected workflows that reduce repetitive admin work across forms, email, payments, and operations."],
] as const;

const process = [
  ["01", "Discover", "We map the bottlenecks, customer journey, and highest-value automation opportunities."],
  ["02", "Architect", "We design the page, integrations, data flow, and automation logic around your business."],
  ["03", "Build", "We develop, test, optimize, and launch a reliable system your team can actually use."],
];

export default function Home() {
  return (
    <main className={orderStyles.page}>
      <nav className={`nav shell ${orderStyles.navigation}`} aria-label="Primary navigation">
        <BrandLink className="brand" href="#top" variant="compactDark" logoWidth={176} priority />
        <div className="navlinks"><a href="#services">Services</a><a href="#process">Process</a><a href="#pricing">Pricing</a><Link href="/blog">Blog</Link><Link href="/docs">Docs</Link><a href="#booking">Booking</a></div>
        <a className="button button-small" href="#booking">Book a strategy call</a>
        <MobileMenu />
      </nav>

      <section className={`hero shell ${orderStyles.hero}`} id="top">
        <div className="hero-copy">
          <p className="eyebrow">AI automation consulting · Atlanta</p>
          <h1>Turn repetitive work into <em>intelligent systems.</em></h1>
          <HeroSupportingCopy />
          <div className="actions"><TrackedLink className="button" href="#booking" eventName="Hero CTA Click" eventData={{ location: "hero", label: "Book a free strategy call" }}>Book a free strategy call</TrackedLink><a className="text-link" href="#services">Explore services →</a></div>
          <div className="proof"><div><strong>Faster</strong><span>lead response</span></div><div><strong>Less</strong><span>manual work</span></div><div><strong>More</strong><span>room to grow</span></div></div>
        </div>
        <div className="hero-visual" aria-label="Automation workflow illustration">
          <div className="orb"></div>
          <div className="system-card main-card"><p>METAPHOR OS</p><h3>New lead captured</h3><span className="status">● Automation running</span><div className="metric"><b>42 sec</b><small>response time</small></div></div>
          <div className="system-card floating-card"><span>✓</span><div><b>Booking confirmed</b><small>Follow-up sent automatically</small></div></div>
        </div>
      </section>

      <section className={`marquee ${orderStyles.marquee}`}><p>LANDING PAGES <span>✦</span> AUTOMATION <span>✦</span> LEAD CAPTURE <span>✦</span> BOOKING SYSTEMS <span>✦</span> AI WORKFLOWS</p></section>

      <section className={`section shell ${orderStyles.services}`} id="services">
        <div className="section-heading"><p className="eyebrow">What we build</p><h2>Your digital front door should do more than look good.</h2><p>We combine strategy, design, development, and automation into systems that actively move prospects toward becoming customers.</p></div>
        <div className="service-grid">{services.map(([icon, title, text], i) => <article className="service-card" key={title}><div className={serviceStyles.header}><span className={serviceStyles.icon}><ServiceIcon name={icon} /></span><span className={serviceStyles.number}>0{i + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={`section dark-section ${orderStyles.process}`} id="process"><div className="shell"><div className="section-heading"><p className="eyebrow">Our process</p><h2>From scattered tools to one clear system.</h2></div><div className="process-grid">{process.map(([num, title, text]) => <article key={num}><b>{num}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className={`section shell founder ${orderStyles.founder}`}><div><p className="eyebrow">Founder-led consulting</p><h2>Strategy meets hands-on execution.</h2></div><div><p>Metaphor Consulting is led by Coco, an AI orchestrator, systems architect, consultant, and lead developer. Every engagement is shaped around practical business outcomes—not technology for technology’s sake.</p><p>Our mission is to make powerful automation accessible to growing businesses. Our vision is a future where small teams operate with the speed, consistency, and intelligence of much larger organizations.</p></div></section>

      <section className={`section shell ${orderStyles.pricing}`} id="pricing"><div className="section-heading"><p className="eyebrow">Investment</p><h2>Start with the system your business needs now.</h2></div><PricingCards /><p className="turnaround">Typical turnaround: 7–14 business days for focused builds; custom systems are scoped individually.</p><PricingFaq /></section>

      <section className={`booking-section ${orderStyles.booking}`} id="booking"><div className="shell"><div className="booking-layout"><div className="booking-copy"><p className="eyebrow">Book a free strategy call</p><h2>Let’s map the system your business needs next.</h2><p>Choose a preferred date and time window, tell us what you want to improve, and we’ll review your request before confirming the appointment.</p><div className="booking-points"><span>✓ No public email required</span><span>✓ Secure Supabase submission</span><span>✓ Mobile-friendly scheduling</span></div></div><BookingForm /></div><div className={orderStyles.backToTopWrap}><a className={orderStyles.backToTop} href="#top" aria-label="Back to the top of the page"><span aria-hidden="true">↑</span>Back to top</a></div></div></section>

      <footer className={`shell ${orderStyles.footer}`}><BrandLink className="brand" href="#top" variant="compactDark" logoWidth={176} /><p>AI automation and digital systems for growing businesses.</p><small>© 2026 Metaphor Consulting. All rights reserved.</small></footer>
      <MobileBookingBar />
    </main>
  );
}
