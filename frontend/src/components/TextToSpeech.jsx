import { useEffect, useMemo, useState } from "react";

const getSelectedText = () => window.getSelection()?.toString().trim() || "";

const hasMarathiText = (text) => /[\u0900-\u097F]/.test(text);

function TextToSpeech() {
  const [selectedText, setSelectedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState("auto");
  const isSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  useEffect(() => {
    const updateSelection = () => {
      setSelectedText(getSelectedText());
    };

    document.addEventListener("selectionchange", updateSelection);
    document.addEventListener("mouseup", updateSelection);
    document.addEventListener("keyup", updateSelection);

    return () => {
      document.removeEventListener("selectionchange", updateSelection);
      document.removeEventListener("mouseup", updateSelection);
      document.removeEventListener("keyup", updateSelection);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const resolvedLanguage = useMemo(() => {
    if (language !== "auto") return language;
    return hasMarathiText(selectedText) ? "mr-IN" : "en-IN";
  }, [language, selectedText]);

  const speak = () => {
    const text = getSelectedText() || selectedText;

    if (!isSupported || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = resolvedLanguage;
    utterance.rate = 0.92;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-[260px] rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 shadow-lg shadow-slate-300/40 backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700">Read Selected</p>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            selectedText ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
          }`}
        >
          {selectedText ? "Ready" : "Select Text"}
        </span>
      </div>

      <div className="flex gap-1.5">
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          aria-label="Text to speech language"
        >
          <option value="auto">Auto</option>
          <option value="en-IN">English</option>
          <option value="mr-IN">Marathi</option>
        </select>

        <button
          type="button"
          onClick={speak}
          disabled={!selectedText || isSpeaking}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-black text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Listen
        </button>

        <button
          type="button"
          onClick={stop}
          disabled={!isSpeaking}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
          aria-label="Stop reading"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default TextToSpeech;
