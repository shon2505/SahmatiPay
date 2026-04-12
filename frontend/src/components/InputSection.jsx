function InputSection({ loanText, setLoanText, file, setFile, onSubmit, isLoading }) {
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Input</p>
        <h3 className="mt-1 text-2xl font-bold text-slate-950">Upload or paste document</h3>
        <p className="mt-2 text-sm text-slate-600">
          Drop your PDF or paste the agreement text to start AI extraction and risk checks.
        </p>
      </div>

      <div
        className="mb-5 rounded-lg border border-dashed border-blue-200 bg-blue-50/60 p-6 transition hover:border-blue-400 hover:bg-blue-50"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <label className="flex cursor-pointer flex-col items-center gap-3 text-center text-sm text-slate-600">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm ring-1 ring-blue-100">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v12" />
              <path d="m7 8 5-5 5 5" />
              <path d="M5 21h14" />
            </svg>
          </span>
          <span className="font-semibold text-slate-950">Drag and drop a PDF, or browse files</span>
          <span className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-blue-700 shadow-sm">
            Choose PDF
          </span>
          <span className="text-xs text-slate-500">
            {file ? `Selected: ${file.name}` : "PDF up to 10MB"}
          </span>
        </label>
      </div>

      <textarea
        className="h-44 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        placeholder="Paste loan agreement text here..."
        value={loanText}
        onChange={(e) => setLoanText(e.target.value)}
      />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Tip: Include interest rate, APR, fees, penalties, and tenure for the best analysis.
        </p>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:hover:translate-y-0"
        >
          {isLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {isLoading ? "Analyzing..." : "Analyze Loan"}
        </button>
      </div>
    </section>
  );
}

export default InputSection;
