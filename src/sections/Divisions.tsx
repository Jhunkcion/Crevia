import { useState } from "react";

type DivisionType = "studio" | "tech";

type DivisionsProps = {
  onSelect: (division: DivisionType) => void;
};

interface DivisionItem {
  id: DivisionType;
  title: string;
  description: string;
}

const DIVISIONS: DivisionItem[] = [
  {
    id: "studio",
    title: "Studio",
    description:
      "Creative direction, visual systems, motion design, and brand experiences crafted to connect culture, talent, and people.",
  },
  {
    id: "tech",
    title: "Tech",
    description:
      "Interactive digital engineering, creative technology, and scalable web architectures built with precision and passion.",
  },
];

export default function Divisions({ onSelect }: DivisionsProps) {
  const [activeDivision, setActiveDivision] = useState<DivisionType>("studio");
  const [revealedDivision, setRevealedDivision] = useState<DivisionType | null>(null);

  const selectDivision = (division: DivisionType) => {
    setActiveDivision(division);
    onSelect(division);
  };

  const toggleReveal = (division: DivisionType) => {
    setRevealedDivision((prev) => (prev === division ? null : division));
  };

  return (
    <section
      className={`divisions-page divisions-page--${activeDivision}`}
      aria-labelledby="divisions-title"
    >
      <h1 id="divisions-title" className="sr-only">
        CREVIA divisions
      </h1>

      <div className="divisions-grid">
        {DIVISIONS.map((item) => {
          const isStudio = item.id === "studio";
          const isRevealed = revealedDivision === item.id;

          return (
            <div
              key={item.id}
              role="region"
              aria-label={`${item.title} division card`}
              className={`division-card division-card--${item.id} group relative overflow-hidden rounded-xl sm:rounded-[1.25rem] bg-[#0E426B] shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                isRevealed ? "is-revealed" : ""
              }`}
              onMouseEnter={() => {
                setActiveDivision(item.id);
              }}
              onMouseLeave={() => {
                setRevealedDivision(null);
              }}
              onClick={() => toggleReveal(item.id)}
            >
              {/* ── Default Unhovered State ── */}
              <div
                className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-6 md:p-8 text-[#f7fbff] transition-all duration-500 ease-out ${
                  isStudio ? "items-end text-right" : "items-start text-left"
                } group-hover:scale-95 group-hover:opacity-0 ${
                  isRevealed
                    ? "pointer-events-none scale-95 opacity-0"
                    : "opacity-100"
                }`}
              >
                <span
                  className={`division-card__top-line division-card__top-line--${item.id}`}
                  aria-hidden="true"
                />
                <span
                  className={`division-card__bottom-line division-card__bottom-line--${item.id}`}
                  aria-hidden="true"
                />

                <span
                  className={`division-card__label division-card__label--${item.id}`}
                >
                  {item.title}
                </span>

                <span
                  className={`division-card__label-line division-card__label-line--${item.id}`}
                  aria-hidden="true"
                />

                <span className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] font-semibold tracking-[0.16em] text-[#65bafa]/70 uppercase transition-opacity duration-300 group-hover:opacity-0">
                  Tap / Hover
                </span>
              </div>

              {/* ── Hovered / Revealed State (Mockup Design) ── */}
              <div
                className={`absolute inset-0 flex flex-col justify-between p-1.5 pb-2.5 sm:p-2 sm:pb-6 bg-[#0E426B] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
                  isRevealed
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-full opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
                }`}
              >
                {/* Top Rounded Light Blue Box with Division Name */}
                <div className="flex h-[38%] sm:h-[42%] w-full select-none items-center justify-center rounded-lg sm:rounded-2xl bg-[#B9D9FF] px-2 sm:px-4 shadow-inner">
                  <h3 className="text-sm font-semibold tracking-tight text-[#0E426B] sm:text-2xl md:text-3xl lg:text-4xl">
                    {item.title}
                  </h3>
                </div>

                {/* Middle Description Text & Cyan Line */}
                <div className="my-auto flex select-none flex-col items-center justify-center px-1.5 text-center sm:px-6">
                  <p className="max-w-[260px] text-[9px] font-normal leading-tight text-white/95 sm:text-xs sm:leading-relaxed">
                    {item.description}
                  </p>
                  <div
                    className="mt-1.5 h-0.5 w-16 rounded-full bg-[#65bafa] sm:mt-4 sm:h-1 sm:w-44"
                    aria-hidden="true"
                  />
                </div>

                {/* Bottom Designed Talents Button */}
                <div className="flex justify-start px-1 sm:px-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectDivision(item.id);
                    }}
                    className="group/btn relative inline-flex cursor-pointer items-center gap-1.5 sm:gap-2.5 rounded-md sm:rounded-lg bg-[#FFFBF0] px-2.5 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-xs font-bold uppercase tracking-wider text-[#0E426B] shadow-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#002B66] hover:shadow-xl active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Open ${item.title} talents`}
                  >
                    <span>Talents</span>
                    <svg
                      className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
