import React, { useState } from "react";

type NavbarProps = {
  activePage?: string;
  onNavigate?: (page: string) => void;
};

export default function Navbar({
  activePage = "home",
  onNavigate,
}: NavbarProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (page: string) => {
    if (isTransitioning) {
      return;
    }

    if (activePage === page) {
      return;
    }

    setIsTransitioning(true);

    /*
    ========================================================
    PANEL MENUTUP HALAMAN LAMA
    ========================================================
    */

    window.setTimeout(() => {
      onNavigate?.(page);

      /*
      ======================================================
      HALAMAN BARU MUNCUL
      ======================================================
      */

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  return (
    <>
      {/* ===================================================
          PAGE TRANSITION
          =================================================== */}

      <div
        className={`page-transition ${
          isTransitioning
            ? "page-transition--active"
            : ""
        }`}
        aria-hidden="true"
      >
        <div className="page-transition__line" />

        <div className="page-transition__shine" />
      </div>

      {/* ===================================================
          NAVBAR
          =================================================== */}

      <nav className="navbar">

        {/* =================================================
            LEFT
            ================================================= */}

        <div className="navbar__left">

          {/* INTRODUCE */}

          <button
            type="button"
            className={`navbar__link ${
              activePage === "home"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleNavigate("home")
            }
          >
            INTRODUCE
          </button>

          {/* DIVISIONS */}

          <button
            type="button"
            className={`navbar__link ${
              activePage === "divisions"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleNavigate("divisions")
            }
          >
            DIVISIONS
          </button>

        </div>

        {/* =================================================
            CENTER LOGO
            ================================================= */}

        <button
          type="button"
          className="navbar__brand"
          onClick={() =>
            handleNavigate("home")
          }
          aria-label="CREVIA Home"
        >
          <img
            src="/crevia-logo.png"
            alt="CREVIA"
            className="navbar__logo"
          />

          <span className="navbar__brand-text">
            CREVIA
          </span>
        </button>

        {/* =================================================
            RIGHT
            ================================================= */}

        <div className="navbar__right">

          {/* PROJECT */}

          <button
            type="button"
            className={`navbar__link ${
              activePage === "work"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleNavigate("work")
            }
          >
            PROJECT
          </button>

          {/* CONTACT */}

          <button
            type="button"
            className={`navbar__link ${
              activePage === "contact"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleNavigate("contact")
            }
          >
            CONTACT
          </button>

        </div>

      </nav>
    </>
  );
}
