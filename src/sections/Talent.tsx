import { useEffect, useRef, useState } from "react";

type TalentItem = {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  specialization: string;
  portfolio: string[];
};

type TalentProps = {
  division?: "studio" | "tech";
};

const studioTalents: TalentItem[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Creative Designer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    description:
      "Creative designer focused on creating meaningful visual experiences, strong identities and memorable digital stories.",
    specialization:
      "Specializing in high-concept brand identities and immersive cinematic narratives.",
    portfolio: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Art Director",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    description:
      "Art director creating visual systems that connect culture, people and contemporary design.",
    specialization:
      "Specializing in art direction, campaign visuals and creative concepts.",
    portfolio: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 3,
    name: "Alex Doe",
    role: "Motion Designer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    description:
      "Motion designer combining typography, animation and visual storytelling.",
    specialization:
      "Specializing in motion graphics, animation and visual storytelling.",
    portfolio: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 4,
    name: "Mike Doe",
    role: "Visual Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    description:
      "Visual designer working across identity, digital products and experimental visual systems.",
    specialization:
      "Specializing in visual identity, digital design and creative direction.",
    portfolio: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80",
    ],
  },
];

const techTalents: TalentItem[] = [
  {
    id: 1,
    name: "John Tech",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    description:
      "Frontend developer building modern, interactive and highly responsive digital experiences.",
    specialization:
      "Specializing in React, TypeScript, interaction design and creative technology.",
    portfolio: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 2,
    name: "Jane Tech",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    description:
      "Software engineer focused on scalable applications and technology-driven products.",
    specialization:
      "Specializing in application architecture, APIs and modern web technologies.",
    portfolio: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 3,
    name: "Alex Tech",
    role: "Creative Technologist",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    description:
      "Creative technologist exploring the intersection between technology, interaction and culture.",
    specialization:
      "Specializing in interactive installations, creative coding and emerging technology.",
    portfolio: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 4,
    name: "Mike Tech",
    role: "UI Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    description:
      "UI engineer turning creative concepts into polished and performant interfaces.",
    specialization:
      "Specializing in design systems, frontend architecture and interaction.",
    portfolio: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
    ],
  },
];

export default function Talent({
  division = "studio",
}: TalentProps) {
  const [selectedTalent, setSelectedTalent] = useState<TalentItem | null>(
    null
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openTalent = (
    talent: TalentItem,
    trigger: HTMLButtonElement
  ) => {
    triggerRef.current = trigger;
    setSelectedTalent(talent);
  };

  useEffect(() => {
    if (!selectedTalent) {
      triggerRef.current?.focus();
      return;
    }
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTalent(null);
      if (event.key !== "Tab") return;
      const dialog = closeButtonRef.current?.closest('[role="dialog"]');
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedTalent]);

  const talents = division === "tech" ? techTalents : studioTalents;

  const divisionTitle =
    division === "tech" ? "TECH TALENTS" : "STUDIO TALENTS";

  /*
   * DETAIL TALENT
   */
  if (selectedTalent) {
    return (
      <section className="talent-detail-section" role="dialog" aria-modal="true" aria-labelledby="talent-detail-title">
        <div className="talent-detail-wrapper">
          <button
            ref={closeButtonRef}
            type="button"
            className="talent-back-button"
            onClick={() => setSelectedTalent(null)}
          >
            ← BACK
          </button>

          <div className="talent-detail-card">
            <div className="talent-detail-photo">
              <img
                src={selectedTalent.image}
                alt={selectedTalent.name}
                  width="600"
                  height="750"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="talent-detail-content">
              <div className="talent-detail-heading">
                <div>
                  <span className="talent-detail-hi">Hi, I'm</span>

                  <h1 id="talent-detail-title">{selectedTalent.name}</h1>
                </div>

                <div className="talent-detail-arrows">
                  <button
                    type="button"
                    onClick={() => setSelectedTalent(null)}
                    aria-label="Back"
                  >
                    ↩
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTalent(null)}
                    aria-label="Close"
                  >
                    ↪
                  </button>
                </div>
              </div>

              <div className="talent-detail-line" />

              <p className="talent-detail-description">
                {selectedTalent.description}
              </p>

              <p className="talent-detail-specialization">
                {selectedTalent.specialization}
              </p>

              <div className="talent-detail-portfolio">
                {selectedTalent.portfolio.map((image, index) => (
                  <div
                    className="talent-portfolio-image"
                    key={`${selectedTalent.id}-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${selectedTalent.name} portfolio ${index + 1}`}
                      width="500"
                      height="500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              <div className="talent-detail-side-buttons">
                <button type="button" aria-label="Close talent details" onClick={() => setSelectedTalent(null)}>↗</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * TEAM / TALENT LIST
   */
  return (
    <section className="talent-team-section">
      <div className="talent-team-container">

        <div className="talent-team-header">
          <div>
            <h1>
              Meet
              <br />
              The Team
            </h1>
          </div>

          <span>{divisionTitle}</span>
        </div>

        <div className="talent-team-list">
          {talents.map((talent) => (
            <button
              type="button"
              className="talent-team-card"
              key={talent.id}
              onClick={(event) => openTalent(talent, event.currentTarget)}
            >
              <div className="talent-team-photo">
                <img
                  src={talent.image}
                  alt={talent.name}
                  width="600"
                  height="750"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="talent-team-name">
                {talent.name}
              </div>

              <div className="talent-team-blue-line" />
            </button>
          ))}
        </div>

        <div className="talent-highlight-title">
          {division === "tech"
            ? "Tech Member highlight"
            : "Studio Member highlight"}
        </div>

        <div className="talent-highlight-card">
          <div className="talent-highlight-photo">
            <img
              src={talents[0].image}
              alt={talents[0].name}
              width="600"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="talent-highlight-content">
            <div className="talent-highlight-top">
              <div>
                <span>Hi, I'm</span>
                <h2>{talents[0].name}</h2>
              </div>

              <div className="talent-highlight-arrows">
                <button type="button" aria-label="Open talent details" onClick={(event) => openTalent(talents[0], event.currentTarget)}>↗</button>
              </div>
            </div>

            <p>{talents[0].description}</p>

            <small>{talents[0].specialization}</small>

            <div className="talent-highlight-portfolio">
              {talents[0].portfolio.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${talents[0].name} portfolio ${index + 1}`}
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>

          <div className="talent-highlight-side">
            <button type="button" aria-label="Open talent details" onClick={(event) => openTalent(talents[0], event.currentTarget)}>↗</button>
          </div>
        </div>

      </div>
    </section>
  );
}