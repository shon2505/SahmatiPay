function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 font-bold text-slate-950">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                SP
              </span>
              SamajhPay
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              A trusted interface for reviewing loan agreements, understanding risks, and confirming consent with clarity.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">Quick Links</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <a href="#home" className="transition hover:text-blue-700">Home</a>
              <a href="#analyze" className="transition hover:text-blue-700">Analyze</a>
              <a href="#risk" className="transition hover:text-blue-700">Risk</a>
              <a href="#learn" className="transition hover:text-blue-700">Learn</a>
              <a href="#insurance" className="transition hover:text-blue-700">Insurance</a>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">Focus</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <span>Plain-language explanations</span>
              <span>Risk-first agreement review</span>
              <span>Informed borrower consent</span>
              <span>Insurance term awareness</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
          2026 SamajhPay. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
