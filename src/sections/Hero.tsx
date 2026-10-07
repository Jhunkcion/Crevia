type HeroProps = { onNavigate?: (page: string) => void };

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="min-h-screen px-6 pb-10 pt-16 text-blue md:px-12" style={{ backgroundColor: '#DFEFFB' }}>
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center text-center">
        <div className="relative z-10 flex max-w-3xl flex-col items-center mt 0">
          <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            CREVIA
          </h1>
          <p className="mb-4 text-sm font-medium tracking-[.2em] text-blue/70 md:text-base">
            CREATIVE AGENCY
          </p>
          <p className="max-w-xl text-base leading-relaxed text-blue/60 md:text-lg">
            Connecting talent, technology and culture through meaningful digital experiences.
          </p>
          <button 
            className="mt-12 rounded-full bg-blue px-8 py-4 text-sm font-bold tracking-widest text-white transition hover:-translate-y-1 hover:bg-blue-dark" 
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
