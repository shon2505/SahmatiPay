import { insuranceParameters } from "../data/insuranceParameters";

const riskStyles = {
  HIGH: "border-red-200 bg-red-50 text-red-700",
  MEDIUM: "border-yellow-200 bg-yellow-50 text-yellow-700",
  LOW: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function InsuranceCard({ parameter }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-950">{parameter.name}</h3>
          <p className="mt-1 text-sm font-semibold text-blue-700">{parameter.value}</p>
        </div>
        <span className={`rounded-lg border px-3 py-1 text-xs font-black ${riskStyles[parameter.risk]}`}>
          {parameter.risk}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{parameter.explanation}</p>
      <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-100">
        <span className="font-bold text-slate-950">Example: </span>
        {parameter.example}
      </div>
    </article>
  );
}

function InsuranceLearn() {
  const counts = insuranceParameters.reduce(
    (acc, parameter) => {
      acc[parameter.risk] += 1;
      return acc;
    },
    { HIGH: 0, MEDIUM: 0, LOW: 0 }
  );

  return (
    <section className="bg-white px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Insurance basics</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Understand insurance before you buy it.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Insurance policies can hide important limits inside simple-looking words. These cards explain the terms that
              usually affect how much you actually receive during a claim.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-2xl font-black text-red-700">{counts.HIGH}</p>
                <p className="text-sm font-semibold text-red-700">High attention terms</p>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-2xl font-black text-yellow-700">{counts.MEDIUM}</p>
                <p className="text-sm font-semibold text-yellow-700">Medium attention terms</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-2xl font-black text-emerald-700">{counts.LOW}</p>
                <p className="text-sm font-semibold text-emerald-700">Low attention terms</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {insuranceParameters.map((parameter) => (
              <InsuranceCard key={parameter.name} parameter={parameter} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsuranceLearn;
