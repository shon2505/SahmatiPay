import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Analyze", href: "#analyze" },
  { label: "Risk", href: "#risk" },
  { label: "Learn", href: "#learn" },
  { label: "Insurance", href: "#insurance" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = function () {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,mr,hi,gu,ta,te,bn,kn,ml,pa",
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* Inline styling for Google Translate */}
      <style>{`
        .goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }
        .goog-te-gadget { font-size: 0 !important; }
        .goog-te-combo {
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          font-size: 12px;
          cursor: pointer;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 font-semibold text-slate-950"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-200">
              SP
            </span>
            <span className="text-lg tracking-tight">SahmatiPay</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 text-sm font-semibold text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-2 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </a>
            ))}

            {/* 🌐 Translator */}
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-sm hover:border-blue-300 transition">
  <span className="text-xs">🌐</span>

  <div
    id="google_translate_element"
    className="translate-compact"
  ></div>
</div>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 md:hidden"
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t border-slate-200/70 bg-white px-4 pb-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-3 pt-3 text-sm font-medium text-slate-700">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 transition hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Info for mobile */}
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
                🌐 Use the language selector in the top bar
              </div>

              <a
                href="#analyze"
                className="rounded-lg bg-blue-600 px-3 py-2 text-center font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;