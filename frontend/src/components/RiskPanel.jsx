import RiskCard from "./RiskCard";

const COLORS = {
  HIGH: "#ef4444",
  MEDIUM: "#f59e0b",
  LOW: "#22c55e",
};

const levelMeta = {
  HIGH: {
    label: "High",
    tone: "text-red-700",
    chip: "bg-red-50 text-red-700 ring-red-100",
    border: "border-red-200",
    bg: "bg-red-50",
  },
  MEDIUM: {
    label: "Medium",
    tone: "text-yellow-700",
    chip: "bg-yellow-50 text-yellow-700 ring-yellow-100",
    border: "border-yellow-200",
    bg: "bg-yellow-50",
  },
  LOW: {
    label: "Low",
    tone: "text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
  },
};

const normalizeRiskLevel = (risk) => {
  const value = risk?.type || risk?.level || risk?.severity || "LOW";
  const key = value.toString().trim().toUpperCase();

  return levelMeta[key] ? key : "LOW";
};

function RiskPanel({ risks, hasAnalysis = false }) {
  const safeRisks = Array.isArray(risks) ? risks : [];
  const counts = { HIGH: 0, MEDIUM: 0, LOW: 0 };

  safeRisks.forEach((risk) => {
    if (!risk) return;
    const key = normalizeRiskLevel(risk);
    counts[key] += 1;
  });

  const total = counts.HIGH + counts.MEDIUM + counts.LOW;
  const highPct = total ? Math.round((counts.HIGH / total) * 100) : 0;
  const medPct = total ? Math.round((counts.MEDIUM / total) * 100) : 0;
  const lowPct = Math.max(0, 100 - highPct - medPct);
  const overallLevel = counts.HIGH > 0 ? "HIGH" : counts.MEDIUM > 0 ? "MEDIUM" : hasAnalysis ? "LOW" : null;
  const overallMeta = overallLevel ? levelMeta[overallLevel] : null;

  const pieStyle = {
    background: `conic-gradient(${COLORS.HIGH} 0 ${highPct}%, ${COLORS.MEDIUM} ${highPct}% ${
      highPct + medPct
    }%, ${COLORS.LOW} ${highPct + medPct}% 100%)`,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Risk Analyzer</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">Risk Overview</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            The system categorizes each clause into High, Medium, and Low risk so you can make informed decisions.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.keys(levelMeta).map((level) => (
            <span
              key={level}
              className={`rounded-lg px-3 py-2 text-xs font-bold ring-1 ${levelMeta[level].chip}`}
            >
              {levelMeta[level].label}: {counts[level]}
            </span>
          ))}
        </div>
      </div>

      {overallMeta && (
        <div className={`mb-6 rounded-lg border ${overallMeta.border} ${overallMeta.bg} p-6 shadow-sm`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Overall Risk Level</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className={`text-3xl font-black ${overallMeta.tone}`}>{overallMeta.label} Risk</h3>
              <p className="mt-2 text-sm text-slate-600">
                {total > 0
                  ? "Based on the warnings detected in the analyzed loan terms."
                  : "No major warning rules were triggered in the analyzed loan terms."}
              </p>
            </div>
            <span className={`rounded-lg px-4 py-2 text-sm font-bold ring-1 ${overallMeta.chip}`}>
              {total} risk item{total === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-950">Risk Distribution</h3>
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="grid h-40 w-40 place-items-center rounded-full shadow-inner" style={pieStyle}>
              <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center shadow-sm">
                <span className="text-2xl font-black text-slate-950">{total}</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-950">Total risks: {total}</p>
              <p className="text-xs text-slate-500">Based on extracted parameters</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-950">Severity Breakdown</h3>
          <div className="mt-6 space-y-4">
            {Object.keys(levelMeta).map((level) => {
              const value = counts[level];
              const percent = total ? Math.round((value / total) * 100) : 0;
              return (
                <div key={level}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className={`font-semibold ${levelMeta[level].tone}`}>{levelMeta[level].label} Risk</span>
                    <span className="text-slate-500">
                      {value} items {total ? `(${level === "LOW" ? lowPct : percent}%)` : ""}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: COLORS[level] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-950">Detailed Risks</h3>
          <span className="text-xs text-slate-500">Actionable warnings with context</span>
        </div>

        {safeRisks.length === 0 ? (
          <p className="text-sm text-slate-600">
            {hasAnalysis
              ? "Analysis complete. No detailed risk warnings were detected from the extracted loan terms."
              : "No risks detected yet. Run an analysis to see detailed warnings."}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {safeRisks.map((risk, index) => {
              const key = normalizeRiskLevel(risk);
              return (
                <RiskCard
                  key={`${risk.message || risk.description || key}-${index}`}
                  risk={risk}
                  level={key}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default RiskPanel;
