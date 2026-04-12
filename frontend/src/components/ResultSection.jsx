import Quiz from "./Quiz";
import ResultCards from "./ResultCards";
import { ResultSkeleton } from "./Loader";

function ResultSection({ result = {}, isLoading = false }) {
  const safeResult = result || {};

  if (isLoading) {
    return (
      <div className="mt-8">
        <ResultSkeleton />
      </div>
    );
  }

  if (!safeResult.extracted && !safeResult.parameters?.length && !safeResult.explanation && !safeResult.questions?.length) {
    return (
      <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Results</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Your analysis will appear here</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Add agreement text or upload a PDF to see extracted parameters, plain-language explanations, risk signals, and consent checks.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6">
      {safeResult.extracted && (
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Quick Summary</p>
              <h3 className="mt-1 text-xl font-bold text-slate-950">Extracted essentials</h3>
            </div>
            <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              Ready
            </span>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
            <p className="rounded-lg bg-slate-50 p-4"><strong className="block text-slate-950">Amount</strong>{safeResult.extracted?.amount || "N/A"}</p>
            <p className="rounded-lg bg-slate-50 p-4"><strong className="block text-slate-950">Interest</strong>{safeResult.extracted?.interest || "N/A"}</p>
            <p className="rounded-lg bg-slate-50 p-4"><strong className="block text-slate-950">Tenure</strong>{safeResult.extracted?.tenure || "N/A"}</p>
            <p className="rounded-lg bg-slate-50 p-4"><strong className="block text-slate-950">Late Fee</strong>{safeResult.extracted?.lateFee || "N/A"}</p>
          </div>
        </section>
      )}

      <ResultCards parameters={safeResult.parameters} />

      {safeResult.explanation && (
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Explanation</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">Plain-language review</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">{safeResult.explanation}</p>
        </section>
      )}

      {safeResult.questions?.length > 0 && <Quiz questions={safeResult.questions} />}
    </div>
  );
}

export default ResultSection;
