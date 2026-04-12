function Loader({ label = "Analyzing document..." }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-700" />
      <span>{label}</span>
    </div>
  );
}

export function ResultSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 h-6 w-32 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loader;
