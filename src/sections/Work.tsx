function Work() {
  return (
    <section id="work" className="relative min-h-screen bg-blue px-5 pb-16 pt-24 text-cream md:p-[120px_34px]">
      <div className="flex w-full justify-between border-b border-white/20 pb-[15px] text-[9px] font-bold tracking-[.13em]">
        <span>02</span>
        <span>SELECTED WORK</span>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-[15px] md:mt-[70px] md:grid-cols-2">
        <a href="mailto:hello@crevia.com?subject=Identity project" className="relative flex min-h-[420px] flex-col justify-between border border-white/25 p-[22px] transition duration-300 hover:-translate-y-[5px] hover:bg-cream hover:text-blue md:row-span-2 md:min-h-[795px]">
          <span>01 / EXPERIENCE</span>

          <div>
            <h3>IDENTITY</h3>
            <p>
              Building visual systems for ambitious
              ideas.
            </p>
          </div>

          <span className="work-card__arrow">
            ↗
          </span>
        </a>

        <a href="mailto:hello@crevia.com?subject=Digital project" className="relative flex min-h-[300px] flex-col justify-between border border-white/25 p-[22px] transition duration-300 hover:-translate-y-[5px] hover:bg-cream hover:text-blue md:min-h-[390px]">
          <span>02 / DIGITAL</span>

          <div>
            <h3>INTERFACE</h3>
            <p>
              Digital experiences designed around
              people.
            </p>
          </div>

          <span className="work-card__arrow">
            ↗
          </span>
        </a>

        <a href="mailto:hello@crevia.com?subject=Creative project" className="relative flex min-h-[300px] flex-col justify-between border border-white/25 p-[22px] transition duration-300 hover:-translate-y-[5px] hover:bg-cream hover:text-blue md:min-h-[390px]">
          <span>03 / CREATIVE</span>

          <div>
            <h3>STORY</h3>
            <p>
              Visual stories that connect brands with
              culture.
            </p>
          </div>

          <span className="work-card__arrow">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}

export default Work;