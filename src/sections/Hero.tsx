import React from "react";

type HeroProps = {
  onNavigate?: (page: string) => void;
};

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__sticky">

        {/* Background decoration */}
        <div className="hero__decoration" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* HERO INTRO */}
        <div className="hero__content">

          <p className="hero__eyebrow">
            CREATIVE AGENCY / 001
          </p>

          {/* Static CREVIA logo */}
          <div className="hero__logo-static" aria-hidden="true">
            <img src="/logo4.png" alt="CREVIA" />
          </div>

          <p className="hero__description">
            A creative collective connecting talent,
            technology and culture through meaningful
            digital experiences.
          </p>

          <button
            type="button"
            className="hero__button"
            onClick={() => onNavigate?.("divisions")}
          >
            EXPLORE DIVISIONS
            <span>↗</span>
          </button>

        </div>

        {/* Bottom information */}
        <div className="hero__bottom">
          <span>EST. 2025</span>

          <div className="hero__scroll-line" />

          <span>SCROLL TO EXPLORE</span>
        </div>

      </div>
    </section>
  );
}
