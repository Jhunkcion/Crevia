function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col px-5 pb-8 pt-24 md:p-[120px_34px]"
    >
      <div className="flex w-full justify-between border-b border-blue/20 pb-[15px] text-[9px] font-bold tracking-[.13em]">
        <span>03</span>
        <span>CONTACT</span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-[100px]">
        <p className="text-[10px] font-bold tracking-[.2em]">
          HAVE AN IDEA?
        </p>

        <h2 className="m-0 text-[clamp(55px,9vw,140px)] leading-[.82] tracking-[-.08em]">
          LET'S MAKE
          <br />
          SOMETHING
          <br />
          MATTER.
        </h2>

        <a
          href="mailto:hello@crevia.com"
          className="mt-[55px] flex w-fit items-center gap-[25px] border-b border-blue pb-2 text-[15px] font-semibold"
        >
          hello@crevia.com
          <span className="text-xl">↗</span>
        </a>
      </div>

      <footer className="flex flex-col gap-3 border-t border-blue/20 pt-5 text-[8px] font-bold tracking-[.13em] md:flex-row md:justify-between">
        <span>© 2026 CREVIA</span>

        <span>
          CREATIVE / TECHNOLOGY
        </span>

        <span>INDONESIA</span>
      </footer>
    </section>
  );
}

export default Contact;