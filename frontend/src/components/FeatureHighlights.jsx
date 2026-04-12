const features = [
  {
    title: "AI Parameter Extraction",
    description: "Pulls key loan data such as interest rate, APR, fees, and tenure with explanations.",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    title: "Risk Detection",
    description: "Flags high-cost clauses and charges before you consent so you can negotiate smarter.",
    accent: "bg-red-50 text-red-700",
  },
  {
    title: "Understanding Quiz",
    description: "Interactive quiz checks comprehension before agreement, reducing uninformed consent risk.",
    accent: "bg-emerald-50 text-emerald-700",
  },
];

function FeatureHighlights() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Why SahmatiPay</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Everything you need to understand loan risk</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          Built for clarity, speed, and transparency. Share the document, and let the system guide your decisions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60"
          >
            <span className={`inline-flex rounded-lg px-3 py-1 text-xs font-bold ${feature.accent}`}>
              Feature
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-950">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureHighlights;
