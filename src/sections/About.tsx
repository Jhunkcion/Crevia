function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-between p-[120px_34px]"
    >
      <div className="flex w-full justify-between border-b border-blue/20 pb-[15px] text-[9px] font-bold tracking-[.13em]">
        <span>01</span>
        <span>ABOUT CREVIA</span>
      </div>

      <div className="grid grid-cols-[1.2fr_.8fr] gap-20 pt-20">
        <h2 className="m-0 text-[clamp(42px,6vw,90px)] leading-[.9] tracking-[-.07em]">
          WE BELIEVE
          <br />
          CREATIVITY HAS
          <br />
          NO BOUNDARIES.
        </h2>

        <div className="max-w-[380px] pt-2.5">
          <p className="mb-6 text-[15px] leading-[1.7] text-blue/60">
            CREVIA brings creative people and
            technology together to build meaningful
            experiences.
          </p>

          <p className="mb-6 text-[15px] leading-[1.7] text-blue/60">
            From visual storytelling to digital
            innovation, we work across disciplines
            while keeping people at the center.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;