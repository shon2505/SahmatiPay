import { useMemo, useState } from "react";
import QuizCard from "./QuizCard";

function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [canAgree, setCanAgree] = useState(false);

  const normalize = (value) => {
    return value
      ?.toString()
      .toLowerCase()
      .replace(/₹|rs\.?|,/g, "")
      .replace(/\s+/g, "")
      .trim();
  };

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const checkAnswers = () => {
    let correct = 0;

    questions.forEach((q, index) => {
      if (
        answers[index] &&
        normalize(answers[index]) === normalize(q.correctAnswer || q.answer)
      ) {
        correct++;
      }
    });

    const total = questions.length;
    setScore(`${correct} / ${total}`);
    setCanAgree(correct === total);
  };

  const progress = useMemo(() => {
    const total = questions.length;
    const answered = Object.values(answers).filter(Boolean).length;
    return { total, answered, percent: total ? Math.round((answered / total) * 100) : 0 };
  }, [answers, questions.length]);

  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Learn</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">Check your understanding</h3>
          <p className="mt-1 text-sm text-slate-600">Answer every question correctly to confirm consent.</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-slate-400">Progress</p>
          <p className="text-sm font-bold text-slate-700">
            Question {Math.min(progress.answered + 1, progress.total)} of {progress.total}
          </p>
        </div>
      </div>

      <div className="mb-6 h-3 rounded-full bg-white shadow-inner">
        <div
          className="h-3 rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      <div className="grid gap-4">
        {questions.map((q, index) => (
          <QuizCard
            key={index}
            index={index}
            total={questions.length}
            question={q.question}
            options={q.options}
            selected={answers[index]}
            onSelect={(value) => handleAnswerChange(index, value)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          onClick={checkAnswers}
          className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          Submit Answers
        </button>
        {score && (
          <div className="animate-score-pop rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200">
            Score: {score}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
        <button
          disabled={!canAgree}
          className={`w-full rounded-lg px-6 py-3 text-sm font-bold text-white transition ${
            canAgree
              ? "bg-blue-600 shadow-lg shadow-blue-100 hover:-translate-y-0.5 hover:bg-blue-700"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          I Understand & Agree
        </button>

        {!canAgree && score && (
          <p className="mt-2 text-center text-xs text-red-600">
            Answer all questions correctly to proceed.
          </p>
        )}
      </div>
    </section>
  );
}

export default Quiz;
