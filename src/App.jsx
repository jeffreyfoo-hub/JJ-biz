import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Capabilities", "AI Work", "Case Study", "Community", "Contact"];

const STATS = [
  { number: "2,000+", label: "Association Members Served" },
  { number: "589", label: "Ballots Processed by AI" },
  { number: "3 Weeks", label: "From Concept to Deployment" },
  { number: "1st", label: "In Singapore — Clan Association AI Election" },
];

const CAPABILITIES = [
  {
    icon: "⬡",
    title: "AI Implementation",
    desc: "Designing and deploying practical AI systems for community organisations — from concept to working solution. Proven case study: NHF 45th Board Election.",
    tags: ["Claude AI", "Prompt Engineering", "OCR", "Workflow Design"],
  },
  {
    icon: "◈",
    title: "Digital Transformation",
    desc: "End-to-end process redesign for organisations transitioning from manual to digital. Infrastructure, endpoints, and change management.",
    tags: ["GovTech", "Process Redesign", "Cloud Systems", "Change Management"],
  },
  {
    icon: "◎",
    title: "Governance & Compliance",
    desc: "Building systems that are not just efficient — but auditable, trustworthy, and compliant with Singapore's regulatory requirements for associations and charities.",
    tags: ["Societies Act", "Charities Act", "Audit Trails", "Policy Design"],
  },
  {
    icon: "◉",
    title: "Training & Enablement",
    desc: "Designing training programmes that make complex technology accessible to volunteers and non-technical teams. Bilingual delivery in English and Mandarin.",
    tags: ["Team Training", "SOP Design", "Bilingual", "Volunteer Teams"],
  },
];

const TIMELINE = [
  { phase: "01", title: "Problem Identified", desc: "NHF 45th Board Election needed a faster, more accurate, and auditable vote counting process for 589 ballots across 2,000+ members.", color: "#0EA5E9" },
  { phase: "02", title: "System Designed", desc: "Complete AI-assisted workflow built in 3 weeks: scan → cloud distribution → Claude AI OCR → human verification → automated tally with integrity checks.", color: "#8B5CF6" },
  { phase: "03", title: "Team Trained", desc: "11 volunteers trained across 4 roles — operators, auditors, scanners, and coordinators. Bilingual training materials produced.", color: "#F59E0B" },
  { phase: "04", title: "Election Day Deployed", desc: "589 ballots processed, 253 anomalies flagged and resolved, full audit trail generated. Results declared same day with management confidence.", color: "#10B981" },
  { phase: "05", title: "Results", desc: "Director top 36 and Auditor top 7 rankings produced with integrity checks confirming zero governance violations. A first in Singapore.", color: "#EF4444" },
];

const COMMUNITY_ROLES = [
  { org: "永定会馆", en: "Eng Teng Association", role: "Secretary-General 秘书长" },
  { org: "丰永大公会", en: "Fong Yun Thai Association", role: "Secretary-General 秘书长" },
  { org: "南洋客属总会", en: "Nanyang Hakka Federation", role: "Investment Lead 投资组长" },
  { org: "南洋胡氏总会", en: "Nanyang Hwu Clan", role: "Deputy Secretary-General" },
  { org: "SFCCA", en: "Singapore Federation of Chinese Clan Associations", role: "Social Affairs Committee" },
  { org: "育能小学", en: "Yu Neng Primary School", role: "School Advisory Committee" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase().replace(" ", "-")));
      sections.forEach((sec, i) => {
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(NAV_LINKS[i]);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisibleStats(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(" ", "-"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0A0E1A", color: "#E8EDF5", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,14,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "all 0.4s ease",
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 32, height: 32, background: "linear-gradient(135deg, #0EA5E9, #8B5CF6)",
            borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "white",
          }}>JF</div>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.5px", color: "#E8EDF5" }}>
            Jeffrey Foo 胡浩仁
          </span>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, letterSpacing: "0.8px", textTransform: "uppercase",
                color: activeSection === link ? "#0EA5E9" : "rgba(232,237,245,0.6)",
                fontFamily: "'Georgia', serif",
                borderBottom: activeSection === link ? "1px solid #0EA5E9" : "1px solid transparent",
                paddingBottom: "2px", transition: "all 0.2s",
              }}>
              {link}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        padding: "120px 80px 80px",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}/>
        {/* Glow orbs */}
        <div style={{
          position: "absolute", top: "15%", right: "15%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          borderRadius: "50%", zIndex: 0,
        }}/>
        <div style={{
          position: "absolute", bottom: "20%", left: "5%", width: 400, height: 400,
          background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
          borderRadius: "50%", zIndex: 0,
        }}/>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: 32,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0EA5E9",
              boxShadow: "0 0 8px #0EA5E9", animation: "pulse 2s infinite" }}/>
            <span style={{ fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase",
              color: "#0EA5E9", fontFamily: "'Georgia', serif" }}>
              AI & IT Services for Community Organisations
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 700, lineHeight: 1.1,
            margin: "0 0 8px", letterSpacing: "-1px",
            background: "linear-gradient(135deg, #E8EDF5 0%, rgba(232,237,245,0.7) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Jeffrey Foo
          </h1>
          <h1 style={{
            fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.1,
            margin: "0 0 32px", letterSpacing: "-1px",
            background: "linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            胡浩仁
          </h1>

          <p style={{
            fontSize: 20, lineHeight: 1.7, color: "rgba(232,237,245,0.75)",
            maxWidth: 640, margin: "0 0 16px",
            fontStyle: "italic",
          }}>
            Deputy Director, GovTech Singapore. Secretary-General of two associations.
            Community leader across six organisations.
          </p>
          <p style={{
            fontSize: 18, lineHeight: 1.7, color: "rgba(232,237,245,0.6)",
            maxWidth: 620, margin: "0 0 48px",
          }}>
            I bridge technology and community — designing AI systems that make
            governance more trustworthy, processes more efficient, and organisations
            more capable of serving the people who depend on them.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Case Study")} style={{
              padding: "14px 32px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
              color: "white", fontSize: 14, fontWeight: 600, letterSpacing: "0.5px",
              fontFamily: "'Georgia', serif",
              boxShadow: "0 8px 24px rgba(14,165,233,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 32px rgba(14,165,233,0.5)"; }}
               onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 24px rgba(14,165,233,0.35)"; }}>
              View AI Case Study →
            </button>
            <button onClick={() => scrollTo("Contact")} style={{
              padding: "14px 32px", borderRadius: "8px", cursor: "pointer",
              background: "transparent", border: "1px solid rgba(232,237,245,0.25)",
              color: "rgba(232,237,245,0.8)", fontSize: 14, letterSpacing: "0.5px",
              fontFamily: "'Georgia', serif", transition: "all 0.2s",
            }} onMouseEnter={e => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.color = "#0EA5E9"; }}
               onMouseLeave={e => { e.target.style.borderColor = "rgba(232,237,245,0.25)"; e.target.style.color = "rgba(232,237,245,0.8)"; }}>
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{
        padding: "80px", background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: "center",
              opacity: visibleStats ? 1 : 0,
              transform: visibleStats ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.6s ease ${i * 0.15}s`,
            }}>
              <div style={{
                fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1,
                background: "linear-gradient(135deg, #0EA5E9, #8B5CF6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: 8,
              }}>{s.number}</div>
              <div style={{ fontSize: 13, color: "rgba(232,237,245,0.5)", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="capabilities" style={{ padding: "100px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
              color: "#0EA5E9", marginBottom: 12 }}>What I Deliver</p>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, margin: 0,
              color: "#E8EDF5", letterSpacing: "-0.5px" }}>Capabilities</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
            {CAPABILITIES.map((cap, i) => (
              <div key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "36px", borderRadius: "16px",
                  background: hoveredCard === i
                    ? "rgba(14,165,233,0.07)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hoveredCard === i ? "rgba(14,165,233,0.35)" : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.3s ease", cursor: "default",
                  transform: hoveredCard === i ? "translateY(-4px)" : "translateY(0)",
                }}>
                <div style={{ fontSize: 28, marginBottom: 16, color: "#0EA5E9" }}>{cap.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#E8EDF5" }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(232,237,245,0.6)", marginBottom: 20 }}>
                  {cap.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cap.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontSize: 11, padding: "4px 10px", borderRadius: "100px",
                      background: "rgba(14,165,233,0.1)", color: "#0EA5E9",
                      border: "1px solid rgba(14,165,233,0.2)", letterSpacing: "0.5px",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI WORK ── */}
      <section id="ai-work" style={{
        padding: "100px 80px",
        background: "rgba(139,92,246,0.04)",
        borderTop: "1px solid rgba(139,92,246,0.1)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
              color: "#8B5CF6", marginBottom: 12 }}>Proof of Work</p>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, margin: "0 0 16px",
              color: "#E8EDF5", letterSpacing: "-0.5px" }}>AI Work</h2>
            <p style={{ fontSize: 17, color: "rgba(232,237,245,0.6)", maxWidth: 600, lineHeight: 1.7 }}>
              I do not just advise on AI — I build and deploy it. Here is what I have delivered in a real-world, high-stakes environment.
            </p>
          </div>

          {/* Featured Project */}
          <div style={{
            borderRadius: "20px", overflow: "hidden",
            border: "1px solid rgba(139,92,246,0.3)",
            background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(14,165,233,0.05) 100%)",
          }}>
            <div style={{ padding: "48px 48px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{
                  padding: "4px 12px", borderRadius: "100px",
                  background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)",
                  fontSize: 11, color: "#EF4444", letterSpacing: "1px", textTransform: "uppercase",
                }}>Singapore First</div>
                <div style={{
                  padding: "4px 12px", borderRadius: "100px",
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                  fontSize: 11, color: "#10B981", letterSpacing: "1px",
                }}>✓ Deployed & Verified</div>
              </div>

              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#E8EDF5", marginBottom: 12 }}>
                AI-Assisted Election System
              </h3>
              <p style={{ fontSize: 16, color: "#8B5CF6", marginBottom: 20, fontStyle: "italic" }}>
                南洋客属总会 Nanyang Hakka Federation — 45th Board Election, 26 April 2026
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(232,237,245,0.7)", maxWidth: 700 }}>
                Designed, built, and deployed an end-to-end AI vote counting system for a 2,000+ member
                community association in three weeks — with zero prior template to follow.
                The system reduced a full day of manual counting to hours, enforced three strict
                governance rules across every single ballot, and produced a fully auditable result
                that the management committee could stand behind with confidence.
              </p>
            </div>

            {/* Three pillars */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}>
              {[
                { icon: "⏱", label: "Time Saved", value: "Full day → Hours", color: "#0EA5E9" },
                { icon: "⚖", label: "Governance", value: "3 rules, 589 ballots, zero exceptions", color: "#8B5CF6" },
                { icon: "🔍", label: "Auditability", value: "100% digital paper trail", color: "#10B981" },
              ].map((p, i) => (
                <div key={i} style={{
                  padding: "28px 32px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{p.icon}</div>
                  <div style={{ fontSize: 12, color: p.color, letterSpacing: "1px",
                    textTransform: "uppercase", marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 15, color: "rgba(232,237,245,0.8)", fontWeight: 600 }}>
                    {p.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section id="case-study" style={{ padding: "100px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
              color: "#F59E0B", marginBottom: 12 }}>Step by Step</p>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, margin: "0 0 16px",
              color: "#E8EDF5", letterSpacing: "-0.5px" }}>How It Was Built</h2>
          </div>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute", left: 28, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, #0EA5E9, #8B5CF6, #10B981, #F59E0B, #EF4444)",
            }}/>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TIMELINE.map((step, i) => (
                <div key={i} style={{
                  display: "flex", gap: 40, paddingBottom: i < TIMELINE.length - 1 ? 48 : 0,
                  paddingLeft: 0,
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                    background: `${step.color}20`, border: `2px solid ${step.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: step.color, zIndex: 1,
                    boxShadow: `0 0 20px ${step.color}30`,
                  }}>{step.phase}</div>
                  <div style={{ paddingTop: 12 }}>
                    <h4 style={{ fontSize: 18, fontWeight: 700, color: "#E8EDF5", marginBottom: 8 }}>
                      {step.title}
                    </h4>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(232,237,245,0.6)", margin: 0, maxWidth: 680 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div style={{
            marginTop: 72, padding: "40px 48px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "16px", borderLeft: "4px solid #0EA5E9",
          }}>
            <p style={{
              fontSize: 22, lineHeight: 1.6, fontStyle: "italic",
              color: "rgba(232,237,245,0.85)", margin: "0 0 16px",
            }}>
              "AI as the engine. Humans as the judgment layer. Community as the purpose."
            </p>
            <p style={{ fontSize: 13, color: "rgba(232,237,245,0.4)", margin: 0, letterSpacing: "1px" }}>
              — Design principle, NHF AI Election System, 2026
            </p>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section id="community" style={{
        padding: "100px 80px",
        background: "rgba(16,185,129,0.03)",
        borderTop: "1px solid rgba(16,185,129,0.1)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
                color: "#10B981", marginBottom: 12 }}>Grounded in Community</p>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, margin: "0 0 24px",
                color: "#E8EDF5", letterSpacing: "-0.5px" }}>Community Leadership</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(232,237,245,0.65)", marginBottom: 24 }}>
                My technology work is not theoretical — it is rooted in 20+ years of active
                community leadership across Singapore's Chinese clan association sector.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(232,237,245,0.65)" }}>
                I understand how associations work, what governance requires, what volunteers
                can and cannot do, and what technology actually looks like when it is
                deployed in a room full of people who have never used AI before.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {COMMUNITY_ROLES.map((role, i) => (
                <div key={i} style={{
                  padding: "20px 24px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  transition: "all 0.2s",
                }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#E8EDF5", marginBottom: 2 }}>
                      {role.org}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(232,237,245,0.45)" }}>{role.en}</div>
                  </div>
                  <div style={{
                    fontSize: 11, color: "#10B981", padding: "4px 12px",
                    borderRadius: "100px", background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.25)", textAlign: "right",
                    maxWidth: 180,
                  }}>{role.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 80px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
            color: "#0EA5E9", marginBottom: 16 }}>Let's Talk</p>
          <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, margin: "0 0 24px",
            color: "#E8EDF5", letterSpacing: "-0.5px" }}>
            Ready to bring AI to your organisation?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(232,237,245,0.6)", marginBottom: 48 }}>
            Whether you are a clan association, community organisation, school, or VWO —
            if you are thinking about AI and do not know where to start, let's have a conversation.
          </p>

          <div style={{
            display: "flex", flexDirection: "column", gap: 16, alignItems: "center", marginBottom: 48,
          }}>
            {[
              { label: "Email", value: "jeffreyfoo@gmail.com", icon: "✉" },
              { label: "Organisation", value: "GovTech Singapore (Day role) | TechAssist Community (IT Services)", icon: "◈" },
              { label: "Location", value: "Singapore", icon: "◎" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 28px", borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                width: "100%", maxWidth: 480,
              }}>
                <span style={{ color: "#0EA5E9", fontSize: 16 }}>{item.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: "rgba(232,237,245,0.4)", letterSpacing: "1px",
                    textTransform: "uppercase", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: "rgba(232,237,245,0.8)" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: "28px 36px", borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(139,92,246,0.1))",
            border: "1px solid rgba(14,165,233,0.2)",
          }}>
            <p style={{ fontSize: 15, color: "rgba(232,237,245,0.7)", margin: 0, lineHeight: 1.7 }}>
              <strong style={{ color: "#E8EDF5" }}>TechAssist Community</strong> — AI & IT Services
              for Singapore's community organisations. Starting small, growing with you.
              Built by someone who is part of the community — not just a vendor selling to it.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "32px 80px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 13, color: "rgba(232,237,245,0.35)" }}>
          © 2026 Jeffrey Foo How Yin 胡浩仁 — All rights reserved
        </span>
        <span style={{ fontSize: 12, color: "rgba(232,237,245,0.25)", letterSpacing: "0.5px" }}>
          TechAssist Community | GovTech Singapore
        </span>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        button:focus { outline: none; }
        #ai-work { scroll-margin-top: 64px; }
        #case-study { scroll-margin-top: 64px; }
        #capabilities { scroll-margin-top: 64px; }
        #community { scroll-margin-top: 64px; }
        #contact { scroll-margin-top: 64px; }
        #about { scroll-margin-top: 0; }
      `}</style>
    </div>
  );
}
