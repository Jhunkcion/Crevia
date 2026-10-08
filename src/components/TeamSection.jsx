import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Creative Designer",
    bio: "Creative designer focused on meaningful visual experiences.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Art Director",
    bio: "Art director creating visual systems that connect culture and people.",
    photo: null,
  },
  {
    id: 3,
    name: "Alex Doe",
    role: "Motion Designer",
    bio: "Motion designer combining typography, animation and storytelling.",
    photo: null,
  },
  {
    id: 4,
    name: "Mike Doe",
    role: "Visual Designer",
    bio: "Visual designer working across identity and digital products.",
    photo: null,
  },
];

function SilhouettePlaceholder() {
  return (
    <svg
      viewBox="0 0 240 320"
      className="h-full w-full"
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

export default function TeamSection() {
  const [selectedId, setSelectedId] = useState(null);
  const [isReturning, setIsReturning] = useState(false);
  const reduceMotion = useReducedMotion();
  const returnTimerRef = useRef(null);
  const selectedMember = teamMembers.find((member) => member.id === selectedId);

  useEffect(() => () => {
    if (returnTimerRef.current) window.clearTimeout(returnTimerRef.current);
  }, []);

  const handleMemberClick = (memberId) => {
    if (selectedId === memberId) {
      setIsReturning(true);
      setSelectedId(null);
      if (returnTimerRef.current) window.clearTimeout(returnTimerRef.current);
      returnTimerRef.current = window.setTimeout(
        () => setIsReturning(false),
        reduceMotion ? 0 : 520,
      );
      return;
    }
    if (returnTimerRef.current) window.clearTimeout(returnTimerRef.current);
    setIsReturning(false);
    setSelectedId(memberId);
  };

  return (
    <section className="min-h-screen bg-[#F6F6F6] px-8 py-16 text-black md:px-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex items-end justify-between gap-8">
          <h2 className="font-serif text-6xl font-light leading-[0.88] tracking-[-0.06em] md:text-7xl">
            Meet
            <br />
            The Team
          </h2>
          <span className="pb-1 text-xs font-medium tracking-[0.18em] text-gray-500">
            STUDIO TALENTS
          </span>
        </header>

        <div className={selectedId || isReturning ? "flex flex-col items-start gap-10 md:flex-row md:gap-12" : ""}>
        <motion.div layout className="flex items-stretch gap-5 overflow-hidden pb-4 md:gap-8">
          <AnimatePresence initial={false} mode="popLayout">
          {teamMembers
            .filter((member) => !selectedId || member.id === selectedId)
            .map((member) => (
            <motion.button
              key={member.id}
              layout
              initial={false}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.8, x: -24 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
              animate={{ scale: selectedId === member.id ? 0.92 : 1 }}
              type="button"
              onClick={() => handleMemberClick(member.id)}
              className={`group flex cursor-pointer flex-col bg-white text-left outline-none transition-shadow hover:shadow-lg focus-visible:ring-4 focus-visible:ring-[#2D6190]/40 ${selectedId === member.id ? "w-[min(18rem,72vw)] min-w-0 flex-none" : "min-w-[14rem] flex-1 md:min-w-0"}`}
              aria-label={`View profile of ${member.name}`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-white text-black">
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
                <h3 className="text-xl text-[#2D6190]">{member.name}</h3>
                <div className="mt-3 h-2 w-40 rounded-full bg-[#6EB8F0]" />
              </div>
            </motion.button>
          ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedMember && !isReturning && (
            <motion.article
              key={selectedMember.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.15 }}
              className="mt-0 max-w-xl flex-1 md:pt-4"
            >
              <p className="text-sm uppercase tracking-[0.18em] text-gray-500">{selectedMember.role}</p>
              <h3 className="mt-2 font-serif text-5xl font-light tracking-[-0.05em]">{selectedMember.name}</h3>
              <p className="mt-4 text-lg text-gray-600">{selectedMember.bio}</p>
            </motion.article>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
