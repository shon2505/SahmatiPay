function ParameterCard({ parameter }) {
  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition group-hover:bg-blue-600 group-hover:text-white">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7h16" />
            <path d="M4 12h10" />
            <path d="M4 17h7" />
          </svg>
        </span>
        <div className="min-w-0">
          <h4 className="font-semibold leading-6 text-slate-950">{parameter.name}</h4>
          <p className="mt-2 inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-base font-bold text-emerald-700">
            {parameter.value || "N/A"}
          </p>
          {parameter.explanation && (
            <p className="mt-3 text-sm leading-6 text-slate-600">{parameter.explanation}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default ParameterCard;
