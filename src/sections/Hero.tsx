type HeroProps = { onNavigate?: (page: string) => void };

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* ── Video Background ── */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* ── Dark overlay for readability ── */}
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div className="flex max-w-3xl flex-col items-center">
          {/* Logo above the title */}
          <img
            src="/Logo Crevia.png"
            alt="Crevia logo"
            className="mb-6 h-auto w-[min(40vw,12rem)] object-contain sm:w-[min(30vw,14rem)] md:mb-8 drop-shadow-xl"
            width="224"
            height="224"
            decoding="async"
          />

          <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl drop-shadow-md">
            CREVIA
          </h1>
          <p className="mb-4 text-sm font-medium tracking-[.2em] text-white/70 md:text-base">
            CREATIVE AGENCY
          </p>
          <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            Connecting talent, technology and culture through meaningful digital experiences.
          </p>
          <button
            className="mt-12 cursor-pointer rounded-full bg-white/15 px-8 py-4 text-sm font-bold tracking-widest text-white backdrop-blur-sm border border-white/30 transition hover:-translate-y-1 hover:bg-white/25 hover:shadow-lg active:scale-95"
            type="button"
            onClick={() => onNavigate?.("divisions")}
          >
            EXPLORE DIVISIONS
          </button>
        </div>
      </div>
    </section>
  );
}
