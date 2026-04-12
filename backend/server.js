require("dotenv").config();
const express = require("express");
const cors = require("cors");

const loanRoutes = require("./routes/loanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", loanRoutes);

app.get("/", (req, res) => {
  res.send("SamajhPay Backend Running 🚀");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});