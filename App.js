import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "HTML", level: 90, color: "#E34F26" },
  { name: "CSS", level: 85, color: "#1572B6" },
  { name: "JavaScript", level: 82, color: "#F7DF1E" },
  { name: "React.js", level: 78, color: "#61DAFB" },
  { name: "Node.js", level: 72, color: "#339933" },
  { name: "Express.js", level: 70, color: "#ffffff" },
  { name: "MongoDB", level: 68, color: "#47A248" },
  { name: "MySQL", level: 65, color: "#4479A1" },
];

const projects = [
  {
    title: "BloodBank Management System",
    desc: "A Blood Bank Management System manages donor details, blood stock, and requests efficiently.",
    tags: ["Java", "Swing", "Mysql"],
    color: "#0ff",
    github: "https://github.com/syedshameer18/Blood-bank-management",
  },
  {
    title: "Knowvia",
    desc: "Knowvia is a platform that connects knowledge and innovation to help users learn, build, and showcase their projects efficiently.",
    tags: ["Java", "SpringBoot", "MySQL"],
    color: "#a78bfa",
    github: "https://github.com/syedshameer18/knowvia-virtual-classroom-",
  },
  {
    title: "Portfolio Website",
    desc: "Responsive personal portfolio built with React.js showcasing projects, skills and certifications.",
    tags: ["React", "CSS", "JS"],
    color: "#34d399",
    github: "https://github.com/syedshameer18/portfolio",
  },
];

const certs = [
  {
    title: "Java Developer",
    issuer: "Certification Authority",
    year: "2025",
    icon: "☕",
    color: "#f97316",
  },
  {
    title: "Full Stack Developer",
    issuer: "Certification Authority",
    year: "2025",
    icon: "🚀",
    color: "#a78bfa",
  },
];

const navItems = ["About", "Skills", "Projects", "Certifications", "Contact"];

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add a Gmail service → copy the Service ID below
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    Set "To Email" in the template to syedshameerbsc@gmail.com
// 4. Copy your Public Key from Account → API Keys
const EMAILJS_SERVICE_ID  = "service_7phss7a";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_pt8ad7f";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "BT2xip5LCIWN1WZ3G";   // e.g. "AbCdEfGhIjKlMnOp"
// ─────────────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [animSkills, setAnimSkills] = useState(false);
  const skillsRef = useRef(null);

  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error

  const roles = ["Aspiring Web Developer", "Full Stack Developer", "Freelancer"];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    let timeout;
    const tick = () => {
      const word = roles[roleRef.current];
      if (dirRef.current === 1) {
        charRef.current++;
        if (charRef.current > word.length) {
          dirRef.current = -1;
          timeout = setTimeout(tick, 1400);
          return;
        }
      } else {
        charRef.current--;
        if (charRef.current < 0) {
          charRef.current = 0;
          roleRef.current = (roleRef.current + 1) % roles.length;
          dirRef.current = 1;
          timeout = setTimeout(tick, 400);
          return;
        }
      }
      setTyped(word.slice(0, charRef.current));
      timeout = setTimeout(tick, dirRef.current === 1 ? 80 : 45);
    };
    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimSkills(true); }, { threshold: 0.3 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  // Load EmailJS SDK once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(script);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = async () => {
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields before sending.");
      return;
    }
    setFormStatus("sending");
    try {
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: name, from_email: email, subject, message }
      );
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#060610", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #060610; } ::-webkit-scrollbar-thumb { background: #0ff4; border-radius: 2px; }
        .grain { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: .03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px; }
        .mesh { position: fixed; inset: 0; pointer-events: none; z-index: 0; background: radial-gradient(ellipse 60% 50% at 20% 10%, #0ff08 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, #a78bfa18 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 50% 50%, #34d39908 0%, transparent 70%); }
        .nav-link { background: none; border: none; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: #94a3b8; cursor: pointer; padding: 6px 0; transition: color .2s; position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: #0ff; transition: width .25s; }
        .nav-link:hover, .nav-link.active { color: #e2e8f0; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .section { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 100px 24px 60px; position: relative; z-index: 1; }
        .container { max-width: 900px; width: 100%; margin: 0 auto; }
        .section-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #0ff; margin-bottom: 12px; }
        .section-title { font-size: clamp(32px, 6vw, 56px); font-weight: 800; line-height: 1.05; margin-bottom: 16px; }
        .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
        .card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 16px; padding: 28px; transition: border-color .25s, transform .25s; position: relative; overflow: hidden; }
        .card::before { content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity .3s; border-radius: 16px; }
        .card:hover { border-color: rgba(0,255,255,.25); transform: translateY(-4px); }
        .card:hover::before { opacity: 1; }
        .tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(255,255,255,.1); color: #94a3b8; background: rgba(255,255,255,.04); }
        .btn { display: inline-flex; align-items: center; gap: 8px; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: .05em; padding: 12px 28px; border-radius: 8px; border: none; cursor: pointer; transition: all .2s; text-decoration: none; }
        .btn-primary { background: #0ff; color: #060610; }
        .btn-primary:hover { background: #fff; transform: translateY(-2px); }
        .btn-outline { background: transparent; color: #e2e8f0; border: 1px solid rgba(255,255,255,.2); }
        .btn-outline:hover { border-color: #0ff; color: #0ff; transform: translateY(-2px); }
        .skill-bar-bg { width: 100%; height: 4px; background: rgba(255,255,255,.08); border-radius: 2px; overflow: hidden; }
        .skill-bar { height: 100%; border-radius: 2px; width: 0; transition: width 1.2s cubic-bezier(.17,.67,.35,.99); }
        .glow-cyan { box-shadow: 0 0 30px #0ff3; }
        .cert-badge { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
        .input-field { width: 100%; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 14px 16px; color: #e2e8f0; font-family: 'Syne', sans-serif; font-size: 14px; outline: none; transition: border-color .2s; }
        .input-field:focus { border-color: #0ff; }
        .input-field::placeholder { color: #475569; }
        .divider { width: 40px; height: 2px; background: #0ff; margin-bottom: 32px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp .7s ease both; }
        .fade-up-1 { animation-delay: .1s; }
        .fade-up-2 { animation-delay: .25s; }
        .fade-up-3 { animation-delay: .4s; }
        .fade-up-4 { animation-delay: .55s; }
        @media(max-width:640px) { .section { padding: 90px 18px 50px; } }
      `}</style>

      <div className="grain" />
      <div className="mesh" />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(20px)", background: "rgba(6,6,16,.85)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: "#0ff", letterSpacing: ".05em" }}>
            SS<span style={{ color: "#94a3b8" }}>.dev</span>
          </div>
          <div style={{ display: "flex", gap: 32 }} className="desktop-nav">
            {navItems.map(n => (
              <button key={n} className={`nav-link ${active === n ? "active" : ""}`} onClick={() => scrollTo(n)}>{n}</button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#e2e8f0", fontSize: 22 }} className="hamburger" aria-label="menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "12px 24px 20px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
            {navItems.map(n => (
              <button key={n} className={`nav-link ${active === n ? "active" : ""}`} onClick={() => scrollTo(n)} style={{ textAlign: "left", padding: "10px 0" }}>{n}</button>
            ))}
          </div>
        )}
      </nav>

      <style>{`@media(max-width:640px){.desktop-nav{display:none!important}.hamburger{display:flex!important}}`}</style>

      {/* HERO */}
      <section id="About" className="section" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <p className="section-label fade-up">Based in Tamil Nadu, India</p>
              <h1 className="section-title fade-up fade-up-1">
                Hi, I'm<br />
                <span style={{ color: "#0ff" }}>Syed Shameer</span>
              </h1>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(14px, 3vw, 20px)", color: "#94a3b8", marginBottom: 24, minHeight: 32 }} className="fade-up fade-up-2">
                <span style={{ color: "#a78bfa" }}>&gt; </span>{typed}<span style={{ borderRight: "2px solid #0ff", marginLeft: 2 }}>|</span>
              </div>
              <p style={{ color: "#64748b", lineHeight: 1.8, maxWidth: 480, marginBottom: 36, fontSize: 15 }} className="fade-up fade-up-3">
                B.Sc CS student at Jamal Mohamed College, Trichy. Building clean, performant web apps and looking for freelance opportunities & entry-level roles.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} className="fade-up fade-up-4">
                <button className="btn btn-primary glow-cyan" onClick={() => scrollTo("Contact")}>Hire Me</button>
                <button className="btn btn-outline" onClick={() => scrollTo("Projects")}>View Work</button>
              </div>
            </div>
            <div style={{ animation: "float 4s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 160, height: 160, borderRadius: "50%", background: "linear-gradient(135deg, #0ff2, #a78bfa3)", border: "1px solid #0ff3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 0 60px #0ff1, 0 0 120px #a78bfa18" }}>
                <div style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "1px dashed #0ff2", animation: "spin-slow 12s linear infinite" }} />
                <span style={{ fontSize: 64 }}>👨‍💻</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 56, flexWrap: "wrap" }}>
            {[["🎓", "B.Sc CS — JMC, Trichy"], ["📍", "Tamil Nadu, India"], ["💼", "Open to Work"]].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "8px 16px", fontSize: 13, color: "#94a3b8" }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="Skills" className="section" ref={skillsRef}>
        <div className="container">
          <p className="section-label">What I Know</p>
          <div className="divider" />
          <h2 className="section-title">Skills &<br /><span style={{ color: "#0ff" }}>Technologies</span></h2>
          <p style={{ color: "#64748b", marginBottom: 48, maxWidth: 480, lineHeight: 1.8 }}>
            Comfortable across the full stack — from crafting pixel-perfect UIs to building robust server-side APIs.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
            {skills.map((s) => (
              <div key={s.name} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: s.color }}>{s.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: animSkills ? s.level + "%" : "0%", background: `linear-gradient(90deg, ${s.color}99, ${s.color})` }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
            {skills.map(s => (
              <div key={s.name} className="tag" style={{ borderColor: s.color + "44", color: s.color }}>{s.name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="Projects" className="section">
        <div className="container">
          <p className="section-label">My Work</p>
          <div className="divider" />
          <h2 className="section-title">Featured<br /><span style={{ color: "#0ff" }}>Projects</span></h2>
          <p style={{ color: "#64748b", marginBottom: 48, maxWidth: 480, lineHeight: 1.8 }}>
            A selection of projects built to solve real problems and sharpen full-stack skills.
          </p>
          <div className="grid2">
            {projects.map((p, i) => (
              // ✅ FIX: Removed cursor:"default" so GitHub button clicks register
              <div key={i} className="card">
                <div style={{ width: 40, height: 4, borderRadius: 2, background: p.color, marginBottom: 20 }} />
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: "#e2e8f0" }}>{p.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} className="tag" style={{ borderColor: p.color + "44", color: p.color }}>{t}</span>)}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                  {/* ✅ FIX: Added position:relative and zIndex so the link sits above the card's ::before overlay */}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ padding: "8px 18px", fontSize: 12, position: "relative", zIndex: 1 }}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="Certifications" className="section">
        <div className="container">
          <p className="section-label">Credentials</p>
          <div className="divider" />
          <h2 className="section-title">Certifi&shy;<span style={{ color: "#0ff" }}>cations</span></h2>
          <p style={{ color: "#64748b", marginBottom: 48, maxWidth: 480, lineHeight: 1.8 }}>
            Industry-recognized certifications that validate my development expertise.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {certs.map((c, i) => (
              <div key={i} className="card" style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                <div className="cert-badge" style={{ background: c.color + "22", border: `1px solid ${c.color}44` }}>
                  {c.icon}
                </div>
                <div>
                  <span className="tag" style={{ borderColor: c.color + "44", color: c.color, marginBottom: 10, display: "inline-block" }}>Certified {c.year}</span>
                  <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 4, color: "#e2e8f0" }}>{c.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 13 }}>{c.issuer}</p>
                  <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399" }} />
                    <span style={{ fontSize: 12, color: "#34d399", fontFamily: "'JetBrains Mono', monospace" }}>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 32 }}>
            {[["2+", "Certifications"], ["3+", "Projects Built"], ["8+", "Technologies"], ["1+", "Years Learning"]].map(([n, l]) => (
              <div key={l} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, padding: "20px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#0ff", fontFamily: "'Syne',sans-serif", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 6, fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".08em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" className="section" style={{ minHeight: "auto", paddingBottom: 80 }}>
        <div className="container">
          <p className="section-label">Get In Touch</p>
          <div className="divider" />
          <h2 className="section-title">Let's<br /><span style={{ color: "#0ff" }}>Connect</span></h2>
          <p style={{ color: "#64748b", marginBottom: 48, maxWidth: 480, lineHeight: 1.8 }}>
            Available for freelance projects and entry-level roles. Drop a message and I'll get back promptly.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* ✅ WORKING CONTACT FORM */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                className="input-field"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleInput}
              />
              <input
                className="input-field"
                placeholder="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInput}
              />
              <input
                className="input-field"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleInput}
              />
              <textarea
                className="input-field"
                placeholder="Your Message"
                name="message"
                rows={5}
                style={{ resize: "vertical" }}
                value={formData.message}
                onChange={handleInput}
              />

              <button
                className="btn btn-primary glow-cyan"
                style={{ justifyContent: "center", opacity: formStatus === "sending" ? 0.7 : 1 }}
                onClick={handleSend}
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending" ? "Sending..." : "Send Message →"}
              </button>

              {formStatus === "success" && (
                <div style={{ background: "rgba(52,211,153,.12)", border: "1px solid #34d39944", borderRadius: 10, padding: "12px 16px", color: "#34d399", fontSize: 14, textAlign: "center" }}>
                  ✅ Message sent! I'll get back to you soon.
                </div>
              )}
              {formStatus === "error" && (
                <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid #ef444444", borderRadius: 10, padding: "12px 16px", color: "#f87171", fontSize: 14, textAlign: "center" }}>
                  ❌ Something went wrong. Please try again or email directly.
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["📧", "Email", "syedshameerbsc@gmail.com"],
                ["📍", "Location", "Tamil Nadu, India"],
                ["🎓", "Education", "B.Sc CS — JMC Trichy"],
                ["💼", "Status", "Open to Opportunities"],
              ].map(([icon, label, val]) => (
                <div key={label} className="card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#475569", fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "#cbd5e1" }}>{val}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <a href="https://in.linkedin.com/in/syedshameer18" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: "8px 16px", fontSize: 12, flex: 1, justifyContent: "center" }}>LinkedIn</a>
                <a href="https://github.com/syedshameer18" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: "8px 16px", fontSize: 12, flex: 1, justifyContent: "center" }}>GitHub</a>
                <a href="https://www.instagram.com/?deoia=1" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: "8px 16px", fontSize: 12, flex: 1, justifyContent: "center" }}>Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "24px", borderTop: "1px solid rgba(255,255,255,.06)", color: "#334155", fontSize: 13, fontFamily: "'JetBrains Mono',monospace", position: "relative", zIndex: 1 }}>
        © 2025 <span style={{ color: "#0ff" }}>Syed Shameer</span> · Built with React.js
      </footer>

      <style>{`@media(max-width:640px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
