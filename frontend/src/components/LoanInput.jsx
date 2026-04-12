import { useState } from "react";
import InputSection from "./InputSection";
import Loader from "./Loader";
import ResultSection from "./ResultSection";
import { API_URL } from "../config";

function LoanInput({ result, onResult }) {
  const [loanText, setLoanText] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");
      setIsLoading(true);
      let res;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        res = await fetch(`${API_URL}/api/upload-pdf`, {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch(`${API_URL}/api/analyze-loan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: loanText }),
        });
      }

      const data = await res.json();
      if (onResult) onResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to process the request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Analyze</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
          Upload your agreement and get instant clarity
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Paste text or upload a PDF. The system extracts key terms, flags risks, and checks your understanding.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <InputSection
          loanText={loanText}
          setLoanText={setLoanText}
          file={file}
          setFile={setFile}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Workflow</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">How it works</h3>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
              We extract loan amount, interest, APR, fees, penalties, and tenure.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
              Risks are categorized into High, Medium, and Low severity.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" />
              Quiz ensures the user has understood the terms before consent.
            </li>
          </ul>
          <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
            Review every fee, rate, penalty, and repayment detail before you agree.
          </div>
          {isLoading && <div className="mt-5"><Loader /></div>}
        </aside>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <ResultSection result={result} isLoading={isLoading} />
    </div>
  );
}

export default LoanInput;
