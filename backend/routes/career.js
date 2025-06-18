const express = require("express");
const multer = require("multer");
const path = require("path");
const CareerApplication = require("../models/CareerApplication");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

// ✅ POST /api/career
router.post("/", upload.single("document"), async (req, res) => {
  try {
    const { name, email, phone, countryCode, linkedIn, portfolio, experience } =
      req.body;

    const documentUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const newApplication = new CareerApplication({
      name,
      email,
      phone,
      countryCode,
      linkedIn,
      portfolio,
      experience,
      documentUrl,
      documentOriginalName: req.file?.originalname || null,
    });

    await newApplication.save();

    res.status(200).json({ success: true, message: "Application submitted" });
  } catch (err) {
    console.error("Error saving application:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
