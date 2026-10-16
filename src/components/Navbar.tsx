type NavbarProps = {
  activePage?: string;
  onNavigate?: (page: string) => void;
};

export default function Navbar({
  activePage = "home",
  onNavigate,
}: NavbarProps) {
  const handleNavigate = (page: string) => {
    if (activePage === page) {
      return;
    }
    onNavigate?.(page);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-cream/95 px-6 backdrop-blur md:px-10"
      >
        {/* LEFT NAV ITEMS - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex items-center gap-2 md:gap-5">
          {/* INTRODUCE */}
          <button
            type="button"
            className={`rounded-full px-3 py-2 text-sm tracking-widest text-[#003077] transition hover:bg-blue/10 cursor-pointer ${
              activePage === "home" ? "active font-bold" : "font-normal"
            }`}
            onClick={() => handleNavigate("home")}
            aria-current={activePage === "home" ? "page" : undefined}
          >
            INTRODUCE
          </button>

          {/* DIVISIONS */}
          <button
            type="button"
            className={`rounded-full px-3 py-2 text-sm tracking-widest text-[#003077] transition hover:bg-blue/10 cursor-pointer ${
              activePage === "divisions" ? "active font-bold" : "font-normal"
            }`}
            onClick={() => handleNavigate("divisions")}
            aria-current={activePage === "divisions" ? "page" : undefined}
          >
            DIVISIONS
          </button>
        </div>

        {/* CENTER LOGO & BRAND - Centered on both mobile and desktop */}
        <button
          type="button"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer transition hover:opacity-85"
          onClick={() => handleNavigate("home")}
          aria-label="CREVIA Home"
        >
          <img
            src="/crevia-logo.png"
            alt="CREVIA Logo"
            className="h-10 w-auto sm:h-12"
            width="48"
            height="48"
            decoding="async"
          />
          <span className="font-bold tracking-[.18em] text-blue text-sm sm:text-base">
            CREVIA
          </span>
        </button>

        {/* RIGHT NAV ITEMS - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex items-center gap-2 md:gap-5">
          {/* PROJECT */}
          <button
            type="button"
            className={`rounded-full px-3 py-2 text-sm tracking-widest text-[#003077] transition hover:bg-blue/10 cursor-pointer ${
              activePage === "work" ? "active font-bold" : "font-normal"
            }`}
            onClick={() => handleNavigate("work")}
            aria-current={activePage === "work" ? "page" : undefined}
          >
            PROJECT
          </button>

          {/* CONTACT */}
          <button
            type="button"
            className={`rounded-full px-3 py-2 text-sm tracking-widest text-[#003077] transition hover:bg-blue/10 cursor-pointer ${
              activePage === "contact" ? "active font-bold" : "font-normal"
            }`}
            onClick={() => handleNavigate("contact")}
            aria-current={activePage === "contact" ? "page" : undefined}
          >
            CONTACT
          </button>
        </div>
      </nav>
    </>
  );
}
