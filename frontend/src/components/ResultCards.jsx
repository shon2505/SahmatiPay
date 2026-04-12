import ParameterCard from "./ParameterCard";

function ResultCards({ parameters = [] }) {
  if (!parameters || parameters.length === 0) return null;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Parameters</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">Detected loan terms</h3>
          <p className="mt-1 text-sm text-slate-600">Key loan information extracted from your document.</p>
        </div>
        <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          {parameters.length} items
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {parameters.map((param, index) => (
          <ParameterCard key={`${param.name}-${index}`} parameter={param} />
        ))}
      </div>
    </section>
  );
}

export default ResultCards;
