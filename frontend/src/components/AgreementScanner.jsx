function AgreementScanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70">
      <div className="relative mx-auto max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2.5 w-24 rounded-full bg-slate-300/90" />
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
            AI Scan Active
          </span>
        </div>

        <div className="space-y-2">
          <div className="h-2 rounded-full bg-slate-300/80" />
          <div className="h-2 w-11/12 rounded-full bg-slate-300/70" />
          <div className="h-2 w-10/12 rounded-full bg-slate-300/70" />
          <div className="h-2 w-9/12 rounded-full bg-slate-300/70" />
        </div>

        <div className="relative mt-4 space-y-2 rounded-lg border border-blue-200 bg-blue-50/70 p-3">
          <div className="h-2 w-10/12 rounded-full bg-blue-300/70" />
          <div className="h-2 w-9/12 rounded-full bg-blue-300/60" />
          <div className="h-2 w-7/12 rounded-full bg-blue-300/50" />
          <span className="absolute -top-2 right-2 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
            APR flagged
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-2 w-11/12 rounded-full bg-slate-300/70" />
          <div className="h-2 w-10/12 rounded-full bg-slate-300/70" />
          <div className="h-2 w-8/12 rounded-full bg-slate-300/60" />
        </div>

        <div className="scan-line pointer-events-none absolute inset-x-3 top-10 h-10 rounded-md bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
      </div>

      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100/70 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-cyan-100/80 blur-2xl" />
    </div>
  );
}

export default AgreementScanner;
