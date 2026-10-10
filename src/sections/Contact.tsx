import { useState } from "react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47V10.89a8.28 8.28 0 0 0 5.77 2.29V9.74a4.84 4.84 0 0 1-3.77-3.05z" />
    </svg>
  );
}

export default function Contact() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleMailto = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = "hello@crevia.com";
    const subject = email.trim()
      ? `RSVP / Inquiry from ${email.trim()}`
      : "RSVP / Inquiry - Crevia";

    const bodyParts: string[] = [];
    if (notes.trim()) {
      bodyParts.push(`Notes / Message:\n${notes.trim()}`);
    }
    if (email.trim()) {
      bodyParts.push(`Sender Email: ${email.trim()}`);
    }

    const body = bodyParts.join("\n\n");
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#DFEFFB] px-6 py-24 sm:px-10 md:py-28 lg:px-16 xl:px-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
        {/* Left Column: Headline + Social Media Boxes */}
        <div className="flex w-full flex-col items-start lg:w-1/2 lg:pt-2">
          <h2 className="m-0 select-none text-[42px] font-black leading-[0.95] tracking-[-0.03em] text-black sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px]">
            LET'S MAKE
            <br />
            SOMETHING
            <br />
            MATTER.
          </h2>

          {/* Social Media Boxes */}
          <div className="mt-7 flex w-full max-w-[274px] flex-col gap-2.5 sm:mt-9">
            {/* Instagram */}
            <a
              href="https://instagram.com/Crevia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @Crevia"
              className="flex h-10 w-full items-center gap-3 bg-[#D9D9D9] px-4 text-black transition-all duration-150 hover:bg-[#cecece] active:scale-[0.99]"
            >
              <InstagramIcon className="h-5 w-5 flex-shrink-0 text-black" />
              <span className="text-sm font-semibold tracking-wide">@Crevia</span>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@Crevia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok @Crevia"
              className="flex h-10 w-full items-center gap-3 bg-[#D9D9D9] px-4 text-black transition-all duration-150 hover:bg-[#cecece] active:scale-[0.99]"
            >
              <TikTokIcon className="h-5 w-5 flex-shrink-0 text-black" />
              <span className="text-sm font-semibold tracking-wide">@Crevia</span>
            </a>
          </div>
        </div>

        {/* Right Column: RSVP / Emailing Big Box */}
        <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
          <div className="relative flex min-h-[462px] w-full max-w-[420px] flex-col justify-between bg-[#D9D9D9] p-6 sm:p-8 md:p-9 lg:w-[380px] xl:w-[420px]">
            <form onSubmit={handleMailto} className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-5 flex items-center justify-between border-b border-black/10 pb-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-black uppercase">
                    RSVP / INQUIRIES
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-black/50">
                    CREVIA
                  </span>
                </div>

                {/* Email field */}
                <div className="mb-4">
                  <label
                    htmlFor="rsvp-email"
                    className="mb-1.5 block text-xs font-bold tracking-wider text-black uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 outline-none transition focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Notes field */}
                <div className="mb-4">
                  <label
                    htmlFor="rsvp-notes"
                    className="mb-1.5 block text-xs font-bold tracking-wider text-black uppercase"
                  >
                    Notes
                  </label>
                  <textarea
                    id="rsvp-notes"
                    rows={6}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter your notes or message here..."
                    className="w-full resize-none bg-white px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 outline-none transition focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {/* Button with mailto function */}
              <div className="mt-3">
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-3.5 px-5 text-sm font-bold tracking-wider text-white uppercase transition-all duration-150 hover:bg-[#0B3A82] active:scale-[0.99]"
                >
                  <span>Send Email</span>
                  <span className="text-base leading-none">↗</span>
                </button>

                {submitted ? (
                  <p className="mt-2 text-center text-xs font-medium text-emerald-800">
                    Opening mail client to hello@crevia.com...
                  </p>
                ) : (
                  <p className="mt-2 text-center text-[11px] text-neutral-600">
                    Opens mail client to{" "}
                    <a
                      href="mailto:hello@crevia.com"
                      className="font-semibold text-black hover:underline"
                    >
                      hello@crevia.com
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}