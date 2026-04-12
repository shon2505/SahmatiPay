function QuizCard({ index, total, question, options, selected, onSelect }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-400">
        <span>Question {index + 1} / {total}</span>
        <span className="rounded-lg bg-blue-50 px-3 py-1 text-blue-700">Quiz</span>
      </div>
      <h4 className="mt-3 text-base font-bold leading-6 text-slate-950">{question}</h4>

      {options ? (
        <div className="mt-4 grid gap-3">
          {options.map((opt, i) => {
            const isActive = selected === opt;
            return (
              <button
                key={`${opt}-${i}`}
                type="button"
                onClick={() => onSelect(opt)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm ring-4 ring-blue-100"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <input
          type="text"
          className="mt-4 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          placeholder="Your answer..."
          value={selected || ""}
          onChange={(e) => onSelect(e.target.value)}
        />
      )}
    </article>
  );
}

export default QuizCard;
