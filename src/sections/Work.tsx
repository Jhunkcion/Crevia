import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchProjects } from "../lib/strapi";

interface ProjectItem {
  id: number;
  className: string;
  title: string;
  who: string;
  image: string;
  excerpt?: string;
  order?: number;
}

// 6-slot mosaic layout classes that mathematically fill a 3x3 grid with ZERO empty blanks:
// Includes both legacy gridy-* classes and modern human-readable aliases
// Row 1: wide_2x1 (2 cols) + standard_1x1 (1 col) = 3 cols
// Row 2: tall_1x2 (1 col, 2 rows) + wide_2x1 (2 cols) = 3 cols
// Row 3: tall_1x2 (continued) + standard_1x1 (1 col) + standard_1x1 (1 col) = 3 cols
const MOSAIC_SLOTS = [
  "gridy-2 gridyhe-1 wide_2x1",     // Slot 0: 2 Kolom x 1 Baris (Wide Landscape)
  "gridy-1 gridyhe-1 standard_1x1", // Slot 1: 1 Kolom x 1 Baris (Square)
  "gridy-1 gridyhe-2 tall_1x2",     // Slot 2: 1 Kolom x 2 Baris (Tall Portrait)
  "gridy-2 gridyhe-1 wide_2x1",     // Slot 3: 2 Kolom x 1 Baris (Wide Landscape)
  "gridy-1 gridyhe-1 standard_1x1", // Slot 4: 1 Kolom x 1 Baris (Square)
  "gridy-1 gridyhe-1 standard_1x1", // Slot 5: 1 Kolom x 1 Baris (Square)
];

function toGridClasses(val?: string, slotIndex?: number): string {
  const target = val || (slotIndex !== undefined ? MOSAIC_SLOTS[slotIndex % MOSAIC_SLOTS.length] : "standard_1x1");
  if (target.includes("wide_2x1") || (target.includes("gridy-2") && !target.includes("gridyhe-2"))) {
    return "gridy-2 gridyhe-1 wide_2x1";
  }
  if (target.includes("tall_1x2") || target.includes("gridyhe-2")) {
    return "gridy-1 gridyhe-2 tall_1x2";
  }
  if (target.includes("large_2x2") || (target.includes("gridy-2") && target.includes("gridyhe-2"))) {
    return "gridy-2 gridyhe-2 large_2x2";
  }
  if (target.includes("full_width_3x1") || target.includes("gridy-3")) {
    return "gridy-3 gridyhe-1 full_width_3x1";
  }
  return "gridy-1 gridyhe-1 standard_1x1";
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    className: "gridy-2 gridyhe-1 wide_2x1",
    title: "Brand Identity",
    who: "North Studio",
    image: "/project-bg.png",
    excerpt: "A playful, modern identity designed to make the brand feel memorable and premium.",
    order: 1,
  },
  {
    id: 2,
    className: "gridy-1 gridyhe-1 standard_1x1",
    title: "Campaign Launch",
    who: "Aster Labs",
    image: "/project-bg.png",
    excerpt: "A launch campaign focused on storytelling, motion, and audience engagement.",
    order: 2,
  },
  {
    id: 3,
    className: "gridy-1 gridyhe-2 tall_1x2",
    title: "Web Experience",
    who: "Sora Creative",
    image: "/project-bg.png",
    excerpt: "A polished digital experience built to turn first-time visitors into lasting clients.",
    order: 3,
  },
  {
    id: 4,
    className: "gridy-2 gridyhe-1 wide_2x1",
    title: "Product Story",
    who: "Morrow & Co.",
    image: "/project-bg.png",
    excerpt: "A concise product narrative that helps complex offerings feel clear and confident.",
    order: 4,
  },
  {
    id: 5,
    className: "gridy-1 gridyhe-1 standard_1x1",
    title: "Launch System",
    who: "Fieldhouse",
    image: "/project-bg.png",
    excerpt: "A structured rollout system that keeps strategy, design, and delivery aligned.",
    order: 5,
  },
  {
    id: 6,
    className: "gridy-1 gridyhe-1 standard_1x1",
    title: "Visual Direction",
    who: "Luma Collective",
    image: "/project-bg.png",
    excerpt: "A visual language built to feel bold, warm, and unmistakably contemporary.",
    order: 6,
  },
];

export default function Work() {
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenProject = (item: ProjectItem) => {
    setIsPortrait(Boolean(item.className && item.className.includes("tall_1x2")));
    setSelectedProject(item);
  };

  useEffect(() => {
    let isMounted = true;
    fetchProjects().then((data) => {
      if (!isMounted || !data || data.length === 0) return;
      setProjects(
        data.map((p) => ({
          id: p.id,
          title: p.title,
          who: p.client || "",
          image: p.image || "/project-bg.png",
          excerpt: p.excerpt || "",
          order: typeof p.order === "number" ? p.order : 0,
          className: p.layoutClass ? toGridClasses(p.layoutClass) : "",
        }))
      );
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Escape key handling: closes lightbox first if open, otherwise closes gallery
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedProject) {
          setSelectedProject(null);
        } else if (isGalleryOpen) {
          setIsGalleryOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, isGalleryOpen]);

  // Prevent background scroll when any modal is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (selectedProject || isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject, isGalleryOpen]);

  // Featured projects for Homepage mosaic:
  // Dynamically assigns projects to 6 mosaic slots that perfectly tessellate a 3x3 grid without any blank spaces.
  // Respects user-configured layout sizes (tall_1x2, wide_2x1, standard_1x1) from Strapi CMS.
  const featuredProjects = useMemo(() => {
    const pool = projects.length > 0 ? [...projects] : [...DEFAULT_PROJECTS];
    while (pool.length < 6 && DEFAULT_PROJECTS[pool.length]) {
      pool.push(DEFAULT_PROJECTS[pool.length]);
    }

    const items = pool.slice(0, 6);

    // Slot requirements for 100% gapless 3x3 layout:
    // Slot 0: wide_2x1 (cols 1-2, row 1)
    // Slot 1: standard_1x1 (col 3, row 1)
    // Slot 2: tall_1x2 (col 1, rows 2-3)
    // Slot 3: wide_2x1 (cols 2-3, row 2)
    // Slot 4: standard_1x1 (col 2, row 3)
    // Slot 5: standard_1x1 (col 3, row 3)
    const slotRequirements = [
      "wide_2x1",
      "standard_1x1",
      "tall_1x2",
      "wide_2x1",
      "standard_1x1",
      "standard_1x1",
    ];

    const assigned: (ProjectItem | null)[] = new Array(6).fill(null);
    const unassignedItems: ProjectItem[] = [];

    // Step 1: Assign items that explicitly match their requested layout class
    for (const item of items) {
      const cls = item.className || "";
      let targetType: string | null = null;
      if (cls.includes("tall_1x2")) targetType = "tall_1x2";
      else if (cls.includes("wide_2x1") || cls.includes("full_width_3x1")) targetType = "wide_2x1";
      else if (cls.includes("standard_1x1")) targetType = "standard_1x1";

      let placed = false;
      if (targetType) {
        const slotIdx = slotRequirements.findIndex(
          (req, idx) => req === targetType && assigned[idx] === null
        );
        if (slotIdx !== -1) {
          assigned[slotIdx] = {
            ...item,
            className: MOSAIC_SLOTS[slotIdx],
          };
          placed = true;
        }
      }

      if (!placed) {
        unassignedItems.push(item);
      }
    }

    // Step 2: Fill remaining unfilled slots with unassigned items
    for (let i = 0; i < 6; i++) {
      if (assigned[i] === null) {
        const nextItem = unassignedItems.shift() || DEFAULT_PROJECTS[i];
        assigned[i] = {
          ...nextItem,
          className: MOSAIC_SLOTS[i],
        };
      }
    }

    return assigned as ProjectItem[];
  }, [projects]);

  // Filtered projects inside the Gallery modal (contains ALL projects from Strapi)
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.who.toLowerCase().includes(query) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(query))
    );
  }, [projects, searchQuery]);

  return (
    <section id="work" className="relative w-full bg-cream">
      {/* ── Featured Mosaic Grid (Homepage) ── */}
      <div className="gridywrap">
        {featuredProjects.map((item) => (
          <div
            key={item.id}
            className={`${item.className} cursor-pointer`}
            onClick={() => handleOpenProject(item)}
          >
            <div
              className="gridimg"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* Hover overlay */}
            <div
              className="gridinfo"
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title} by ${item.who}`}
              onClick={() => handleOpenProject(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleOpenProject(item);
                }
              }}
            >
              <button
                type="button"
                className="grid-btn grid-more"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenProject(item);
                }}
                aria-label={`Focus on ${item.title} by ${item.who}`}
              >
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Action Bar: View Full Gallery ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-12 py-8 sm:py-10 border-t border-black/5 bg-cream">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0E426B]/60">
            Selected Archives
          </p>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0E426B]">
            Explore All Works ({projects.length})
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIsGalleryOpen(true)}
          className="group inline-flex items-center gap-3 rounded-full border-2 border-[#0E426B] bg-[#0E426B] px-6 sm:px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:bg-transparent hover:text-[#0E426B] hover:shadow-xl active:scale-95 cursor-pointer"
        >
          <span>Open Gallery</span>
          <span className="flex h-5 items-center justify-center rounded-full bg-white/20 px-2 text-[10px] font-bold group-hover:bg-[#0E426B]/15 group-hover:text-[#0E426B] transition-colors">
            {projects.length}
          </span>
          <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* ── Dedicated Full Gallery Modal ── */}
      <AnimatePresence>
        {isGalleryOpen && (
          <div
            className="gallery-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 md:p-6 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Projects Gallery"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsGalleryOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex h-[92vh] w-[95vw] max-w-[1400px] flex-col overflow-hidden rounded-2xl bg-[#F6F6F6] shadow-2xl border border-black/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar */}
              <div className="sticky top-0 z-30 flex items-center justify-between border-b border-black/10 bg-[#F6F6F6]/95 px-4 py-3.5 backdrop-blur sm:px-8 sm:py-4">
                <button
                  type="button"
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-sm transition hover:bg-black hover:text-white active:scale-95 sm:px-4 sm:py-2"
                  aria-label="Close project gallery"
                  onClick={() => setIsGalleryOpen(false)}
                >
                  <span className="text-sm leading-none transition-transform group-hover:-translate-x-0.5">←</span>
                  <span>Back</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#0E426B] uppercase">
                  <span className="hidden sm:inline">CREVIA</span>
                  <span className="hidden sm:inline text-neutral-300">•</span>
                  <span>Projects Gallery</span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-[#0E426B]/70">
                  <span>{filteredProjects.length} / {projects.length} Works</span>
                </div>
              </div>

              {/* Scrollable Gallery Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 md:p-10">
                <div className="mx-auto max-w-6xl">
                  {/* Gallery Header & Search */}
                  <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0E426B]/50 mb-1">
                        Portfolio Collection
                      </p>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0E426B]">
                        All Projects
                      </h2>
                    </div>

                    <div className="w-full md:w-72">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search projects..."
                          className="w-full rounded-full border border-black/20 bg-white px-4 py-2 pl-9 text-xs text-black placeholder:text-neutral-400 focus:border-[#0E426B] focus:outline-none focus:ring-1 focus:ring-[#0E426B]"
                        />
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
                          🔍
                        </span>
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Fluid Multi-column Grid */}
                  {filteredProjects.length === 0 ? (
                    <div className="py-20 text-center">
                      <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                        No projects found matching "{searchQuery}"
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {filteredProjects.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenProject(item)}
                          className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40 flex items-center justify-center">
                              <span className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 inline-flex items-center gap-2 rounded-full border border-white/80 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                                <span>View Project</span>
                                <span className="text-xs">↗</span>
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#65bafa]">
                                  {item.who || "Crevia Client"}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  #{String(item.id).padStart(2, "0")}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold uppercase tracking-tight text-[#0E426B]">
                                {item.title}
                              </h3>
                              {item.excerpt && (
                                <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                                  {item.excerpt}
                                </p>
                              )}
                            </div>

                            <div className="mt-5 pt-3.5 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#0E426B]">
                              <span>Open preview</span>
                              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Focused picture overlay / lightbox ── */}
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
              if (event.target === event.currentTarget) {
                setSelectedProject(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className={`relative inline-flex flex-col items-center justify-center overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-neutral-950/95 cursor-default ${
                isPortrait
                  ? "w-fit max-w-[92vw] max-h-[88vh]"
                  : "w-[92vw] max-w-4xl max-h-[85vh]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Picture: landscape projects match Brand Identity generous scale, while portrait displays tall and uncropped */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                decoding="async"
                onLoad={(e) => {
                  const { naturalWidth, naturalHeight } = e.currentTarget;
                  setIsPortrait(naturalHeight > naturalWidth);
                }}
                className={
                  isPortrait
                    ? "max-h-[84vh] max-w-[90vw] min-h-[min(70vh,500px)] w-auto h-auto object-contain block pointer-events-none select-none"
                    : "w-full max-h-[82vh] h-auto object-contain block pointer-events-none select-none"
                }
              />

              {/* Minimize / Close button (top right) */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Minimize focused picture"
                title="Minimize"
                className="absolute top-3.5 right-3.5 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/90 text-white/90 hover:text-white border border-white/25 backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer"
              >
                <i className="fa fa-compress text-base sm:text-lg" aria-hidden="true" />
              </button>

              {/* Bottom information bar */}
              <div className="absolute inset-x-0 bottom-0 z-10 pt-20 pb-5 px-5 sm:pb-6 sm:px-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none">
                <div className="max-w-xl text-left">
                  <h2
                    id="focused-picture-title"
                    className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white drop-shadow-md"
                  >
                    {selectedProject.title}
                  </h2>
                  {selectedProject.who && (
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/85">
                      <span className="inline-flex items-center gap-1.5 font-light">
                        <i className="fa fa-user text-[#65bafa]" aria-hidden="true" />
                        <span>{selectedProject.who}</span>
                      </span>
                    </div>
                  )}
                  {selectedProject.excerpt && (
                    <p className="mt-2 text-xs sm:text-sm text-white/75 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {selectedProject.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
