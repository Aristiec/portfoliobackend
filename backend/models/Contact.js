import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    inquiryType: String,
    name: String,
    role: String,
    email: String,
    phone: String,
    country: String,
    company: String,
    message: String,
    agreed: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
