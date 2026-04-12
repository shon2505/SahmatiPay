import { useMemo, useState } from "react";
import { loanParameters } from "../data/loanParameters";

const parameterIcons = {
  "Loan Amount": "INR",
  "Interest Rate": "%",
  "EMI (Equated Monthly Installment)": "EMI",
  "Loan Tenure": "MO",
  "Total Interest Payable": "SUM",
  "Total Amount Payable": "PAY",
  "Processing Fee": "PF",
  "Insurance Charges": "INS",
  "Prepayment Charges": "PRE",
  "Foreclosure Charges": "CLS",
  "Late Payment Penalty": "LATE",
  "Penal Interest": "%",
  "APR (Annual Percentage Rate)": "APR",
  Collateral: "SEC",
  "Loan Type": "LT",
};

const pageCopy = {
  en: {
    eyebrow: "Loan learning guide",
    title: "Understand loan terms",
    subtitle: "Learn financial terms in simple language.",
    searchLabel: "Search loan parameters",
    searchPlaceholder: 'Search terms like "interest", "EMI", or "fees"',
    showing: "Showing",
    of: "of",
    terms: "terms",
    beginnerFriendly: "Beginner friendly",
    example: "Example",
    emptyTitle: "No matching loan term found",
    emptyText: "Try searching for words like interest, EMI, fee, penalty, or amount.",
  },
  mr: {
    eyebrow: "कर्ज शिकण्याची मार्गदर्शिका",
    title: "कर्जाच्या अटी समजून घ्या",
    subtitle: "आर्थिक संज्ञा सोप्या भाषेत शिका.",
    searchLabel: "कर्जाच्या अटी शोधा",
    searchPlaceholder: 'उदाहरण: "व्याज", "ईएमआय" किंवा "शुल्क"',
    showing: "दाखवत आहे",
    of: "पैकी",
    terms: "अटी",
    beginnerFriendly: "नवशिक्यांसाठी सोपे",
    example: "उदाहरण",
    emptyTitle: "जुळणारी कर्जाची अट सापडली नाही",
    emptyText: "व्याज, ईएमआय, शुल्क, दंड किंवा रक्कम असे शब्द शोधा.",
  },
};

const getLocalizedParameter = (parameter, language) => ({
  name: parameter.name[language] ?? parameter.name.en,
  definition: parameter.definition[language] ?? parameter.definition.en,
  example: parameter.example[language] ?? parameter.example.en,
  iconKey: parameter.name.en,
});

function LoanTermCard({ parameter, icon, exampleLabel }) {
  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-700 ring-1 ring-blue-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-bold leading-snug text-slate-950">{parameter.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{parameter.definition}</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{exampleLabel}</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{parameter.example}</p>
      </div>
    </article>
  );
}

function Learn() {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");
  const copy = pageCopy[language];

  const filteredParameters = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const localizedParameters = loanParameters.map((parameter) => getLocalizedParameter(parameter, language));

    if (!query) {
      return localizedParameters;
    }

    return localizedParameters.filter((parameter) =>
      [parameter.name, parameter.definition, parameter.example].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [language, searchTerm]);

  return (
    <section className="bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{copy.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            {copy.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
          <div className="mx-auto inline-flex rounded-lg border border-blue-100 bg-white p-1 shadow-sm">
            {[
              { value: "en", label: "English" },
              { value: "mr", label: "मराठी" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setLanguage(option.value);
                  setSearchTerm("");
                }}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                  language === option.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
                aria-pressed={language === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>

          <label htmlFor="loan-term-search" className="sr-only">
            {copy.searchLabel}
          </label>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <svg
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="loan-term-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
            />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 text-sm text-slate-600">
          <p>
            {copy.showing} <span className="font-bold text-slate-950">{filteredParameters.length}</span>{" "}
            {copy.of} <span className="font-bold text-slate-950">{loanParameters.length}</span> {copy.terms}
          </p>
          <p className="hidden rounded-lg bg-blue-50 px-4 py-2 font-bold text-blue-700 sm:block">
            {copy.beginnerFriendly}
          </p>
        </div>

        {filteredParameters.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredParameters.map((parameter) => (
              <LoanTermCard
                key={parameter.iconKey}
                parameter={parameter}
                icon={parameterIcons[parameter.iconKey] ?? "i"}
                exampleLabel={copy.example}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-bold text-slate-950">{copy.emptyTitle}</p>
            <p className="mt-2 text-sm text-slate-600">{copy.emptyText}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Learn;
