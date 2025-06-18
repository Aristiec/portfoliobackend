console.log("contactRoutes loaded");

import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/contact", async (req, res) => {
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

    // Save to MongoDB
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

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP for production
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // must be the verified Gmail
      to: process.env.EMAIL_USER, // send to yourself
      replyTo: email, // user email set here for replies
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

export default router;
