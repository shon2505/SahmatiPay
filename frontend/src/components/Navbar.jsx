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
            includedLanguages: "en,mr,hi,gu,ta,te,bn,kn,ml,pa",
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
      <style>{`
        .goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }
        .goog-te-gadget { font-size: 0 !important; }
        .goog-te-combo {
          padding: 6px 10px;
          border-radius: 10px;
          border: 1px solid #dbe1ea;
          font-size: 12px;
          color: #0f172a;
          background: #ffffff;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .goog-te-combo:hover {
          border-color: #93c5fd;
        }
        .goog-te-combo:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.14);
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-lg supports-[backdrop-filter]:bg-white/75">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="group flex items-center gap-3 font-semibold text-slate-950 transition"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-md shadow-blue-200 transition group-hover:shadow-lg group-hover:shadow-blue-300/60">
              SP
            </span>
            <span className="text-lg font-bold tracking-tight">SahmatiPay</span>
          </a>

          <div className="hidden items-center gap-1 text-sm font-semibold text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-lg px-4 py-2 transition-colors duration-200 hover:text-blue-700"
              >
                {item.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 scale-x-0 rounded-full bg-blue-600 transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}

            <div className="ml-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm transition hover:border-blue-200 hover:shadow">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Lang</span>
              <div id="google_translate_element" className="translate-compact" />
            </div>

            <a
              href="#analyze"
              className="ml-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>

        {open && (
          <div className="animate-fade-down border-t border-slate-200/70 bg-white px-4 pb-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-2 pt-3 text-sm font-medium text-slate-700">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 transition hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                Use the language selector in the desktop top bar.
              </div>

              <a
                href="#analyze"
                className="mt-2 rounded-xl bg-blue-600 px-3 py-2.5 text-center font-semibold text-white"
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
