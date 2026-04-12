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
    <div className="fixed bottom-5 left-5 z-50 w-[calc(100vw-2.5rem)] max-w-xs rounded-lg border border-slate-200 bg-white p-3 shadow-xl shadow-slate-300/60">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Text to speech</p>
          <p className="mt-1 text-xs text-slate-500">
            {selectedText ? "Selected text ready" : "Select text to hear it"}
          </p>
        </div>

        {isSpeaking && (
          <button
            type="button"
            onClick={stop}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-black text-red-700 transition hover:bg-red-100"
          >
            Stop
          </button>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
          className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-black text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Speak
        </button>
      </div>
    </div>
  );
}

export default TextToSpeech;
