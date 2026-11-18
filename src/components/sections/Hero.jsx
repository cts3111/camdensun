import { useEffect, useRef } from "react";
import { profile } from "../../data/content.js";

// Short skill labels for the lime pill (recruiter-friendly).
const HERO_SKILLS = ["Python", "SQL", "OpenCV", "Tableau", "Claude Code"];

export default function Hero() {
  const sectionRef = useRef(null);
  const artRef = useRef(null);

  // Mouse parallax on the art only (text keeps its entrance animation).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = artRef.current;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf;

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const loop = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      if (el) {
        const x = (cx * 30).toFixed(2);
        const y = (cy * 30 * 0.78).toFixed(2);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="home" className="section dark hero" ref={sectionRef}>
      <div className="art art-hero" aria-hidden="true" ref={artRef}>
        <span className="orb" />
        <span className="ring r1" />
        <span className="ring r2" />
        <span className="haze h1" />
        <span className="haze h2" />
      </div>

      <div className="section-inner hero-inner">
        <div className="hero-copy">
          <div className="hero-topline h-anim" style={{ animationDelay: "0.05s" }}>
            <p className="label hero-eyebrow">{profile.eyebrow}</p>
            <span className="hero-badge" aria-label="2023 to 2026">
              {["2023", ">>", "2026"].map((d, i) => (
                <span
                  key={d + i}
                  className="badge-digit"
                  style={{ animationDelay: `${0.45 + i * 0.14}s` }}
                >
                  {d}
                </span>
              ))}
            </span>
          </div>
          <h1 className="hero-hi h-anim" style={{ animationDelay: "0.12s" }}>
            Hi<em>!</em>
          </h1>
          <p className="hero-headline h-anim" style={{ animationDelay: "0.22s" }}>
            I&rsquo;m Camden, a Statistics &amp; Data Science student at UCLA,
            graduating December 2026.
          </p>
          <p className="hero-bio h-anim" style={{ animationDelay: "0.32s" }}>
            {profile.tagline} Over three roles at Noah Medical I turned camera
            and sensor data into shipped products, from a thermal distortion
            study to an automated robotic calibration pipeline. I love the
            moment a messy dataset becomes a clear story.
          </p>
          <div className="hero-skills-pill h-anim" style={{ animationDelay: "0.42s" }}>
            {HERO_SKILLS.map((s, i) => (
              <span key={s}>
                {s}
                {i < HERO_SKILLS.length - 1 && <i className="sk-sep">•</i>}
              </span>
            ))}
          </div>
          <div className="hero-cta-row h-anim" style={{ animationDelay: "0.52s" }}>
            <a href="#projects" className="btn-pill btn-solid">
              View my work <span className="arr">→</span>
            </a>
            <a href="#contact" className="btn-line">
              Get in touch <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>

      <p className="label hero-hint h-anim" style={{ animationDelay: "0.7s" }}>
        Scroll
      </p>
    </section>
  );
}
