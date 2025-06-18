const express = require("express");
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      inquiryType,
      name,
      role,
      email,
      phone,
      country,
      company,
      message,
      agreed,
    } = req.body;

    const newContact = new Contact({
      inquiryType,
      name,
      role,
      email,
      phone,
      country,
      company,
      message,
      agreed,
    });

    await newContact.save();

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
      subject: "New Contact Form Submission",
      html: `
        <h2>Contact Form Submission</h2>
        <p><b>Inquiry Type:</b> ${inquiryType}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Role:</b> ${role}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Country:</b> ${country}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Message:</b> ${message}</p>
        <p><b>Agreed to Policy:</b> ${agreed ? "Yes" : "No"}</p>
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

module.exports = router;
