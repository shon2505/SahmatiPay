const riskStyles = {
  HIGH: {
    label: "High",
    icon: "!",
    card: "border-red-200 bg-red-50 text-red-900",
    chip: "bg-red-600 text-white",
    iconBox: "bg-red-600 text-white",
  },
  MEDIUM: {
    label: "Medium",
    icon: "!",
    card: "border-yellow-200 bg-yellow-50 text-yellow-900",
    chip: "bg-yellow-500 text-slate-950",
    iconBox: "bg-yellow-500 text-slate-950",
  },
  LOW: {
    label: "Low",
    icon: "✓",
    card: "border-emerald-200 bg-emerald-50 text-emerald-900",
    chip: "bg-emerald-600 text-white",
    iconBox: "bg-emerald-600 text-white",
  },
};

function RiskCard({ risk, level = "LOW" }) {
  const meta = riskStyles[level] || riskStyles.LOW;

  return (
    <article className={`rounded-lg border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${meta.card}`}>
      <div className="flex items-start gap-4">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base font-black ${meta.iconBox}`}>
          {meta.icon}
        </span>
        <div>
          <span className={`inline-flex rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide ${meta.chip}`}>
            {meta.label} Risk
          </span>
          <p className="mt-3 text-sm font-semibold leading-6">
            {risk?.message || risk?.description || "Risk warning detected."}
          </p>
        </div>
      </div>
    </article>
  );
}

export default RiskCard;
