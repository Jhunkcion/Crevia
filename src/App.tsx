import { useCallback, useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import TeamSection from "./components/TeamSection";
import Divisions from "./sections/Divisions";
import ScrollToTop from "./components/ScrollToTop";

type Section = "home" | "divisions" | "work" | "contact";

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
  const [activePage, setActivePage] = useState<Section>("home");
  const [selectedDivision, setSelectedDivision] = useState<"studio" | "tech" | null>(null);
  const [selectedTalentId, setSelectedTalentId] = useState<number | null>(null);

  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({
    home: null,
    divisions: null,
    work: null,
    contact: null,
  });

  const handleCloseOverlay = useCallback(() => {
    setSelectedTalentId(null);
    setSelectedDivision(null);
  }, []);

  const handleBack = useCallback(() => {
    if (selectedTalentId !== null) {
      setSelectedTalentId(null);
    } else {
      setSelectedDivision(null);
    }
  }, [selectedTalentId]);

  // ── Track active section via IntersectionObserver ──
  useEffect(() => {
    const sections = Object.entries(sectionRefs.current).filter(
      ([, element]) => element,
    ) as [Section, HTMLElement][];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActivePage(visibleSection.target.id as Section);
        }
      },
      { threshold: [0.1, 0.4, 0.75] },
    );

    sections.forEach(([, element]) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedDivision) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleBack();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDivision, handleBack]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = selectedDivision ? "hidden" : previousOverflow;
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedDivision]);

  // ── Scroll to section ──
  const handleNavigate = useCallback((page: string) => {
    if (page !== "divisions") {
      handleCloseOverlay();
    }
    const el = sectionRefs.current[page as Section];
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [handleCloseOverlay]);

  return (
    <div className="relative w-full bg-cream">

      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <PageIndicator page={activePage} />

      {/* ── Hero (with video background) ── */}
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
          className="talent-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 md:p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Team profiles"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) handleCloseOverlay();
          }}
        >
          <div className="talent-overlay__panel relative flex h-[92vh] w-[95vw] max-w-[1400px] flex-col overflow-hidden rounded-2xl bg-[#F6F6F6] shadow-2xl border border-black/10">
            {/* Dedicated Top Bar inside modal */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-black/10 bg-[#F6F6F6]/95 px-4 py-3 backdrop-blur sm:px-8 sm:py-4">
              <button
                type="button"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-sm transition hover:bg-black hover:text-white active:scale-95 sm:px-4 sm:py-2"
                aria-label={selectedTalentId !== null ? "Back to talents list" : "Close team profile"}
                onClick={handleBack}
              >
                <span className="text-sm leading-none transition-transform group-hover:-translate-x-0.5">←</span>
                <span>{selectedTalentId !== null ? "Back to Talents" : "Back"}</span>
              </button>
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#0E426B] uppercase">
                <span className="hidden sm:inline">CREVIA</span>
                <span className="hidden sm:inline text-neutral-300">•</span>
                <span>{selectedDivision === "tech" ? "Tech Talents" : "Studio Talents"}</span>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-8 md:p-10">
              <TeamSection
                division={selectedDivision || "studio"}
                selectedId={selectedTalentId}
                onSelectId={setSelectedTalentId}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Scroll to Top button on lower right corner */}
      <ScrollToTop />
    </div>
  );
}
