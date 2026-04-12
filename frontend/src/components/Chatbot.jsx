import { useState } from "react";

const suggestions = [
  "What is co-payment in insurance?",
  "How does EMI work?",
  "What is a waiting period?",
  "What is APR in a loan?",
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ask me about loans or insurance terms. I can explain EMI, APR, co-pay, claims, exclusions, waiting periods, and more.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendQuestion = async (overrideQuestion) => {
    const nextQuestion = (overrideQuestion || question).trim();

    if (!nextQuestion || isLoading) return;

    setQuestion("");
    setMessages((current) => [...current, { role: "user", content: nextQuestion }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: nextQuestion }),
      });

      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer || "I could not generate an answer right now. Please try again.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I am unable to connect right now. Please check that the backend server is running.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <section className="w-[calc(100vw-2.5rem)] max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-300/70">
          <div className="border-b border-slate-200 bg-slate-950 p-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Smart helper</p>
                <h2 className="mt-1 text-lg font-black">Loan & Insurance Chat</h2>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Focused answers for financial document terms.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-white/15 px-3 py-1 text-sm font-bold text-white transition hover:bg-white/10"
                aria-label="Close chatbot"
              >
                Close
              </button>
            </div>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => sendQuestion(item)}
                  className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100"
                >
                  {item}
                </button>
              ))}
            </div>

            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                sendQuestion();
              }}
            >
              <input
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about loans or insurance..."
                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-lg bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
        aria-expanded={isOpen}
      >
        {isOpen ? "Hide Chat" : "Ask AI"}
      </button>
    </div>
  );
}

export default Chatbot;
