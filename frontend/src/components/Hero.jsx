import AgreementScanner from "./AgreementScanner";

function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-50/80 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl gap-9 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center lg:px-8">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
            AI-Powered Agreement Review
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
            Understand loan agreements before you consent.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            SahmatiPay analyzes complex loan documents, highlights risky clauses, and checks your understanding so you
            stay in control of every commitment.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#analyze"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Analyze a Document
            </a>
            <a
              href="#risk"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              See Risk Insights
            </a>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              { label: "AI Extraction", value: "15+" },
              { label: "Risk Signals", value: "8" },
              { label: "Quiz Checks", value: "Instant" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-2xl font-black text-slate-950">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up delay-100">
          <AgreementScanner />
        </div>
      </div>
    </div>
  );
}

export default Hero;
