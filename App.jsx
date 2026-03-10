import { useState, useEffect, useRef } from "react";

const ACCENT = "#6366f1";
const ACCENT2 = "#818cf8";
const ACCENT_GLOW = "rgba(99,102,241,0.15)";
const DARK = "#050507";
const GLASS = "rgba(255,255,255,0.04)";
const GLASS_BORDER = "rgba(255,255,255,0.08)";
const WHITE = "#f0f0f5";
const GRAY = "#6b7280";
const MUTED = "#9ca3af";

function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function GlassCard({ children, style = {}, hover = true, fixedHeight = null }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: h ? "rgba(255,255,255,0.06)" : GLASS,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${h ? "rgba(255,255,255,0.12)" : GLASS_BORDER}`,
        borderRadius: 16, padding: "2rem", position: "relative", overflow: "hidden",
        transition: "all 0.4s ease",
        transform: h ? "translateY(-4px)" : "translateY(0)",
        boxShadow: h ? `0 20px 40px rgba(0,0,0,0.3), 0 0 60px ${ACCENT_GLOW}` : "0 4px 20px rgba(0,0,0,0.2)",
        height: fixedHeight || undefined,
        display: "flex", flexDirection: "column",
        ...style,
      }}
    >{children}</div>
  );
}

const verticals = [
  { icon: "🎵", name: "Music & Entertainment", desc: "Labels, festivals, artists, nightlife" },
  { icon: "⚡", name: "Tech & SaaS", desc: "Startups, platforms, dev tools" },
  { icon: "🍽️", name: "Food & Beverage", desc: "Restaurants, CPG, hospitality" },
  { icon: "➘�, name: "Lifestyle & Luxury", desc: "Fashion, travel, wellness" },
];

const services = [
  { icon: "📱", title: "UGC & Short-Form", desc: "Scroll-stopping content optimized for Reels, TikTok, and Shorts." },
  { icon: "🎥", title: "Mini Docu-Series", desc: "High-production storytelling — profiles, deep-dives, behind-the-scenes." },
  { icon: "🔥", title: "Meme & Viral Content", desc: "Opinion-driven posts engineered for shares and saves." },
  { icon: "📰", title: "Carousel & Editorial", desc: "Swipeable news, insights, and educational content." },
  { icon: "🤝", title: "Influencer Collabs", desc: "End-to-end creator partnerships for cross-audience growth." },
  { icon: "📊", title: "Strategy & Growth", desc: "Audience analysis, trend detection, and distribution at scale." },
];

const steps = [
  { num: "01", title: "Strategy", desc: "We audit your market, audience, and competitors to build a content roadmap." },
  { num: "02", title: "Create", desc: "Our team produces platform-native content across every format that moves." },
  { num: "03", title: "Distribute", desc: "We publish, schedule, and push content through owned and partner networks." },
  { num: "04", title: "Optimize", desc: "Real-time analytics drive iteration. We double down on what works." },
];

const results = [
  { metric: "1B+", label: "Total views generated over time" },
  { metric: "50+", label: "Brand & creator partnerships delivered" },
  { metric: "1M+", label: "Followers built across our network" },
];

export default function KMCLanding() {
  const [hero, setHero] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => setHero(true), 150);
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: DARK, color: WHITE, minHeight: "100vh", fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        ::selection{background:${ACCENT};color:#fff}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#222;border-radius:3px}
        ::-webkit-scrollbar-thumb:hover{background:${ACCENT}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        html{scroll-behavior:smooth}
      `}</style>

      {/* Mesh gradient bg */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)", filter: "blur(100px)", transform: `translateY(${scrollY * 0.05}px)` }} />
      </div>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 50 ? "rgba(5,5,7,0.8)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em", color: WHITE }}>KMC</div>
        <a href="mailto:albert@dontechno.com" style={{
          padding: "0.5rem 1.25rem", borderRadius: 8,
          border: `1px solid ${GLASS_BORDER}`, background: GLASS,
          color: WHITE, fontSize: "0.8rem", fontWeight: 500, textDecoration: "none",
          backdropFilter: "blur(10px)", transition: "all 0.3s", letterSpacing: "0.02em",
        }}
          onMouseEnter={e => { e.target.style.background = ACCENT; e.target.style.borderColor = ACCENT; }}
          onMouseLeave={e => { e.target.style.background = GLASS; e.target.style.borderColor = GLASS_BORDER; }}
        >Get in Touch</a>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        position: "relative", padding: "6rem 2rem 4rem", zIndex: 1,
      }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.03 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: `${(i + 1) * 8.33}%`, top: 0, bottom: 0, width: 1, background: "#fff" }} />
          ))}
        </div>

        <div style={{
          textAlign: "center", position: "relative", zIndex: 1,
          opacity: hero ? 1 : 0, transform: hero ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.2s cubic-bezier(.16,1,.3,1)",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 1rem", borderRadius: 100,
            background: GLASS, border: `1px solid ${GLASS_BORDER}`,
            fontSize: "0.75rem", color: MUTED, marginBottom: "2rem",
            backdropFilter: "blur(10px)", letterSpacing: "0.05em",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
            Now accepting new clients
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 700, lineHeight: 0.95,
            letterSpacing: "-0.04em", marginBottom: "1.5rem",
          }}>
            <span style={{ color: WHITE }}>We build</span><br />
            <span style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2}, #c084fc)`,
              backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>audiences</span>
          </h1>

          <p style={{
            fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: GRAY,
            maxWidth: 520, margin: "0 auto 3rem", lineHeight: 1.65, fontWeight: 400,
          }}>
            Full-service social media agency. Strategy, content, distribution — we handle it all so you can focus on building.
          </p>

          <a href="mailto:albert@dontechno.com" style={{
            display: "inline-block", padding: "0.85rem 2.5rem", borderRadius: 10,
            background: ACCENT, color: "#fff",
            fontSize: "0.9rem", fontWeight: 600, textDecoration: "none",
            transition: "all 0.3s", letterSpacing: "0.01em",
            boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(99,102,241,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)"; }}
          >Start a Project</a>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "3rem", marginTop: "5rem",
          opacity: hero ? 1 : 0, transform: hero ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(.16,1,.3,1) 0.4s",
        }}>
          {[{ n: "1M+", l: "Followers Built" }, { n: "100M+", l: "Views in Q4 2025" }, { n: "5+", l: "Years" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: WHITE, lineHeight: 1, letterSpacing: "-0.03em" }}>{s.n}</div>
              <div style={{ fontSize: "0.75rem", color: GRAY, marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VERTICALS ═══ */}
      <section style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: ACCENT2, marginBottom: "0.75rem", fontWeight: 600 }}>Industries</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "3rem", lineHeight: 1.1 }}>
              We work across verticals
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {verticals.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GlassCard fixedHeight="180px" style={{ textAlign: "center", padding: "2rem 1.5rem", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem", filter: "saturate(0.8)" }}>{v.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 600, marginBottom: "0.35rem", letterSpacing: "-0.01em" }}>{v.name}</h3>
                  <p style={{ fontSize: "0.8rem", color: GRAY, lineHeight: 1.5 }}>{v.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: ACCENT2, marginBottom: "0.75rem", fontWeight: 600 }}>What We Do</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.75rem", lineHeight: 1.1 }}>
              Content that converts
            </h2>
            <p style={{ color: GRAY, fontSize: "1.05rem", marginBottom: "3rem", maxWidth: 550, lineHeight: 1.6 }}>
              From UGC to docu-series to meme-style virality — we create and distribute every format that moves the needle.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <GlassCard fixedHeight="200px" style={{ padding: "1.75rem" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: GRAY, lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                  <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }} />
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: ACCENT2, marginBottom: "0.75rem", fontWeight: 600 }}>Process</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "3rem", lineHeight: 1.1 }}>
              How we work
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ position: "relative" }}>
                  <GlassCard fixedHeight="220px" style={{ padding: "2rem 1.5rem" }}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: "3rem", fontWeight: 700,
                      color: "rgba(99,102,241,0.12)", lineHeight: 1, marginBottom: "0.75rem",
                      letterSpacing: "-0.04em",
                    }}>{s.num}</div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>{s.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: GRAY, lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                  </GlassCard>
                  {i < 3 && <div style={{
                    position: "absolute", top: "50%", right: -8, width: 16, height: 1,
                    background: `linear-gradient(90deg, ${ACCENT}30, transparent)`,
                  }} />}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESULTS ═══ */}
      <section style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: ACCENT2, marginBottom: "0.75rem", fontWeight: 600 }}>Results</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "3rem", lineHeight: 1.1 }}>
              Numbers that speak
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {results.map((r, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GlassCard fixedHeight="180px" style={{ textAlign: "center", padding: "2.5rem 1.5rem", justifyContent: "center", alignItems: "center" }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "2.8rem", fontWeight: 700, letterSpacing: "-0.03em",
                    background: `linear-gradient(135deg, ${WHITE}, ${ACCENT2})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    lineHeight: 1, marginBottom: "0.75rem",
                  }}>{r.metric}</div>
                  <p style={{ fontSize: "0.85rem", color: GRAY, lineHeight: 1.5 }}>{r.label}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{
            maxWidth: 700, margin: "0 auto", textAlign: "center",
            position: "relative", padding: "4rem 3rem",
            background: GLASS, backdropFilter: "blur(24px)",
            border: `1px solid ${GLASS_BORDER}`, borderRadius: 20, overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
              width: 300, height: 300,
              background: "radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)",
              pointerEvents: "none",
            }} />
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 700, letterSpacing: "-0.03em",
              marginBottom: "1rem", position: "relative",
            }}>
              Let's build <span style={{ color: ACCENT2 }}>something</span>
            </h2>
            <p style={{
              color: GRAY, fontSize: "1rem", lineHeight: 1.6,
              maxWidth: 420, margin: "0 auto 2rem", position: "relative",
            }}>
              Tell us about your brand. We'll handle the rest.
            </p>
            <a href="mailto:albert@dontechno.com" style={{
              display: "inline-block", padding: "0.9rem 2.5rem",
              background: ACCENT, color: "#fff", fontWeight: 600,
              fontSize: "0.9rem", textDecoration: "none",
              borderRadius: 10, transition: "all 0.3s",
              boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
              position: "relative", letterSpacing: "0.01em",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(99,102,241,0.45)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)"; }}
            >Get in Touch</a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "3rem 2rem", borderTop: `1px solid ${GLASS_BORDER}`,
        textAlign: "center", position: "relative", zIndex: 1,
      }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>KMC</div>
        <p style={{ fontSize: "0.7rem", color: GRAY, letterSpacing: "0.1em", textTransform: "uppercase" }}>Social Media Agency</p>
      </footer>
    </div>
  );
}
