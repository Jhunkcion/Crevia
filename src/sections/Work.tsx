function Work() {
  return (
    <section
      id="work"
      className="work-section"
    >
      <div className="section-label">
        <span>02</span>
        <span>SELECTED WORK</span>
      </div>

      <div className="work-grid">
        <article className="work-card work-card--large">
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
        </article>

        <article className="work-card">
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
        </article>

        <article className="work-card">
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
        </article>
      </div>
    </section>
  );
}

export default Work;