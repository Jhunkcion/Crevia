import { useCallback, useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";

import Intro from "./sections/Intro";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import Talent from "./sections/Talent";
import Divisions from "./sections/Divisions";

type Section = "intro" | "home" | "divisions" | "work" | "contact";

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
          { threshold: 0.4 },
        );
        observer.observe(el);
        observers.push(observer);
      },
    );

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Scroll to section ──
  const handleNavigate = useCallback((page: string) => {
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
          aria-label="Team profile"
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
            <Talent division={selectedDivision} />
          </div>
        </div>
      )}

    </div>
  );
}
