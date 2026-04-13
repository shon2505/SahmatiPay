import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureHighlights from "./components/FeatureHighlights";
import LoanInput from "./components/LoanInput";
import RiskPanel from "./components/RiskPanel";
import Footer from "./components/Footer";
import Learn from "./pages/Learn";
import InsuranceLearn from "./components/InsuranceLearn";
import Chatbot from "./components/Chatbot";
import TextToSpeech from "./components/TextToSpeech";

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="relative">
        <section id="home" className="scroll-mt-24">
          <Hero />
        </section>

        <section id="analyze" className="scroll-mt-24 bg-white">
          <LoanInput result={analysisResult} onResult={setAnalysisResult} />
        </section>

        <section id="risk" className="scroll-mt-24 border-y border-slate-200/70 bg-slate-50/70">
          <RiskPanel risks={analysisResult?.risks} hasAnalysis={Boolean(analysisResult)} />
        </section>

        <section id="features" className="scroll-mt-24 bg-white">
          <FeatureHighlights />
        </section>

        <section id="learn" className="scroll-mt-24">
          <Learn />
        </section>

        <section id="insurance" className="scroll-mt-24">
          <InsuranceLearn />
        </section>

        <section id="about" className="scroll-mt-24">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">About</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Designed to prevent uninformed consent</h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                SahmatiPay blends AI extraction, risk analytics, and user validation to help borrowers understand every
                clause before they agree. The platform focuses on transparency, accountability, and safer lending
                decisions.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  "Explain complex clauses in plain language",
                  "Highlight costly fees and penalties",
                  "Confirm understanding before signing",
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <TextToSpeech />
      <Chatbot />
    </div>
  );
}

export default App;
