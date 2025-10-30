import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  description: String,
  benefits: [String],
  eligibility: String,
}, { timestamps: true });

export default mongoose.model("Scheme", schemeSchema);
