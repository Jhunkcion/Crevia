import { useCallback, useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import Talent from "./sections/Talent";
import Divisions from "./sections/Divisions";

type Page = "home" | "divisions" | "work" | "contact";

function PageIndicator({ page }: { page: Page }) {
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

const PAGES: readonly Page[] = [
  "home",
  "divisions",
  "work",
  "contact",
];

const DEFAULT_PAGE: Page = "home";
const WHEEL_THRESHOLD = 70;
const WHEEL_COOLDOWN = 700;

function pageFromHash(): Page {
  const value = window.location.hash.slice(1);
  if (PAGES.includes(value as Page)) {
    return value as Page;
  }

  if (window.location.hash) {
    window.history.replaceState(null, "", `#${DEFAULT_PAGE}`);
  }

  return DEFAULT_PAGE;
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>(pageFromHash);
  const [selectedDivision, setSelectedDivision] = useState<"studio" | "tech" | null>(null);

  const activePageRef = useRef<Page>(pageFromHash());
  const wheelLockRef = useRef(false);
  const pageViewRef = useRef<HTMLElement>(null);

  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  const navigateTo = useCallback((page: Page) => {
    if (page === activePageRef.current) {
      return;
    }

    activePageRef.current = page;
    setActivePage(page);
    if (page !== "divisions") setSelectedDivision(null);
    window.history.pushState(null, "", `#${page}`);
    pageViewRef.current?.scrollTo({ top: 0, behavior: "auto" });

  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const page = pageFromHash();
      activePageRef.current = page;
      setActivePage(page);
      setSelectedDivision(null);
      pageViewRef.current?.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, [navigateTo]);

  useEffect(() => {
    let wheelDelta = 0;
    let resetTimer: number | undefined;

    const handleWheel = (event: WheelEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[role=dialog]")) return;
      if (wheelLockRef.current || Math.abs(event.deltaY) < 2) return;

      wheelDelta += event.deltaY;
      if (resetTimer !== undefined) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        wheelDelta = 0;
        resetTimer = undefined;
      }, 180);

      if (Math.abs(wheelDelta) < WHEEL_THRESHOLD) return;

      const direction = wheelDelta > 0 ? 1 : -1;
      const currentIndex = PAGES.indexOf(activePageRef.current);
      const nextIndex = Math.max(0, Math.min(PAGES.length - 1, currentIndex + direction));

      wheelDelta = 0;
      if (nextIndex === currentIndex) return;

      wheelLockRef.current = true;
      navigateTo(PAGES[nextIndex]);
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_COOLDOWN);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (resetTimer !== undefined) window.clearTimeout(resetTimer);
    };
  }, [navigateTo]);

  const handleNavigate = (page: string) => {
    if (!PAGES.includes(page as Page)) {
      return;
    }

    navigateTo(page as Page);
  };

  return (
    <div className="app-shell relative h-[100dvh] w-full overflow-hidden bg-cream">

      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <PageIndicator page={activePage} />

      <main ref={pageViewRef} className="page-view">
        {activePage === "home" && <Hero onNavigate={handleNavigate} />}
        {activePage === "divisions" && <Divisions onSelect={setSelectedDivision} />}
        {activePage === "work" && <Work />}
        {activePage === "contact" && <Contact />}
      </main>

      {/* Talent overlay with backdrop blur */}
      {activePage === "divisions" && selectedDivision && (
        <div className="talent-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
                  <div className="talent-overlay__panel relative h-[90vh] w-[90vw] max-w-[1400px] overflow-hidden rounded-lg bg-white shadow-2xl">
            <button
              type="button"
              className="absolute top-4 left-4 z-10 px-4 py-2 text-sm font-semibold hover:opacity-70"
              onClick={() => setSelectedDivision(null)}
            >
              ← BACK
            </button>
            <Talent division={selectedDivision} />
          </div>
        </div>
      )}

    </div>
  );
}
