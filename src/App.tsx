import { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import Talent from "./sections/Talent";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const isScrolling = useRef(false);

  const activePageRef = useRef("home");

  const pages = [
    "home",
    "divisions",
    "work",
    "contact",
  ];

  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  /*
  ==========================================================
  SCROLL / WHEEL NAVIGATION
  ==========================================================

  Scroll DOWN:
  HOME
    ↓
  DIVISIONS
    ↓
  PROJECT
    ↓
  CONTACT

  Scroll UP:
  CONTACT
    ↑
  PROJECT
    ↑
  DIVISIONS
    ↑
  HOME
  */

  useEffect(() => {
    /*
    ==========================================================
    SCROLL ACCUMULATOR

    User harus scroll beberapa kali / sedikit lebih jauh
    terlebih dahulu sebelum pindah ke menu berikutnya.

    Jadi satu scroll kecil tidak langsung mengganti halaman.
    ==========================================================
    */

    let scrollAmount = 0;

    const SCROLL_THRESHOLD = 420;

    const handleWheel = (event: WheelEvent) => {
      /*
      Jangan menerima scroll baru ketika transition
      sebelumnya masih berjalan.
      */
      if (isScrolling.current) {
        return;
      }

      /*
      Abaikan gerakan wheel yang sangat kecil.
      */
      if (Math.abs(event.deltaY) < 5) {
        return;
      }

      /*
      ========================================================
      AKUMULASI SCROLL
      ========================================================
      */

      scrollAmount += event.deltaY;

      /*
      Belum cukup scroll.
      Biarkan user tetap melihat isi section.
      */
      if (Math.abs(scrollAmount) < SCROLL_THRESHOLD) {
        return;
      }

      /*
      Tentukan arah berdasarkan akumulasi scroll.
      */
      const direction =
        scrollAmount > 0 ? 1 : -1;

      /*
      Reset setelah threshold tercapai.
      */
      scrollAmount = 0;

      const currentPage = activePageRef.current;

      const currentIndex = pages.indexOf(
        currentPage
      );

      let nextIndex = currentIndex;

      /*
      ========================================================
      SCROLL DOWN
      ========================================================
      */

      if (direction > 0) {
        nextIndex = Math.min(
          currentIndex + 1,
          pages.length - 1
        );
      }

      /*
      ========================================================
      SCROLL UP
      ========================================================
      */

      if (direction < 0) {
        nextIndex = Math.max(
          currentIndex - 1,
          0
        );
      }

      /*
      ========================================================
      PINDAH MENU
      ========================================================
      */

      if (nextIndex === currentIndex) {
        return;
      }

      isScrolling.current = true;

      const nextPage = pages[nextIndex];

      activePageRef.current = nextPage;

      setActivePage(nextPage);

      /*
      ========================================================
      TRANSITION LOCK
      ========================================================

      Setelah pindah, user diberi waktu untuk membaca
      section baru sebelum scroll berikutnya bisa
      memindahkan section lagi.
      */

      window.setTimeout(() => {
        isScrolling.current = false;
      }, 2200);
    };

    /*
    Jika user berhenti scroll cukup lama,
    akumulasi scroll sebelumnya dibuang.
    */

    let resetTimer: number | undefined;

    const handleWheelWithReset = (event: WheelEvent) => {
      handleWheel(event);

      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }

      resetTimer = window.setTimeout(() => {
        scrollAmount = 0;
      }, 700);
    };

    window.addEventListener(
      "wheel",
      handleWheelWithReset,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheelWithReset
      );

      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }
    };
  }, []);

  /*
  ==========================================================
  MANUAL NAVIGATION DARI NAVBAR
  ==========================================================
  */

  const handleNavigate = (page: string) => {
    if (!pages.includes(page)) {
      return;
    }

    if (isScrolling.current) {
      return;
    }

    if (page === activePageRef.current) {
      return;
    }

    activePageRef.current = page;

    setActivePage(page);
  };

  return (
    <div className="app">

      {/* ====================================================
          NAVBAR
          ==================================================== */}

      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* ====================================================
          HOME / INTRODUCE
          ==================================================== */}

      {activePage === "home" && (
        <Hero
          onNavigate={handleNavigate}
        />
      )}

      {/* ====================================================
          DIVISIONS
          ==================================================== */}

      {activePage === "divisions" && (
        <Talent />
      )}

      {/* ====================================================
          PROJECT
          ==================================================== */}

      {activePage === "work" && (
        <Work />
      )}

      {/* ====================================================
          CONTACT
          ==================================================== */}

      {activePage === "contact" && (
        <Contact />
      )}

    </div>
  );
}
