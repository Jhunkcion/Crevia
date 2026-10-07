import { useState } from "react";

type DivisionsProps = {
  onSelect: (division: "studio" | "tech") => void;
};

export default function Divisions({ onSelect }: DivisionsProps) {
  const [activeDivision, setActiveDivision] = useState<"studio" | "tech">("studio");

  const selectDivision = (division: "studio" | "tech") => {
    setActiveDivision(division);
    onSelect(division);
  };

  return (
    <section className={`divisions-page divisions-page--${activeDivision}`} aria-labelledby="divisions-title">
      <h1 id="divisions-title" className="sr-only">CREVIA divisions</h1>
      <div className="divisions-grid">
          <button type="button" className="division-card division-card--studio" onMouseEnter={() => setActiveDivision("studio")} onFocus={() => setActiveDivision("studio")} onClick={() => selectDivision("studio")}>
          <span className="division-card__top-line" />
          <span className="division-card__bottom-line" />
          <span className="division-card__label">Studio</span>
        </button>
          <button type="button" className="division-card division-card--tech" onMouseEnter={() => setActiveDivision("tech")} onFocus={() => setActiveDivision("tech")} onClick={() => selectDivision("tech")}>
          <span className="division-card__top-line" />
          <span className="division-card__bottom-line" />
          <span className="division-card__label">Tech</span>
        </button>
      </div>
    </section>
  );
}
