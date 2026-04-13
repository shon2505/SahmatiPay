require("dotenv").config();
const express = require("express");
const cors = require("cors");

const loanRoutes = require("./routes/loanRoutes");

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

// Routes
app.use("/", loanRoutes);

app.get("/", (req, res) => {
  res.send("SamajhPay Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});