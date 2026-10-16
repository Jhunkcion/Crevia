import { useCallback, useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";

import Intro from "./sections/Intro";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import TeamSection from "./components/TeamSection";
import Divisions from "./sections/Divisions";
import ScrollToTop from "./components/ScrollToTop";

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
        className="w-full bg-[#DFEFFB]"
      >
        <Contact />
      </section>

      {/* ── Talent overlay (triggered from Divisions) ── */}
      {selectedDivision && (
        <div
          className="talent-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 md:p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Team profiles"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedDivision(null);
          }}
        >
          <div className="talent-overlay__panel relative flex h-[92vh] w-[95vw] max-w-[1400px] flex-col overflow-hidden rounded-2xl bg-[#F6F6F6] shadow-2xl border border-black/10">
            {/* Dedicated Top Bar inside modal */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-black/10 bg-[#F6F6F6]/95 px-4 py-3 backdrop-blur sm:px-8 sm:py-4">
              <button
                type="button"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-sm transition hover:bg-black hover:text-white active:scale-95 sm:px-4 sm:py-2"
                aria-label="Close team profile"
                onClick={() => setSelectedDivision(null)}
              >
                <span className="text-sm leading-none transition-transform group-hover:-translate-x-0.5">←</span>
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#0E426B] uppercase">
                <span className="hidden sm:inline">CREVIA</span>
                <span className="hidden sm:inline text-neutral-300">•</span>
                <span>{selectedDivision === "tech" ? "Tech Talents" : "Studio Talents"}</span>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-8 md:p-10">
              <TeamSection division={selectedDivision || "studio"} />
            </div>
          </div>
        </div>
      )}

      {/* Floating Scroll to Top button on lower right corner */}
      <ScrollToTop />
    </div>
  );
}
