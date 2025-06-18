const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/ContactRoute");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const careerRoutes = require("./routes/career");
app.use("/api/career", careerRoutes);

app.get("/test", (req, res) => {
  res.send("Hello from backend");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
