import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectItem {
  id: number;
  className: string;
  title: string;
  time: string;
  who: string;
  image: string;
  excerpt?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    className: "gridy-2 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Bruce Wayne",
    image: "/project-bg.png",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    id: 2,
    className: "gridy-1 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Harvey Dent",
    image: "/project-bg.png",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    id: 3,
    className: "gridy-1 gridyhe-2",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Clark Kent",
    image: "/project-bg.png",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    id: 4,
    className: "gridy-2 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Tony Stark",
    image: "/project-bg.png",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    id: 5,
    className: "gridy-1 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Steve Rogers",
    image: "/project-bg.png",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
  {
    id: 6,
    className: "gridy-1 gridyhe-1",
    title: "Item Title",
    time: "17:22 17th Feb 2015",
    who: "Natasha Romanoff",
    image: "/project-bg.png",
    excerpt: "Lorem ipsum dolor set amet, some dummy content..",
  },
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [selectedProject]);

  return (
    <section id="work" className="relative w-full">
      <div className="gridywrap">
        {PROJECTS.map((item) => (
          <div key={item.id} className={item.className}>
            <div
              className="gridimg"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* Hover overlay: only the button shows up */}
            <div
              className="gridinfo"
              onClick={() => setSelectedProject(item)}
            >
              <button
                type="button"
                className="grid-btn grid-more"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(item);
                }}
                aria-label={`Focus on ${item.title} by ${item.who}`}
              >
                <span>View</span>
                <i className="fa fa-plus" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Focused picture overlay / lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 md:p-10 select-none cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="focused-picture-title"
            onMouseDown={(event) => {
              // Click on the blank area outside the picture to minimize
              if (event.target === event.currentTarget) {
                setSelectedProject(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 14 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl border border-white/15 bg-neutral-900 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Picture in the middle */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-center pointer-events-none select-none"
              />

              {/* Minimize button (top right) */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Minimize focused picture"
                title="Minimize"
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/25 backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer"
              >
                <i className="fa fa-compress text-base sm:text-lg" aria-hidden="true" />
              </button>

              {/* Bottom-left information: ONLY Title, followed by dates and author */}
              <div className="absolute inset-x-0 bottom-0 z-10 pt-24 pb-6 px-6 sm:pb-8 sm:px-8 md:pb-10 md:px-10 bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none">
                <div className="max-w-2xl text-left">
                  <h2
                    id="focused-picture-title"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide text-white drop-shadow-md"
                  >
                    {selectedProject.title}
                  </h2>
                  <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/85">
                    <span className="inline-flex items-center gap-1.5 font-light">
                      <i className="fa fa-clock-o text-[#65bafa]" aria-hidden="true" />
                      <span>{selectedProject.time}</span>
                    </span>
                    <span className="text-white/40" aria-hidden="true">•</span>
                    <span className="inline-flex items-center gap-1.5 font-light">
                      <i className="fa fa-user text-[#65bafa]" aria-hidden="true" />
                      <span>{selectedProject.who}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}