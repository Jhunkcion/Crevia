function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="section-label">
        <span>03</span>
        <span>CONTACT</span>
      </div>

      <div className="contact-section__content">
        <p className="eyebrow">
          HAVE AN IDEA?
        </p>

        <h2>
          LET'S MAKE
          <br />
          SOMETHING
          <br />
          MATTER.
        </h2>

        <a
          href="mailto:hello@crivea.com"
          className="contact-link"
        >
          hello@crivea.com
          <span>↗</span>
        </a>
      </div>

      <footer className="footer">
        <span>© 2026 CRIVEA</span>

        <span>
          CREATIVE / TECHNOLOGY
        </span>

        <span>INDONESIA</span>
      </footer>
    </section>
  );
}

export default Contact;