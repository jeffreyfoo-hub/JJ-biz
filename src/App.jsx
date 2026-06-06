import { useState, useEffect, useRef } from "react";

/* ============================================================
   EDIT YOUR CONTENT HERE — change text between the quote marks.
   [[COMPANY NAME]] is a placeholder — replace it everywhere.
   ============================================================ */

const COMPANY = "[[Company Name]]";        // <-- replace when finalised
const TAGLINE = "Technology that helps organisations do more.";
const SUBLINE = "We help associations, schools, and community organisations adopt practical AI and digital systems — designed to be efficient, trustworthy, and built to last.";

const NAV_LINKS = ["About", "What We Do", "Our Work", "Partners", "Contact"];

const STATS = [
  { number: "589", label: "Ballots processed by AI" },
  { number: "3 weeks", label: "Concept to deployment" },
  { number: "2,000+", label: "Members served" },
  { number: "1st", label: "Clan-association AI election in Singapore" },
];

const SERVICES = [
  {
    title: "AI Implementation",
    desc: "We design and deploy practical AI systems for organisations — from first concept to a working, day-one solution your team can actually run.",
    tags: ["Workflow Design", "OCR & Automation", "Prompt Engineering"],
  },
  {
    title: "Digital Transformation",
    desc: "End-to-end help moving from manual processes to digital ones — systems, records, and the change management that makes adoption stick.",
    tags: ["Process Redesign", "Cloud Systems", "Change Management"],
  },
  {
    title: "Governance & Compliance",
    desc: "Systems that are not just efficient, but auditable and trustworthy — aligned with Singapore's regulatory expectations for associations and charities.",
    tags: ["Audit Trails", "Societies Act", "Policy Design"],
  },
  {
    title: "Training & Enablement",
    desc: "Programmes that make technology accessible to volunteers and non-technical teams, delivered bilingually in English and Mandarin.",
    tags: ["Team Training", "SOP Design", "Bilingual Delivery"],
  },
];

const CASE_STEPS = [
  { phase: "01", title: "The Problem", desc: "A 2,000-member federation needed a faster, more accurate, fully auditable way to count 589 election ballots." },
  { phase: "02", title: "The System", desc: "A complete AI-assisted workflow built in three weeks: scan, distribute, AI-read, human-verify, auto-tally — with integrity checks at every step." },
  { phase: "03", title: "The Team", desc: "Eleven volunteers trained across four roles, supported by bilingual training materials." },
  { phase: "04", title: "The Result", desc: "All ballots processed with a full audit trail, anomalies flagged and resolved, and results declared the same day — with management's full confidence." },
];

const PARTNERS = [
  { name: "Jeffrey Foo 胡浩仁", role: "Co-Founder", desc: "Deputy Director–level technology and digital-transformation leadership. Two decades across infrastructure, endpoints, and change management for large organisations." },
  { name: "Jackson", role: "Co-Founder", desc: "Partner in delivery and client engagement, focused on bringing practical technology to community and non-profit organisations." },
];

/* ============================================================ */

export default function App() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const idOf = (s) => s.toLowerCase().replace(/[^a-z]/g, "-");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      NAV_LINKS.forEach((l) => {
        const el = document.getElementById(idOf(l));
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 140 && r.bottom >= 140) setActive(l);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (s) => {
    const el = document.getElementById(idOf(s));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const INK = "#16213A";
  const ACCENT = "#1F6FEB";
  const MUTED = "#5A6577";

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, system-ui, sans-serif", background: "#FFFFFF", color: INK, minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid #ECEFF4" : "1px solid transparent",
        transition: "all 0.3s ease", padding: "0 clamp(20px,5vw,56px)",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 34, height: 34, background: ACCENT, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px",
          }}>JJ</div>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", color: INK, fontFamily: "'Fraunces','Georgia',serif" }}>
            {COMPANY}
          </span>
        </div>
        <div className="navlinks" style={{ display: "flex", gap: 30 }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13.5, fontWeight: 500, letterSpacing: "0.2px",
              color: active === l ? ACCENT : MUTED, transition: "color 0.2s",
            }}>{l}</button>
          ))}
        </div>
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22, color: INK,
        }}>☰</button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: "#fff",
          borderBottom: "1px solid #ECEFF4", display: "flex", flexDirection: "column", padding: "8px 24px 16px",
        }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", textAlign: "left", padding: "12px 0",
              fontSize: 15, color: INK, cursor: "pointer", borderBottom: "1px solid #F4F6FA",
            }}>{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <header id="about" style={{
        minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px clamp(20px,5vw,56px) 80px", maxWidth: 1180, margin: "0 auto", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: "45%", height: "100%",
          background: "linear-gradient(135deg, rgba(31,111,235,0.04), rgba(31,111,235,0))",
          borderLeft: "1px solid #F0F3F9", zIndex: 0,
        }} className="herobg" />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div style={{
            display: "inline-block", fontSize: 12.5, fontWeight: 600, letterSpacing: "1.5px",
            textTransform: "uppercase", color: ACCENT, marginBottom: 28,
            padding: "6px 14px", border: `1px solid ${ACCENT}`, borderRadius: 100,
          }}>Technology Consultancy · Singapore</div>
          <h1 style={{
            fontFamily: "'Fraunces','Georgia',serif", fontSize: "clamp(38px,6vw,66px)",
            lineHeight: 1.05, fontWeight: 600, letterSpacing: "-1.5px", margin: 0, color: INK,
          }}>{TAGLINE}</h1>
          <p style={{
            fontSize: "clamp(16px,2vw,19px)", lineHeight: 1.65, color: MUTED,
            margin: "28px 0 40px", maxWidth: 580,
          }}>{SUBLINE}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Contact")} style={{
              background: ACCENT, color: "#fff", border: "none", padding: "15px 30px",
              fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(31,111,235,0.25)",
            }}>Get in touch</button>
            <button onClick={() => scrollTo("Our Work")} style={{
              background: "#fff", color: INK, border: "1px solid #D9DFEA", padding: "15px 30px",
              fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: "pointer",
            }}>See our work</button>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section ref={statsRef} style={{ background: "#F8FAFD", borderTop: "1px solid #EEF2F8", borderBottom: "1px solid #EEF2F8", padding: "56px clamp(20px,5vw,56px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 32 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ease ${i * 0.1}s`,
            }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 40, fontWeight: 600, color: ACCENT, letterSpacing: "-1px" }}>{s.number}</div>
              <div style={{ fontSize: 14, color: MUTED, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="what-we-do" style={{ padding: "96px clamp(20px,5vw,56px)", maxWidth: 1180, margin: "0 auto" }}>
        <SectionHead kicker="What We Do" title="Practical technology, delivered end to end" accent={ACCENT} ink={INK} muted={MUTED} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginTop: 56 }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="card" style={{
              border: "1px solid #EAEEF5", borderRadius: 14, padding: "32px 28px", background: "#fff",
              transition: "all 0.25s ease",
            }}>
              <div style={{ width: 40, height: 4, background: ACCENT, borderRadius: 4, marginBottom: 22 }} />
              <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 21, fontWeight: 600, margin: 0, color: INK }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: MUTED, margin: "14px 0 20px" }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.tags.map((t) => (
                  <span key={t} style={{ fontSize: 12, color: ACCENT, background: "rgba(31,111,235,0.07)", padding: "5px 11px", borderRadius: 100, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR WORK / CASE STUDY */}
      <section id="our-work" style={{ background: "#0F1B33", color: "#EAF0FA", padding: "96px clamp(20px,5vw,56px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6FA8FF", marginBottom: 16 }}>Featured Case Study</div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 600, letterSpacing: "-1px", margin: 0, maxWidth: 720, lineHeight: 1.15 }}>
            Singapore's first AI-assisted clan-association board election
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(234,240,250,0.7)", margin: "20px 0 56px", maxWidth: 640 }}>
            How we took a 2,000-member federation from manual ballot counting to a fully auditable, same-day result — in three weeks.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 28 }}>
            {CASE_STEPS.map((c) => (
              <div key={c.phase} style={{ borderTop: "2px solid #2A3A5C", paddingTop: 20 }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 30, fontWeight: 600, color: "#6FA8FF" }}>{c.phase}</div>
                <h4 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 8px" }}>{c.title}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(234,240,250,0.65)", margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" style={{ padding: "96px clamp(20px,5vw,56px)", maxWidth: 1180, margin: "0 auto" }}>
        <SectionHead kicker="Partners" title="Two partners, one standard" accent={ACCENT} ink={INK} muted={MUTED} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28, marginTop: 56 }}>
          {PARTNERS.map((p, i) => (
            <div key={i} style={{ border: "1px solid #EAEEF5", borderRadius: 14, padding: "36px 32px", background: "#FBFCFE" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 600, marginBottom: 20 }}>
                {p.name.charAt(0)}
              </div>
              <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 600, margin: 0, color: INK }}>{p.name}</h3>
              <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, letterSpacing: "0.3px", margin: "6px 0 16px", textTransform: "uppercase" }}>{p.role}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: MUTED, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#F8FAFD", borderTop: "1px solid #EEF2F8", padding: "96px clamp(20px,5vw,56px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>Contact</div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, letterSpacing: "-1px", margin: 0, color: INK, lineHeight: 1.15 }}>
            Let's talk about your organisation
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: MUTED, margin: "20px 0 36px" }}>
            Whether you're an association, a school, or a non-profit exploring AI and digital systems — we'd be glad to discuss what's practical for you.
          </p>
          <a href="mailto:hello@example.com" style={{
            display: "inline-block", background: ACCENT, color: "#fff", textDecoration: "none",
            padding: "16px 36px", fontSize: 16, fontWeight: 600, borderRadius: 8,
            boxShadow: "0 8px 24px rgba(31,111,235,0.25)",
          }}>Email us</a>
          <p style={{ fontSize: 13, color: MUTED, marginTop: 18 }}>Replace with your real email — currently a placeholder.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px clamp(20px,5vw,56px)", maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <span style={{ fontSize: 13, color: MUTED }}>© {new Date().getFullYear()} {COMPANY}. Singapore.</span>
        <span style={{ fontSize: 13, color: MUTED, fontFamily: "'Fraunces',serif" }}>Jeffrey · Jackson</span>
      </footer>

      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        html { scroll-behavior: smooth; }
        .card:hover { border-color: #1F6FEB; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(22,33,58,0.08); }
        @media (max-width: 820px) {
          .navlinks { display: none !important; }
          .burger { display: block !important; }
          .herobg { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function SectionHead({ kicker, title, accent, ink, muted }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: accent, marginBottom: 16 }}>{kicker}</div>
      <h2 style={{ fontFamily: "'Fraunces','Georgia',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 600, letterSpacing: "-1px", margin: 0, color: ink, lineHeight: 1.15 }}>{title}</h2>
    </div>
  );
}
