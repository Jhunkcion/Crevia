import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const studioMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Creative Designer",
    bio: "Specializing in high-concept brand identities and immersive cinematic narratives. Crafting award-winning visual experiences that merge pristine modern aesthetics with emotional storytelling.",
    photo: "/talent-john.png",
    works: ["/project-bg.png", "/project-cover.png"],
    socials: {
      instagram: "https://instagram.com/crevia",
      tiktok: "https://tiktok.com/@crevia",
      facebook: "https://facebook.com/crevia",
    },
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Art Director",
    bio: "Art director shaping visual systems that connect culture and people. Leading multi-disciplinary brand transformations across print, digital, and spatial media.",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    works: ["/project-cover.png", "/project-bg.png"],
    socials: {
      instagram: "https://instagram.com/crevia",
      tiktok: "https://tiktok.com/@crevia",
      facebook: "https://facebook.com/crevia",
    },
  },
  {
    id: 3,
    name: "Alex Doe",
    role: "Motion Designer",
    bio: "Motion designer combining typography, rhythm, and kinetic storytelling to create mesmerizing motion languages for leading global brands.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    works: ["/project-bg.png", "/project-cover.png"],
    socials: {
      instagram: "https://instagram.com/crevia",
      tiktok: "https://tiktok.com/@crevia",
      facebook: "https://facebook.com/crevia",
    },
  },
  {
    id: 4,
    name: "Mike Doe",
    role: "Visual Designer",
    bio: "Visual designer working across identity systems and interactive digital products with an uncompromising eye for minimalist aesthetics.",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    works: ["/project-cover.png", "/project-bg.png"],
    socials: {
      instagram: "https://instagram.com/crevia",
      tiktok: "https://tiktok.com/@crevia",
      facebook: "https://facebook.com/crevia",
    },
  },
];

const techMembers = [
  {
    id: 101,
    name: "Sarah Chen",
    role: "Lead Creative Technologist",
    bio: "Architecting interactive digital products at the intersection of creative code and contemporary design systems.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    works: ["/project-bg.png", "/project-cover.png"],
    socials: {
      instagram: "https://instagram.com/crevia",
      tiktok: "https://tiktok.com/@crevia",
      facebook: "https://facebook.com/crevia",
    },
  },
  {
    id: 102,
    name: "David Kim",
    role: "Senior Full-Stack Engineer",
    bio: "Building robust, scalable architectures and real-time digital ecosystems for enterprise and creative platforms.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    works: ["/project-cover.png", "/project-bg.png"],
    socials: {
      instagram: "https://instagram.com/crevia",
      tiktok: "https://tiktok.com/@crevia",
      facebook: "https://facebook.com/crevia",
    },
  },
  {
    id: 103,
    name: "Elena Rostova",
    role: "Creative Developer",
    bio: "WebGL, shader programming, and responsive 3D web experiences delivering breakthrough visual performance.",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    works: ["/project-bg.png", "/project-cover.png"],
    socials: {
      instagram: "https://instagram.com/crevia",
      tiktok: "https://tiktok.com/@crevia",
      facebook: "https://facebook.com/crevia",
    },
  },
  {
    id: 104,
    name: "Marcus Lee",
    role: "Systems & Infrastructure Lead",
    bio: "Specializing in cloud infrastructure, performance optimization, and distributed systems architecture.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    works: ["/project-cover.png", "/project-bg.png"],
    socials: {
      instagram: "https://instagram.com/crevia",
      tiktok: "https://tiktok.com/@crevia",
      facebook: "https://facebook.com/crevia",
    },
  },
];

function SilhouettePlaceholder() {
  return (
    <svg
      viewBox="0 0 240 320"
      className="h-full w-full bg-neutral-200 text-neutral-400"
      role="img"
      aria-hidden="true"
    >
      <circle cx="120" cy="92" r="42" fill="none" stroke="currentColor" strokeWidth="4" />
      <path
        d="M48 276c4-58 31-92 72-92s68 34 72 92"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
}

export default function TeamSection({ division = "studio" }) {
  const [selectedId, setSelectedId] = useState(null);
  const reduceMotion = useReducedMotion();

  const teamMembers = division === "tech" ? techMembers : studioMembers;
  const selectedIndex = teamMembers.findIndex((m) => m.id === selectedId);
  const selectedMember = selectedIndex !== -1 ? teamMembers[selectedIndex] : null;

  useEffect(() => {
    setSelectedId(null);
  }, [division]);

  // Navigate between members in detail view
  const goToNext = () => {
    if (selectedIndex === -1) return;
    const nextIdx = (selectedIndex + 1) % teamMembers.length;
    setSelectedId(teamMembers[nextIdx].id);
  };

  const goToPrev = () => {
    if (selectedIndex === -1) return;
    const prevIdx = (selectedIndex - 1 + teamMembers.length) % teamMembers.length;
    setSelectedId(teamMembers[prevIdx].id);
  };

  return (
    <div className="flex h-full w-full flex-col justify-center bg-[#F6F6F6] p-6 text-black sm:p-10 md:p-12 overflow-y-auto">
      <AnimatePresence mode="wait">
        {!selectedMember ? (
          /* ── View 1: List of Talents ("Meet The Team") ── */
          <motion.div
            key="team-list"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? false : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto w-full max-w-6xl"
          >
            <header className="mb-10 flex items-end justify-between gap-6 border-b border-black/10 pb-6 sm:mb-12">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#0E426B] uppercase">
                  {division === "tech" ? "TECH TALENTS" : "STUDIO TALENTS"}
                </span>
                <h2 className="mt-2 font-serif text-5xl font-light leading-none tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
                  Meet The Team
                </h2>
              </div>
              <p className="hidden max-w-xs text-right text-xs text-neutral-500 sm:block">
                Click any talent to explore their portfolio, bio, and social channels.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setSelectedId(member.id)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-[#0E426B]/30"
                  aria-label={`View profile of ${member.name}`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <SilhouettePlaceholder />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      {member.role}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl text-neutral-900 group-hover:text-[#0E426B] transition-colors">
                      {member.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#0E426B]">
                      <span>View Profile</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* ── View 2: Individual Talent Card (Matching Attached Mockup) ── */
          <motion.div
            key={`detail-${selectedMember.id}`}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? false : { opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex w-full max-w-5xl items-center justify-center py-2"
          >
            <div className="relative flex w-full flex-col overflow-hidden rounded-2xl bg-[#F6F6F6] shadow-2xl border border-black/10 md:flex-row">
              {/* Left Column: Portrait Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200 md:aspect-auto md:w-[36%] md:min-h-[460px]">
                {selectedMember.photo ? (
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <SilhouettePlaceholder />
                )}
              </div>

              {/* Right Column: Bio, Socials, Header & Navigation */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-10">
                {/* Header Row: Social Icons (Left) + "Hi, I'm {Name}" (Right) */}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    {/* Social Media Icons */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      {/* Instagram */}
                      <a
                        href={selectedMember.socials?.instagram || "https://instagram.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95"
                        aria-label={`${selectedMember.name} on Instagram`}
                      >
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>

                      {/* TikTok */}
                      <a
                        href={selectedMember.socials?.tiktok || "https://tiktok.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95"
                        aria-label={`${selectedMember.name} on TikTok`}
                      >
                        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47V10.89a8.28 8.28 0 0 0 5.77 2.29V9.74a4.84 4.84 0 0 1-3.77-3.05z" />
                        </svg>
                      </a>

                      {/* Facebook */}
                      <a
                        href={selectedMember.socials?.facebook || "https://facebook.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95"
                        aria-label={`${selectedMember.name} on Facebook`}
                      >
                        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    </div>

                    {/* Right: "Hi, I'm" / "John Doe" Headline */}
                    <div className="text-right">
                      <span className="block font-serif text-2xl font-light text-neutral-800 sm:text-3xl">
                        Hi, I'm
                      </span>
                      <h3 className="block font-serif text-3xl font-normal tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
                        {selectedMember.name}
                      </h3>
                    </div>
                  </div>

                  {/* Horizontal dividing line */}
                  <div className="my-5 h-px w-full bg-neutral-300" aria-hidden="true" />
                </div>

                {/* Middle: Bio Paragraph */}
                <div className="my-4">
                  <p className="max-w-xl text-xs leading-relaxed text-neutral-600 sm:text-sm md:text-[15px]">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Bottom Row: Featured Projects (Left) + Navigation Buttons (Right) */}
                <div className="mt-4 flex items-end justify-between gap-4 pt-2">
                  {/* Two Project Thumbnails Side by Side */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    {selectedMember.works && selectedMember.works.length > 0 ? (
                      selectedMember.works.slice(0, 2).map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-[16/10] w-32 overflow-hidden rounded-lg bg-neutral-900 shadow-md transition-transform duration-300 hover:scale-105 sm:w-40 md:w-44"
                        >
                          <img
                            src={img}
                            alt={`${selectedMember.name} work preview ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="aspect-[16/10] w-32 overflow-hidden rounded-lg bg-neutral-900 shadow-md sm:w-40 md:w-44">
                        <img
                          src="/project-bg.png"
                          alt="Project work preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Three Circular Action Buttons Stacked Vertically */}
                  <div className="flex flex-col items-center gap-2.5 sm:gap-3">
                    {/* Top: Next Talent (Curved Arrow Right) */}
                    <button
                      type="button"
                      onClick={goToNext}
                      aria-label="Next talent"
                      title="Next talent"
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black/80 bg-white text-black shadow-sm transition-all duration-200 hover:scale-110 hover:border-black hover:bg-neutral-100 hover:shadow-md active:scale-95 sm:h-11 sm:w-11"
                    >
                      <svg
                        className="h-5 w-5 fill-none stroke-current"
                        viewBox="0 0 24 24"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 14l5-5-5-5" />
                        <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
                      </svg>
                    </button>

                    {/* Middle: Previous Talent (Curved Arrow Left) */}
                    <button
                      type="button"
                      onClick={goToPrev}
                      aria-label="Previous talent"
                      title="Previous talent"
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black/80 bg-white text-black shadow-sm transition-all duration-200 hover:scale-110 hover:border-black hover:bg-neutral-100 hover:shadow-md active:scale-95 sm:h-11 sm:w-11"
                    >
                      <svg
                        className="h-5 w-5 fill-none stroke-current"
                        viewBox="0 0 24 24"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 14l-5-5 5-5" />
                        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                      </svg>
                    </button>

                    {/* Bottom: Home / Return to Team List (House Icon) */}
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      aria-label="Back to talent list"
                      title="Back to talent list"
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black/80 bg-white text-black shadow-sm transition-all duration-200 hover:scale-110 hover:border-black hover:bg-neutral-100 hover:shadow-md active:scale-95 sm:h-11 sm:w-11"
                    >
                      <svg className="h-5 w-5 fill-black" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
