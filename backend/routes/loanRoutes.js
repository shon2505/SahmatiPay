// const express = require("express");
// const router = express.Router();

// const { analyzeLoan } = require("../controllers/loanController");

// router.post("/analyze-loan", analyzeLoan);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");

const { analyzeLoan } = require("../controllers/loanController");
const { chatWithAssistant } = require("../controllers/chatController");

const upload = multer({ dest: "uploads/" });

// Existing route
router.post("/analyze-loan", analyzeLoan);

// NEW PDF route 🔥
router.post("/upload-pdf", upload.single("file"), analyzeLoan);

router.post("/chat", chatWithAssistant);

module.exports = router;
