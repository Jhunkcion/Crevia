import { useEffect, useRef, useState } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      if (!sectionRef.current) return;
      const bounds = sectionRef.current.getBoundingClientRect();
      setProgress(
        clamp(-bounds.top / Math.max(1, bounds.height - window.innerHeight)),
      );
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    updatePreference();
    updateProgress();
    preference.addEventListener("change", updatePreference);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", updatePreference);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  // Each shape animates over ~26.5% of scroll, staggered by ~28.5%
  // Shape 1: 2.5% – 29%   | Shape 2: 31% – 57.5%  | Shape 3: 59.5% – 86%
  const curve    = reducedMotion ? 1 : ease((progress - 0.025) / 0.265);
  const diagonal = reducedMotion ? 1 : ease((progress - 0.31)  / 0.265);
  const wedge    = reducedMotion ? 1 : ease((progress - 0.595) / 0.265);

  return (
    <section
      ref={sectionRef}
      className="relative h-[400dvh] motion-reduce:h-dvh"
      aria-label="Scroll to assemble the logo"
    >
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">

        {/* ── Assembled logo ── */}
        <div
          className="relative h-[222px] w-[243px] shrink-0 scale-[0.85] sm:scale-100 lg:scale-[1.35]"
          role="img"
          aria-label="Three shapes fly in to form the logo"
        >
          <div className="absolute inset-0">

            {/* Shape 1 — C-curve (59f51.png): flies in from bottom-left */}
            <img
              src={`/c-part1.png`}
              alt=""
              draggable={false}
              className="absolute left-[17px] top-[19px] h-[231px] w-[202px] max-w-none will-change-transform"
              style={{
                opacity: clamp(curve * 4),
                transform: `translate3d(${(1 - curve) * -550}px, ${(1 - curve) * 210}px, 0) rotate(${(1 - curve) * -65}deg)`,
              }}
            />

            {/* Shape 2 — Diagonal bar (ebc80.png): flies in from top-right */}
            <div
              className="absolute left-[80px] top-[-30.5px] h-[224px] w-[184px] overflow-hidden will-change-transform"
              style={{
                opacity: clamp(diagonal * 4),
                transform: `translate3d(${(1 - diagonal) * 550}px, ${(1 - diagonal) * -380}px, 0) rotate(${(1 - diagonal) * 35}deg)`,
              }}
            >
              <img
                src={`/c-part2.png`}
                alt=""
                draggable={false}
                className="absolute left-[-0.2%] top-0 h-full w-[100.4%] max-w-none"
              />
            </div>

            {/* Shape 3 — Wedge (c7bff.png): flies in from top-left */}
            <img
              src={`/c-part3.png`}
              alt=""
              draggable={false}
              className="absolute left-[-30.5px] top-[-7.5px] h-[142px] w-[134px] max-w-none will-change-transform"
              style={{
                opacity: clamp(wedge * 4),
                transform: `translate3d(${(1 - wedge) * -400}px, ${(1 - wedge) * -400}px, 0) rotate(${(1 - wedge) * -85}deg)`,
              }}
            />
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span
            className={`h-6 w-px bg-[#80bce5] transition-opacity duration-500 ${
              progress >= 0.95 ? "opacity-30" : "opacity-100"
            }`}
          />
        </div>

      </div>
    </section>
  );
}
