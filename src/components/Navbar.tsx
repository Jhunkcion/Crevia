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
      {/* ===================================================
          PAGE TRANSITION
          =================================================== */}

      {/* ===================================================
          NAVBAR
          =================================================== */}

      <nav aria-label="Primary navigation" className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-cream/95 px-6 backdrop-blur md:px-10">

        {/* =================================================
            LEFT
            ================================================= */}

        <div className="flex items-center gap-2 md:gap-5">

          {/* INTRODUCE */}

          <button
            type="button"
            className={`rounded-full px-3 py-2 text-xs tracking-widest text-[#003077] transition hover:bg-blue/10 ${
              activePage === "home"
                ? "active font-bold"
                : "font-normal"
            }`}
            onClick={() =>
              handleNavigate("home")
            }
            aria-current={activePage === "home" ? "page" : undefined}
          >
            INTRODUCE
          </button>

          {/* DIVISIONS */}

          <button
            type="button"
            className={`rounded-full px-3 py-2 text-xs tracking-widest text-[#003077] transition hover:bg-blue/10 ${
              activePage === "divisions"
                ? "active font-bold"
                : "font-normal"
            }`}
            onClick={() =>
              handleNavigate("divisions")
            }
            aria-current={activePage === "divisions" ? "page" : undefined}
          >
            DIVISIONS
          </button>

        </div>

        {/* =================================================
            CENTER LOGO
            ================================================= */}

        <button
          type="button"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 font-bold tracking-[.18em] text-blue"
          onClick={() =>
            handleNavigate("home")
          }
          aria-label="CREVIA Home"
        >
          <img
            src="/crevia-logo.png"
            alt="CREVIA"
            className="h-7 w-7 object-contain"
            width="28"
            height="28"
            decoding="async"
          />

          <span className="navbar__brand-text">
            CREVIA
          </span>
        </button>

        {/* =================================================
            RIGHT
            ================================================= */}

        <div className="flex items-center gap-2 md:gap-5">

          {/* PROJECT */}

          <button
            type="button"
            className={`rounded-full px-3 py-2 text-xs tracking-widest text-[#003077] transition hover:bg-blue/10 ${
              activePage === "work"
                ? "active font-bold"
                : "font-normal"
            }`}
            onClick={() =>
              handleNavigate("work")
            }
            aria-current={activePage === "work" ? "page" : undefined}
          >
            PROJECT
          </button>

          {/* CONTACT */}

          <button
            type="button"
            className={`rounded-full px-3 py-2 text-xs tracking-widest text-[#003077] transition hover:bg-blue/10 ${
              activePage === "contact"
                ? "active font-bold"
                : "font-normal"
            }`}
            onClick={() =>
              handleNavigate("contact")
            }
            aria-current={activePage === "contact" ? "page" : undefined}
          >
            CONTACT
          </button>

        </div>

      </nav>
    </>
  );
}
