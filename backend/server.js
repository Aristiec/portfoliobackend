const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/ContactRoute");
const path = require("path");

const app = express();

const allowedOrigins = ["https://aristiec.com", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 🔥 ALLOW COOKIES
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const careerRoutes = require("./routes/career");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/career", careerRoutes);

app.get("/test", (req, res) => {
  res.send("Hello from backend");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
