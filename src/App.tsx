import { useCallback, useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";

import Intro from "./sections/Intro";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import TeamSection from "./components/TeamSection";
import Divisions from "./sections/Divisions";

type Section = "intro" | "home" | "divisions" | "work" | "contact";

function PageIndicator({ page }: { page: Section }) {
  return (
    <aside className={`page-indicator page-indicator--${page}`} aria-label={`Current page: ${page}`}>
      <span className="page-indicator__line" aria-hidden="true" />
      <span className="page-indicator__slashes" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="page-indicator__line page-indicator__line--short" aria-hidden="true" />
      <span className="page-indicator__dots" aria-hidden="true">·<br />·<br />·</span>
    </aside>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<Section>("intro");
  const [selectedDivision, setSelectedDivision] = useState<"studio" | "tech" | null>(null);

  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({
    intro: null,
    home: null,
    divisions: null,
    work: null,
    contact: null,
  });

  // ── Track active section via IntersectionObserver ──
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    (Object.entries(sectionRefs.current) as [Section, HTMLElement | null][]).forEach(
      ([key, el]) => {
        if (!el) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActivePage(key);
          },
          { threshold: key === "intro" ? 0.1 : 0.4 },
        );
        observer.observe(el);
        observers.push(observer);
      },
    );

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!selectedDivision) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedDivision(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDivision) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [selectedDivision]);

  // ── Scroll to section ──
  const handleNavigate = useCallback((page: string) => {
    if (page !== "divisions") setSelectedDivision(null);
    const el = sectionRefs.current[page as Section];
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative w-full bg-cream">

      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <PageIndicator page={activePage} />

      {/* ── Intro: scroll-driven parallax ── */}
      <section
        ref={(el) => { sectionRefs.current.intro = el; }}
        id="intro"
      >
        <Intro />
      </section>

      {/* ── Hero ── */}
      <section
        ref={(el) => { sectionRefs.current.home = el; }}
        id="home"
      >
        <Hero onNavigate={handleNavigate} />
      </section>

      {/* ── Divisions ── */}
      <section
        ref={(el) => { sectionRefs.current.divisions = el; }}
        id="divisions"
      >
        <Divisions onSelect={setSelectedDivision} />
      </section>

      {/* ── Work ── */}
      <section
        ref={(el) => { sectionRefs.current.work = el; }}
        id="work"
      >
        <Work />
      </section>

      {/* ── Contact ── */}
      <section
        ref={(el) => { sectionRefs.current.contact = el; }}
        id="contact"
      >
        <Contact />
      </section>

      {/* ── Talent overlay (triggered from Divisions) ── */}
      {selectedDivision && (
        <div
          className="talent-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Team profiles"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedDivision(null);
          }}
        >
          <div className="talent-overlay__panel relative h-[90vh] w-[90vw] max-w-[1400px] overflow-hidden rounded-lg bg-white shadow-2xl">
            <button
              type="button"
              className="absolute left-4 top-4 z-10 p-2 text-2xl leading-none text-black hover:opacity-70"
              aria-label="Close team profile"
              onClick={() => setSelectedDivision(null)}
            >
              ←
            </button>
            <TeamSection />
          </div>
        </div>
      )}

    </div>
  );
}
