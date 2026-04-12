const { answerFinancialQuestion } = require("../services/aiService");

const chatWithAssistant = async (req, res) => {
  try {
    const question = req.body?.question;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ message: "Question is required" });
    }

    const answer = await answerFinancialQuestion(question);

    res.json({
      message: "Answer generated",
      answer,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      message: "Chat failed",
      error: error.message,
    });
  }
};

module.exports = { chatWithAssistant };
