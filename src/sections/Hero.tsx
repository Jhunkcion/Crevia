type HeroProps = { onNavigate?: (page: string) => void };

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="min-h-screen bg-cream px-6 pb-10 pt-28 text-blue md:px-12">
      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl flex-col items-center justify-center text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span className="absolute -left-32 top-40 h-72 w-72 rounded-full border border-blue/10" />
          <span className="absolute -right-40 top-24 h-[28rem] w-[28rem] rounded-full border border-blue/10" />
          <span className="absolute bottom-10 right-1/4 h-40 w-40 rounded-full border border-blue/10" />
        </div>
        <div className="relative z-10 flex max-w-3xl flex-col items-center">
          <p className="mb-8 text-xs font-semibold tracking-[.3em] text-blue/60">CREATIVE AGENCY / 001</p>
          <div className="mb-8 w-[min(80vw,34rem)]">
            <img className="w-full" src="/logo4.png" alt="CREVIA logo" decoding="async" />
          </div>
          <p className="max-w-xl text-base leading-7 text-blue/60">
            A creative collective connecting talent, technology and culture through meaningful digital experiences.
          </p>
          <button className="mt-10 rounded-full bg-blue px-6 py-3 text-xs font-bold tracking-widest text-white transition hover:-translate-y-1 hover:bg-blue-dark" type="button" onClick={() => onNavigate?.("divisions")}>
            EXPLORE DIVISIONS <span className="ml-3 text-base">↗</span>
          </button>
        </div>
        <div className="relative z-10 mt-auto flex w-full items-center justify-between text-[10px] font-semibold tracking-widest text-blue/60">
          <span>EST. 2025</span>
          <div className="mx-4 h-px flex-1 bg-blue/20" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
}
