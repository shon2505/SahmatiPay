require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const PARAMETERS = [
  "loan amount",
  "interest rate",
  "emi",
  "loan tenure",
  "total interest payable",
  "total amount payable",
  "processing fee",
  "insurance charges",
  "prepayment charges",
  "foreclosure charges",
  "late payment penalty",
  "penal interest",
  "apr",
  "collateral",
  "loan type"
];

const analyzeLoanText = async (text) => {
  // ✅ FIX: clean text inside function
  const cleanText = text.replace(/\n/g, " ");

  const prompt = `
You are a financial agreement analyzer.

Extract ONLY the following 15 important parameters from the text if present:

${PARAMETERS.join(", ")}

STRICT RULES:
- Only extract from this list
- Do NOT create new parameter names
- Do NOT hallucinate
- Skip parameters not present
- Always extract values like ₹, %, months
- Keep explanation simple for normal users

FORMAT (STRICT JSON ONLY):

{
  "parameters": [
    {
      "name": "loan amount",
      "value": "₹500000",
      "explanation": "Total amount borrowed."
    }
  ]
}

TEXT:
${cleanText}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  const output = response.choices[0].message.content;

  console.log("GROQ OUTPUT:\n", output);

  const jsonMatch = output.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("No JSON found");
  }

  return JSON.parse(jsonMatch[0]);
};

const FINANCIAL_CHAT_KEYWORDS = [
  "loan",
  "emi",
  "interest",
  "apr",
  "tenure",
  "collateral",
  "foreclosure",
  "prepayment",
  "penalty",
  "insurance",
  "premium",
  "policy",
  "claim",
  "coverage",
  "sum insured",
  "co-pay",
  "copay",
  "waiting period",
  "exclusion",
  "room rent",
  "sub-limit",
  "sub limit",
  "rider",
  "cashless",
  "reimbursement",
  "deductible",
  "ncb",
  "no claim bonus",
  "renewal",
  "grace period",
  "free-look",
  "free look",
  "maternity",
  "critical illness",
  "sum insured",
];

const isLoanOrInsuranceQuestion = (question) => {
  const normalizedQuestion = question.toLowerCase();
  return FINANCIAL_CHAT_KEYWORDS.some((keyword) => normalizedQuestion.includes(keyword));
};

const answerFinancialQuestion = async (question) => {
  const cleanQuestion = question.replace(/\s+/g, " ").trim();

  if (!cleanQuestion) {
    return "Please ask a question about loans or insurance.";
  }

  if (!isLoanOrInsuranceQuestion(cleanQuestion)) {
    return "I can help only with loans and insurance. Please ask about loan terms, EMI, interest, APR, insurance premium, claim, waiting period, exclusions, co-pay, or similar topics.";
  }

  const prompt = `
You are SamajhPay's loan and insurance assistant.

Answer ONLY questions related to:
- loans, loan agreements, EMI, APR, interest, fees, penalties, repayment, collateral
- insurance policies, premium, sum insured, waiting period, exclusions, claims, co-pay, room rent, riders

Rules:
- If the user asks anything outside loans or insurance, politely refuse and redirect.
- Use simple language for normal users.
- Be practical and specific.
- Do not give legal or financial investment advice.
- Keep answers concise but complete.
- Use bullets only when it improves clarity.

Question:
${cleanQuestion}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return response.choices[0].message.content.trim();
};

module.exports = { analyzeLoanText, answerFinancialQuestion };
