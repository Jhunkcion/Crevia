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
      <div className="talent-profile-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
              <div className="talent-profile-overlay__panel relative h-[90vh] w-[90vw] max-w-[1400px] overflow-hidden rounded-lg bg-white shadow-2xl">
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute top-4 left-4 z-10 p-2 text-2xl leading-none text-black hover:opacity-70"
                        aria-label="Close personal profile"
                        onClick={() => setSelectedTalent(null)}
                      >
                        ←
                      </button>

          <div className="flex h-full flex-col p-8 md:p-12">
            <div className="flex flex-1 gap-8">
              {/* Photo */}
              <div className="h-auto w-1/4 max-w-[20rem] self-center overflow-hidden rounded-lg bg-gray-200 aspect-[4/5]">
                <img
                  src={selectedTalent.image}
                  alt={selectedTalent.name}
                  className="h-full w-full object-cover"
                  width="600"
                  height="750"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="flex w-3/4 flex-col">
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Hi, I'm</span>
                  <h1 className="font-serif text-4xl font-bold">{selectedTalent.name}</h1>
                  <div className="mt-2 h-1 w-20 bg-blue-600" />
                </div>

                <p className="mb-4 text-gray-700">
                  {selectedTalent.description}
                </p>

                <p className="mb-6 text-sm text-gray-600">
                  {selectedTalent.specialization}
                </p>

                {/* Portfolio */}
                <div className="grid flex-1 grid-cols-2 gap-4">
                  {selectedTalent.portfolio.map((image, index) => (
                    <div
                      className="overflow-hidden rounded-lg bg-gray-200"
                      key={`${selectedTalent.id}-${index}`}
                    >
                      <img
                        src={image}
                        alt={`${selectedTalent.name} portfolio ${index + 1}`}
                        className="h-full w-full object-cover"
                        width="500"
                        height="500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * TEAM / TALENT LIST
   */
  return (
    <section className="flex h-full flex-col bg-white p-8 md:p-12">
      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col">
        
        {/* Header dengan Meet The Team dan STUDIO TALENTS */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Meet
              <br />
              The Team
            </h1>
          </div>
          
          <div className="text-right">
            <span className="text-sm font-semibold tracking-wider text-gray-400">
              {divisionTitle}
            </span>
          </div>
        </div>

        {/* Grid 4 cards horizontal - flex-1 untuk isi ruang */}
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {talents.map((talent) => (
            <button
              type="button"
              className="group relative flex h-full flex-col overflow-hidden bg-gray-50 transition-all hover:shadow-xl"
              key={talent.id}
              onClick={(event) => openTalent(talent, event.currentTarget)}
            >
              {/* Photo container dengan aspect ratio */}
              <div className="flex-1 w-full overflow-hidden bg-gray-200">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width="600"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Name dengan blue line */}
              <div className="p-3">
                <div className="mb-2 text-left text-sm font-semibold text-blue-600">
                  {talent.name}
                </div>
                <div className="h-1 w-full bg-blue-600" />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}