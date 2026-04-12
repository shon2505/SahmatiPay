const RISK_LEVELS = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};

const normalizeText = (value) => {
  if (value === null || value === undefined) return "";
  return value.toString().toLowerCase().trim();
};

const isEmptyLike = (value) => {
  const t = normalizeText(value);
  if (!t) return true;
  return (
    t === "na" ||
    t === "n/a" ||
    t === "nil" ||
    t === "none" ||
    t === "not applicable" ||
    t === "not available" ||
    t === "-"
  );
};

const extractNumber = (value) => {
  if (value === null || value === undefined) return null;
  const cleaned = value.toString().replace(/,/g, "");
  const match = cleaned.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  return Number.parseFloat(match[0]);
};

const extractPercent = (value) => {
  if (value === null || value === undefined) return null;
  const text = value.toString().toLowerCase();
  if (!text.includes("%") && !text.includes("percent") && !text.includes("per cent")) {
    return null;
  }
  return extractNumber(text);
};

const isAffirmativeValue = (value) => {
  if (value === null || value === undefined) return false;
  if (isEmptyLike(value)) return false;

  const text = normalizeText(value);
  if (["no", "none", "nil", "not applicable", "n/a"].includes(text)) return false;

  const num = extractNumber(value);
  if (num !== null && num === 0) return false;

  return true;
};

const buildParamMap = (parameters = []) => {
  const map = new Map();
  parameters.forEach((param) => {
    if (!param || !param.name) return;
    const key = normalizeText(param.name);
    if (!map.has(key)) {
      map.set(key, param.value);
    }
  });
  return map;
};

const analyzeRisks = (parameters = []) => {
  const paramMap = buildParamMap(parameters);
  const getValue = (name) => paramMap.get(normalizeText(name));

  const loanAmount = getValue("loan amount");

  const rules = [
    {
      id: "high_interest_rate",
      type: RISK_LEVELS.HIGH,
      check: () => {
        const value = getValue("interest rate");
        if (!value || isEmptyLike(value)) return null;
        const rate = extractPercent(value) ?? extractNumber(value);
        if (rate !== null && rate > 20) {
          return `High interest rate (${rate}%) — very costly loan`;
        }
        return null;
      },
    },
    {
      id: "high_apr",
      type: RISK_LEVELS.HIGH,
      check: () => {
        const value = getValue("apr");
        if (!value || isEmptyLike(value)) return null;
        const rate = extractPercent(value) ?? extractNumber(value);
        if (rate !== null && rate > 22) {
          return `High APR (${rate}%) — total borrowing cost is steep`;
        }
        return null;
      },
    },
    {
      id: "penal_interest",
      type: RISK_LEVELS.HIGH,
      check: () => {
        const value = getValue("penal interest");
        if (isAffirmativeValue(value)) {
          return "Penal interest present — extra charges on missed payments";
        }
        return null;
      },
    },
    {
      id: "processing_fee",
      type: RISK_LEVELS.MEDIUM,
      check: () => {
        const value = getValue("processing fee");
        if (!value || isEmptyLike(value)) return null;

        let feePercent = extractPercent(value);
        if (feePercent === null) {
          const feeAmount = extractNumber(value);
          const principal = extractNumber(loanAmount);
          if (feeAmount !== null && principal !== null && principal > 0) {
            feePercent = Number(((feeAmount / principal) * 100).toFixed(2));
          }
        }

        if (feePercent !== null && feePercent > 2) {
          return `Processing fee (~${feePercent}%) — increases upfront cost`;
        }

        return null;
      },
    },
    {
      id: "late_payment_penalty",
      type: RISK_LEVELS.MEDIUM,
      check: () => {
        const value = getValue("late payment penalty");
        if (isAffirmativeValue(value)) {
          return "Late payment penalty applies — missing EMIs can be costly";
        }
        return null;
      },
    },
    {
      id: "prepayment_charges",
      type: RISK_LEVELS.MEDIUM,
      check: () => {
        const value = getValue("prepayment charges");
        if (isAffirmativeValue(value)) {
          return "Prepayment charges apply — extra cost to close early";
        }
        return null;
      },
    },
    {
      id: "foreclosure_charges",
      type: RISK_LEVELS.MEDIUM,
      check: () => {
        const value = getValue("foreclosure charges");
        if (isAffirmativeValue(value)) {
          return "Foreclosure charges apply — early closure may be expensive";
        }
        return null;
      },
    },
    {
      id: "insurance_charges",
      type: RISK_LEVELS.LOW,
      check: () => {
        const value = getValue("insurance charges");
        if (isAffirmativeValue(value)) {
          return "Optional insurance charges — adds to total cost";
        }
        return null;
      },
    },
  ];

  const risks = [];

  rules.forEach((rule) => {
    const message = rule.check();
    if (message) {
      risks.push({
        type: rule.type,
        message,
      });
    }
  });

  return { risks };
};

module.exports = {
  analyzeRisks,
  RISK_LEVELS,
};
