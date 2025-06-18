const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    countryCode: { type: String, required: true },
    phone: { type: String, required: true },
    linkedIn: { type: String },
    portfolio: { type: String },
    experience: { type: Number },
    documentUrl: { type: String },
    documentOriginalName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerApplication", careerApplicationSchema);
