const express = require("express");
const router = express.Router();
const CareerApplication = require("../models/CareerApplication");
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      countryCode,
      phone,
      linkedIn,
      portfolio,
      experience,
      documentUrl,
    } = req.body;

    const newApplication = new CareerApplication({
      name,
      email,
      countryCode,
      phone,
      linkedIn,
      portfolio,
      experience,
      documentUrl,
    });

    await newApplication.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Career Application from ${name}`,
      html: `
        <h2>New Application Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <p><strong>LinkedIn:</strong> <a href="${linkedIn}">${linkedIn}</a></p>
        <p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>
        <p><strong>Experience:</strong> ${experience} year(s)</p>
        ${
          documentUrl
            ? `<p><strong>Document:</strong> <a href="${documentUrl}">View Document</a></p>`
            : ""
        }
      `,
    });

    res.status(200).json({ success: true, message: "Application submitted!" });
  } catch (err) {
    console.error("Career form error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Optional test route
router.get("/test", (req, res) => {
  res.send("Career route is live!");
});

module.exports = router;
