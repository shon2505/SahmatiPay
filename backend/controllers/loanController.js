const fs = require("fs");
const pdfParse = require("pdf-parse");
const { analyzeLoanText } = require("../services/aiService");
const { analyzeRisks } = require("../services/riskAnalyzer");


const analyzeLoan = async (req, res) => {
  try {
    let text = "";

    // 📄 PDF Upload
    if (req.file) {
      const dataBuffer = fs.readFileSync(req.file.path);

      let pdfData;
      try {
        pdfData = await pdfParse(dataBuffer);
        text = pdfData.text;
      } catch (err) {
        console.log("⚠️ PDF parse failed, fallback...");
        text = dataBuffer.toString();
      }

      fs.unlinkSync(req.file.path);
    } 
    // 📝 Text Input
    else {
      text = req.body.text;
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "No input provided" });
    }

    // 🤖 AI processing
    const parsed = await analyzeLoanText(text);
    const parameters = Array.isArray(parsed.parameters) ? parsed.parameters : [];

    // 🧠 DYNAMIC QUIZ GENERATION
    const generateOptions = (correct) => {
      return [
        correct,
        correct + " approx",
        correct.replace(/\d+/g, "99999"), // fake variation
        "None of the above",
      ].sort(() => Math.random() - 0.5);
    };

    const questions = parameters.map((param) => {
      return {
        question: `What is the ${param.name}?`,
        correctAnswer: param.value,
        options: generateOptions(param.value),
      };
    });

    const riskAnalysis = analyzeRisks(parameters);

    // ✅ FINAL RESPONSE
    res.json({
      message: "Analysis complete",
      parameters,
      risks: riskAnalysis.risks,
      questions,
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);

    res.status(500).json({
      message: "Processing failed",
      error: error.message,
    });
  }
};

module.exports = { analyzeLoan };
